import { Button } from "@/components/ui/button";
import SearchBar from "./SearchBar";
import { PlusIcon } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { LOGOUT_URL } from "@/lib/apiEndpoints";
import myAxios from "@/lib/axios.config";

const TopHeader = () => {
  const { data } = useSession();


  const logoutUser = async () => {
    myAxios
      .post(
        LOGOUT_URL,
        {},
        {
          headers: {
            Authorization: `Bearer ${data?.user?.token}`,
          },
        }
      )
      .then((res) => {
        signOut({
          callbackUrl: "/login",
          redirect: true,
        });
      })
      .catch((err) => {
        console.error("Something went wrong.Please try again!");
      });
  };
  return (
    <>
      <div className="flex flex-row justify-between items-center px-8 pt-8">
        <SearchBar />

        <Button>
          <PlusIcon className="w-4 h-4 mr-1" />
          New project
        </Button>
      </div>
      <div className="flex-1">
        <Button onClick={logoutUser}>
        
          Logout
        </Button>
      </div>
    </>
  );
};

export default TopHeader;
