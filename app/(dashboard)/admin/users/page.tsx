"use client";

import { FiShield, FiShieldOff } from "react-icons/fi";
import { toast } from "sonner";

const mockUsers = [
  {
    id: "1",
    name: "Sarah Jenkins",
    email: "sarah@example.com",
    role: "user",
    status: "active",
  },
  {
    id: "2",
    name: "Marcus Chen",
    email: "marcus@example.com",
    role: "user",
    status: "active",
  },
  {
    id: "3",
    name: "Elena Rodriguez",
    email: "elena@example.com",
    role: "user",
    status: "blocked",
  },
  {
    id: "4",
    name: "Admin User",
    email: "admin@phonetone.com",
    role: "admin",
    status: "active",
  },
];

export default function ManageUsersPage() {
  const handleToggleBlock = (userId: string, currentStatus: string) => {
    const newStatus = currentStatus === "active" ? "blocked" : "active";
    toast.success("User Status Updated", {
      description: `User is now ${newStatus}.`,
    });
  };

  return (
    <div className="bg-white p-6 sm:p-8 rounded-xl border border-neutral/5 shadow-sm">
      <h2 className="text-xl font-bold text-neutral mb-6">Manage Users</h2>

      <div className="overflow-x-auto -mx-6 sm:mx-0">
        <table className="w-full text-left min-w-[700px]">
          <thead>
            <tr className="border-b border-neutral/10 text-xs uppercase text-neutral/50 font-semibold tracking-wider">
              <th className="pb-3 pr-4">User</th>
              <th className="pb-3 pr-4">Email</th>
              <th className="pb-3 pr-4">Role</th>
              <th className="pb-3 pr-4">Status</th>
              <th className="pb-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral/5">
            {mockUsers.map((user) => (
              <tr
                key={user.id}
                className="hover:bg-bg-light/50 transition-colors"
              >
                <td className="py-4 pr-4 font-semibold text-neutral">
                  {user.name}
                </td>
                <td className="py-4 pr-4 text-sm text-neutral/70">
                  {user.email}
                </td>
                <td className="py-4 pr-4">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${user.role === "admin" ? "bg-purple-100 text-purple-700" : "bg-neutral/10 text-neutral"}`}
                  >
                    {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                  </span>
                </td>
                <td className="py-4 pr-4">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${user.status === "active" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}
                  >
                    {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                  </span>
                </td>
                <td className="py-4 text-right">
                  {user.role !== "admin" && (
                    <button
                      onClick={() => handleToggleBlock(user.id, user.status)}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                        user.status === "active"
                          ? "text-red-600 hover:bg-red-50"
                          : "text-green-600 hover:bg-green-50"
                      }`}
                    >
                      {user.status === "active" ? (
                        <>
                          <FiShieldOff size={14} /> Block
                        </>
                      ) : (
                        <>
                          <FiShield size={14} /> Unblock
                        </>
                      )}
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
