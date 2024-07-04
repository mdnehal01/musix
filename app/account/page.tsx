import Header from "@/components/header";
import AccountContent from "@/components/accountContent";
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
      <AccountContent/>
    </div>
  );
}

export default Account;