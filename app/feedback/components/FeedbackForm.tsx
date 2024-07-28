'use client';
import Button from "@/components/button";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";
import toast from "react-hot-toast";
import { useUser } from "@/hooks/useUser";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";
import Input from "@/components/input";
import { FaRegStar } from "react-icons/fa";

const FeedbackForm = () => {
    const { user } = useUser(); // Ensure this is inside the component
    const supabaseClient = useSupabaseClient();
    const router = useRouter();

    const { register, handleSubmit, reset } = useForm<FieldValues>({
        defaultValues: {
            full_name: "",
            feedback: ""
        },
    });

    const [isLoading, setIsLoading] = useState(false);

    const onSubmit: SubmitHandler<FieldValues> = async (values) => {
        // upload to supabase
        try {
            setIsLoading(true);

            const { error: supabaseError } = await supabaseClient.from("feedbacks").insert({
                user_id: user?.id,
                full_name: values.full_name,
                feedback: values.feedback
            });

            console.error(supabaseError);

            if (supabaseError) {
                console.error("Supabase insert error:", supabaseError.message); // Log the error message
                setIsLoading(false);
                return toast.error(supabaseError.message);
            }

            router.refresh();
            setIsLoading(false);
            toast.success("Feedback Submitted");
            reset();
        } catch (error) {
            console.error("Unexpected error:", error); // Log any unexpected errors
            toast.error("Something went wrong while submitting feedback");
            setIsLoading(false);
        }
    };

    return (
        <div className="w-full h-full px-6">
            <div className="rating w-full h-14 flex justify-center mb-20">
                <span className="star text-5xl cursor-pointer" data-value="1"><FaRegStar /></span>
                <span className="star text-5xl cursor-pointer" data-value="2"><FaRegStar /></span>
                <span className="star text-5xl cursor-pointer" data-value="3"><FaRegStar /></span>
                <span className="star text-5xl cursor-pointer" data-value="4"><FaRegStar /></span>
                <span className="star text-5xl cursor-pointer" data-value="5"><FaRegStar /></span>
            </div>

            <center>
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center gap-y-4">
                    <Input
                        className="md:w-1/2 w-full"
                        id="full_name"
                        disabled={isLoading}
                        {...register("full_name", { required: true })}
                        placeholder="Full Name"
                    />
                    <Input
                        className="md:w-1/2 w-full"
                        id="feedback"
                        disabled={isLoading}
                        {...register("feedback", { required: true })}
                        placeholder="Have something in Mind?"
                    />

                    <Button className="rounded-none w-36 mt-14" type="submit">
                        Submit
                    </Button>
                </form>
            </center>
        </div>
    );
};

export default FeedbackForm;
