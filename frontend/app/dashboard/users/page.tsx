"use client";

import React, { useState, useEffect } from "react";

import { MANAGER_LIST_URL } from "@/lib/apiEndpoints";
import apiClient from "@/lib/api-client";
import { authService } from "@/lib/api-client";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const ManagerList = () => {
  const { data, update } = useSession();
  const [managers, setManagers] = useState([]);
  const router = useRouter();

  const fetchManagers = () => {
    apiClient
      .get(MANAGER_LIST_URL)
      .then((res) => {
        setManagers(res.data?.data?.managers);
      })
      .catch((err) => {
        console.error("Something went wrong.Please try again!");
      });
  };

  useEffect(() => {
    fetchManagers();
  }, []);

  const handleStartImpersonation = async (managerId: string) => {
    const { token, manager } = await authService.startImpersonation(managerId);
    
    await update({
      accessToken: token,
      user: manager,
      isImpersonating: true,
      originalUser: data?.user,
    });
     router.push("/dashboard");
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        Manager List
      </h2>

      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">
                Name
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">
                Email
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">
                Role
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {managers.map((manager) => (
              <tr key={manager.id}>
                <td className="px-6 py-4 text-sm text-gray-800">
                  {manager.name}
                </td>
                <td className="px-6 py-4 text-sm text-gray-800">
                  {manager.email}
                </td>
                <td className="px-6 py-4 text-sm text-gray-800">
                  {manager.role}
                </td>
                <td className="px-6 py-4 text-sm text-gray-800">
                  <Button onClick={() => handleStartImpersonation(manager?.id)}>
                    Login As
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default function Home() {
  return (
    <div>
      <ManagerList />
    </div>
  );
}
