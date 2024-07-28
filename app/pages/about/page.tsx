import Header from "@/components/header";

import Footer from "@/components/footer/Footer";

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
            "
        >
                <div className="w-full h-auto flex items-center flex-col px-12 pt-12 pb-6 -mt-20 ">
                    <img src="/images/LOGO.png" alt="" className="scale-[0.4]" />
                    <h1 className="text-white text-5xl -mt-24 font-bold">Musix</h1>
                    <br /><br /><br /><br />
                    <h1 className="text-3xl font-bold text-rose-400">About One Musix App</h1>
                    <p className="pt-6 text-center">
                    Welcome to One Musix, your ultimate destination for discovering, playing, and enjoying music! We are passionate music enthusiasts dedicated to creating a seamless and enjoyable music experience for all. Whether you’re a casual listener, a music aficionado, or an aspiring artist, One Musix offers something special for everyone.

                    <br /><br /><br /><br />

                    <h2 className="font-bold text-2xl text-rose-400">Our Mission</h2>
                    At One Musix, our mission is to connect people through the universal language of music. We strive to bring you the best of what the music world has to offer, from timeless classics to the latest hits. Our platform is designed to make discovering new music easy and exciting while ensuring a smooth and intuitive user experience.
                    <br /><br /><br /><br />
                    <h2 className="font-bold text-2xl text-rose-400">What We Offer</h2>
                    <h3 className="font-bold text-xl">1. Extensive Music Library:</h3> Explore a vast collection of songs across various genres and artists. Whether you’re into pop, rock, jazz, classical, or any other genre, One Musix has it all.
                    <br /><br />
                    {/* TODO: Personalized recommendation */}
                    <h3 className="font-bold text-xl">2. Personalized Recommendations (soon):</h3>Enjoy tailored music recommendations based on your listening habits. Discover new favorites and revisit timeless tracks with our smart suggestion features.
                    <br /><br />
                    <h3 className="font-bold text-xl">3. User-Friendly Interface:</h3> Our app is designed with you in mind. Navigate effortlessly through your music library, create playlists, and control your playback with ease.
                    <br /><br />
                    <h3 className="font-bold text-xl">4. Real-Time Analytics:</h3> Get insights into your listening patterns and preferences. Track your most played songs, favorite artists, and discover your unique musical tastes.

                    <br /><br /><br /><br />

                    <h2 className="font-bold text-2xl text-rose-400">Our Vision</h2>
                    We envision a world where music brings people together, transcending boundaries and cultures. One Musix aims to be at the forefront of this movement, providing a platform that not only entertains but also connects people through shared musical experiences.
                    <br /><br /><br /><br />
                    <h2 className="font-bold text-2xl text-rose-400">Join Us</h2>
                    Become a part of the One Musix community today. Discover new music, share your playlists, and connect with fellow music lovers around the world. Let’s make every moment a musical journey together!
                    <br /><br />
                    <h1 className="text-rose-400 font-semibold text-lg">Thank you for choosing One Musix. Let the music play!</h1>
                    </p>
                </div>
            <Footer/>
        </div>
    )
}

export default About;