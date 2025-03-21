"use client";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Dashboard() {
  const { data, status } = useSession();

  const router = useRouter();

  //Redirect to login if unauthenticated, but only after status is resolved
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/login"); // Use your sign-in page path
    }
  }, [status, router]);

  console.log({data})

  // Show loading state while session is being fetched
  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (!data) return null;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">
        Welcome, {data.originalUser?.name || data.user?.name}
        {data.isImpersonating && (
          <span className="ml-2 text-sm bg-yellow-100 px-2 py-1 rounded">
            (Impersonating {data.user?.name})
          </span>
        )}
      </h1>

      <div>
        {data?.user?.role === "admin" && (
          <Button onClick={() => router.push("/dashboard/users")}>
            Go To Managers
          </Button>
        )}

        <Button onClick={() => router.push("/dashboard/projects")}>
          Go To Projects
        </Button>
      </div>
    </div>
  );
}
