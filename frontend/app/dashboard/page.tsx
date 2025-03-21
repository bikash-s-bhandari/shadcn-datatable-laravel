"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Dashboard() {
  const { data } = useSession();
  console.log({ data });
  const router = useRouter();

  // useEffect(() => {
  //   if (!data) {
  //     // router.push('/login');
  //   }
  // }, [data, router]);

  if (!data) return null;

  return (
    <div className="p-8">
      hi
      <h1 className="text-2xl font-bold mb-6">
        Welcome, {data.originalUser?.name || data.user?.name}
        {data.isImpersonating && (
          <span className="ml-2 text-sm bg-yellow-100 px-2 py-1 rounded">
            (Impersonating {data.user?.name})
          </span>
        )}
      </h1>
    </div>
  );
}
