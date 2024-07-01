import Header from "@/components/header";
import ListItem from "@/components/listItems";

const Account = () => {
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
            Account Settings
          </h1>
        </div>
      </Header>

      {/* <div className="mt-2 mb-7 px-6">
        <div className="flex justify-between items-center">
          <h1 className="text-white text-xl font-semibold">Newest Song</h1>
        </div> */}

        {/* list of songs */}
        {/* <div>
          {songs.map((song) => <div>{song.title}</div>)}
        </div> */}
{/*           
      </div> */}
    </div>
  );
}

export default Account;