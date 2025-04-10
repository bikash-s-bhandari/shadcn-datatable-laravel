"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useSession, signOut } from "next-auth/react";
import { LOGOUT_URL } from "@/lib/apiEndpoints";
import apiClient from "@/lib/api-client";
import { authService } from "@/lib/api-client";
import { useRouter } from "next/navigation";

export default function Header() {
  const { data, update } = useSession();
  const router = useRouter();

  if (!data) return null;

  const onLogout = async () => {
    apiClient
      .post(LOGOUT_URL, {})
      .then((res) => {
        signOut();
      })
      .catch((err) => {
        console.error("Something went wrong.Please try again!");
      });
  };

  const handleStopImpersonation = async () => {
    const { token, user } = await authService.stopImpersonation(data?.originalUser?.id);

    await update({
      accessToken: token,
      user: user,
      isImpersonating: false,
      originalUser: null,
    });
  };

  return (
    <header className="flex justify-between items-center p-4 bg-gray-900 text-white shadow-md">
      <h1 className="text-xl font-semibold">
        <span onClick={() => router.push("/dashboard")}>My App</span>
      </h1>
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
            {data?.isImpersonating && (
              <DropdownMenuItem className="cursor-default">
                Logged in as {data?.user?.name}
              </DropdownMenuItem>
            )}
            {data?.isImpersonating && (
              <DropdownMenuItem
                onClick={() => handleStopImpersonation()}
                className="cursor-default"
              >
                Stop Impersonating
              </DropdownMenuItem>
            )}
            {data?.originalUser && (
              <DropdownMenuItem className="cursor-default">
                Original: {data?.originalUser?.name}
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
