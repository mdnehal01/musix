import getSongs from "@/actions/getSongs";
import Header from "@/components/header"
import ListItem from "@/components/listItems";
import PageContent from "./components/PageContent";
import Footer from "@/components/footer/Footer"
import Button from "@/components/button";
import SongPagination from "./components/SongPagination";

export const revalidate = 0;

let songs = [];

export default async function Home() {
  songs = await getSongs();
  return (
    <div 
      className="
      dark:bg-[#1f1e1e8c]
      bg-[#F3F5F9]/10
      h-full 
      w-full 
      overflow-hidden 
      overflow-y-auto"
    >
      <Header>
        <div className="mb-2">
          <h1 className="text-2xl font-semibold dark:text-white text-rose-500">
            Welcome Back
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-3 mt-4">
            <ListItem
              image="/images/liked.png"
              name="Favourites"
              href="favourites"
            />
          </div>
        </div>
      </Header>

      <div className="mt-2 mb-7 px-6">
        <div className="flex justify-between items-center">
          <h1 className="dark:text-white text-rose-500 text-xl font-semibold">Newest Song</h1>
        </div>

        {/* list of songs */}
        {/* <div>
          {songs.map((song) => <div>{song.title}</div>)}
        </div> */}

        <SongPagination songs={songs} /> {/* Pass the fetched songs */}

      </div>
      <Footer/>
    </div>
  );
}
