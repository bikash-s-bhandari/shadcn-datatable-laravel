'use client'; // Marking as a client-side component

import { useRouter } from 'next/navigation';

const Unauthorized = () => {
  const router = useRouter();

  // Function to go back to the previous page
  const goBack = () => {
    router.back();
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-md w-full bg-white shadow-md rounded-lg p-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Unauthorized</h2>
        <p className="text-gray-600 mb-4">
          You do not have permission to access this page. Please log in or contact the administrator.
        </p>
        <button
          onClick={goBack}
          className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default Unauthorized;
