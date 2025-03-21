"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { signOut, useSession } from "next-auth/react";
import { LOGOUT_URL } from "@/lib/apiEndpoints";
import myAxios from "@/lib/axios.config";

export default function Header() {
  const { data } = useSession();
  console.log({ data });
  const user = {
    name: "padam khanal",
    role: "manager",
  };

  const originalUser = {
    name: "bikash",
    role: "admin",
  };

  const onLogout = async () => {
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
      .then((res) => {})
      .catch((err) => {
        console.error("Something went wrong.Please try again!");
      });
  };

  return (
    <header className="flex justify-between items-center p-4 bg-gray-900 text-white shadow-md">
      <h1 className="text-xl font-semibold">My App</h1>
      <div className="flex items-center gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-2 focus:outline-none">
            <Avatar>
              <AvatarFallback>
                {data?.user?.name?.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <span>
              {data?.user?.name} ({data?.user?.role})
            </span>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-white text-black p-2 rounded-md shadow-lg">
            {originalUser && originalUser.name !== user.name && (
              <DropdownMenuItem className="cursor-default">
                Logged in as {data?.user?.name}
              </DropdownMenuItem>
            )}
            {originalUser && (
              <DropdownMenuItem className="cursor-default">
                Original: {originalUser.name}
              </DropdownMenuItem>
            )}
            <DropdownMenuItem
              className="text-red-600 cursor-pointer"
              onClick={() => onLogout()}
            >
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
