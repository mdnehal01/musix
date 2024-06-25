import getSongs from "@/actions/getSongs";
import Header from "@/components/header"
import ListItem from "@/components/listItems";
import PageContent from "./components/PageContent";


export const revalidate = 0;

export default async function Home() {
  const songs = await getSongs();
  return (
    <div 
      className="
      bg-[#1f1e1e8c] 
      h-full 
      w-full 
      overflow-hidden 
      overflow-y-auto"
    >
      <Header>
        <div className="mb-2">
          <h1 className="text-2xl font-semibold text-white">
            Welcome Back
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-3 mt-4">
            <ListItem
              image="/images/liked.png"
              name="Liked Songs"
              href="liked"
            />
          </div>
        </div>
      </Header>

      <div className="mt-2 mb-7 px-6">
        <div className="flex justify-between items-center">
          <h1 className="text-white text-xl font-semibold">Newest Song</h1>
        </div>

        {/* list of songs */}
        {/* <div>
          {songs.map((song) => <div>{song.title}</div>)}
        </div> */}

        <PageContent songs={songs} />
          
      </div>
    </div>
  );
}
