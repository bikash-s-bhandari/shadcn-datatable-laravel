import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { authService } from '@/lib/api-client';
import  apiClient from '@/lib/api-client';

export default function ImpersonationControl() {
  const { data: session, update } = useSession();
  const [managers, setManagers] = useState([]);

  useEffect(() => {
    if (session?.user?.role === 'admin') {
      // Fetch managers from API
      apiClient.get('/users/managers').then(response => {
        setManagers(response.data);
      });
    }
  }, [session]);

  const handleStartImpersonation = async (managerId: string) => {
    const { token, manager } = await authService.startImpersonation(managerId);
    
    await update({
      accessToken: token,
      user: manager,
      isImpersonating: true,
      originalUser: session?.user
    });
  };

  const handleStopImpersonation = async () => {
    const { token, user } = await authService.stopImpersonation();
    
    await update({
      accessToken: token,
      user: user,
      isImpersonating: false,
      originalUser: null
    });
  };

  if (!session?.isImpersonating && session?.user?.role !== 'admin') return null;

  return (
    <div className="fixed bottom-4 right-4 bg-white p-4 rounded-lg shadow-lg border">
      {session.isImpersonating ? (
        <div className="flex items-center gap-4">
          <span className="text-sm">
            Impersonating: {session.user?.name}
          </span>
          <button
            onClick={handleStopImpersonation}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 text-sm"
          >
            Stop Impersonating
          </button>
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">Impersonate Manager:</label>
          <select
            onChange={(e) => handleStartImpersonation(e.target.value)}
            className="border rounded p-2 text-sm"
          >
            <option value="">Select a manager</option>
            {managers.map((manager) => (
              <option key={manager.id} value={manager.id}>
                {manager.name} ({manager.email})
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
}