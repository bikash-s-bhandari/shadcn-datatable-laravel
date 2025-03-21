"use client";

import React, { useState, useEffect } from "react";

import { MANAGER_LIST_URL } from "@/lib/apiEndpoints";
import myAxios from "@/lib/axios.config";
import { useSession } from "next-auth/react";

const ManagerList = () => {
  const [managers, setManagers] = useState([]);

  const fetchManagers = () => {
    myAxios
      .get(MANAGER_LIST_URL)
      .then((res) => {
       
        setManagers(res.data?.data?.managers);
      })
      .catch((err) => {
        console.error("Something went wrong.Please try again!");
      });
  };

  useEffect(() => {
    fetchManagers()
  }, []);

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
                  <button className="text-blue-500 hover:text-blue-700">
                    Edit
                  </button>
                  <button className="ml-4 text-red-500 hover:text-red-700">
                    Login As
                  </button>
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
