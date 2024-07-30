import Header from "@/components/header";

import Footer from "@/components/footer/Footer";
import AudioComponents from "./components/AudioComponents";

export const revalidate = 0;

const About = async () => {

    return (
        <div 
            className="
                bg-[#1f1e1e8c] 
                h-full
                w-full
                overflow-hidden
                overflow-y-auto
                flex
                flex-col
                justify-between
            "
        >
            <Header>
                Audio by google.
            </Header>
                <AudioComponents/>
            <Footer/>
        </div>
    )
}

export default About;