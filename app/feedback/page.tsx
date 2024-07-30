import Header from "@/components/header";
import { CgPlayList } from "react-icons/cg";
import getPlaylistByUserId from "@/actions/getPlaylistByUserId";
import Footer from "@/components/footer/Footer";
import FeedbackForm from "./components/FeedbackForm";

export const revalidate = 0;

const Feedback = async () => {
    const fetchedPlaylist = await getPlaylistByUserId();

    return (
        <div 
            className="
                dark:bg-[#1f1e1e8c]
                bg-[#F3F5F9]
                h-full
                w-full
                overflow-hidden
                overflow-y-auto
            "
        >
            <Header>
                <div className="mb-2 flex flex-col gap-y-6">
                    <div className="flex justify-start items-center">
                        <h1 className="text-white text-2xl font-semibold">
                            Feedback &nbsp; &nbsp;
                        </h1>
                        <CgPlayList className="mt-2" size={30}/>
                    </div>
                </div>

                <div className="w-full h-16 flex items-center">
                </div>
            </Header>
                <div className="w-full h-3/5 flex justify-center">
                    <FeedbackForm/>
                </div>
            <Footer/>
        </div>
    )
}

export default Feedback;