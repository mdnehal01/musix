"use client";

import useSubscribeModel from "@/hooks/useSubscribeModel";
import { useUser } from "@/hooks/useUser";
import { postData } from "@/libs/helpers";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Button from "./button";
import ListItem from "./listItems";

interface AccountContentProps{

}

const AccountContent: React.FC<AccountContentProps> = (

) => {
    const router = useRouter();
    const subscribeModel = useSubscribeModel();
    const { isLoading, subscription, user, userDetails } = useUser();

    const [loading, setLoading] = useState(false);

    useEffect(()=>{
        if(!isLoading && !user){
            router.replace('/');
        }
    }, [isLoading, user, router]);

    const redirectToCustomerPortal = async ()=>{
        setLoading(true);
        try{
            const { url, error } = await postData({
                url: '/api/create-portal-link'
            });
            window.location.assign(url);
        } catch (error) {
            if (error){
                toast.error((error as Error).message);
            }
        }
        setLoading(false);
    }

    return(
        <div className="mb-7 px-6 flex flex-col gap-y-10">
            {!subscription && (
                <div className="flex flex-col gap-y-4">
                    <h1 className="text-7xl font-bold">Hey {userDetails?.full_name},</h1>
                    <p>
                        No active plan.
                    </p>
                    <Button onClick={subscribeModel.onOpen}
                        className="w-[300px]"
                    >
                        Subscribe
                    </Button>
                </div>
            )}

            {subscription && (
                <div className="flex flex-col gap-y-4">
                    <h1 className="text-7xl font-bold">Hey {userDetails?.full_name},</h1>
                    <p>
                        You are currently on the <b>{subscription?.prices?.products?.name}</b> plan.
                    </p>
                    <Button 
                        className="w-[300px]"
                        disabled={loading || isLoading}
                        onClick={redirectToCustomerPortal}
                    >
                        Open customer portal.
                    </Button>
                </div>
            )}

            <div className="flex flex-col flex-nowrap w-full">
                <h1 className="text-xl font-bold py-3">Favourites</h1>
                <ListItem
                    classname="h-32 lg:w-1/3 sm:w-1/2 w-full"
                    image="/images/liked.png"
                    name="Favourites"
                    href="favourites"
                />
            </div>
       
        </div>
    )
}

export default AccountContent;