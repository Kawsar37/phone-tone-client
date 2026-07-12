"use client";

import { useState, useEffect } from "react";
import { FiLoader, FiShield, FiShieldOff } from "react-icons/fi";
import { userAPI } from "@/utils/api";
import { IUser } from "@/types";
import { toast } from "sonner";

export default function AdminUsersPage() {
  const [users, setUsers] = useState<IUser[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data } = await userAPI.getAllUsers();
        setUsers(data.users);
      } catch {
        toast.error("Failed to load users");
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handleToggleBlock = async (userId: string, currentStatus: string) => {
    const newStatus = currentStatus === "active" ? "blocked" : "active";
    try {
      await userAPI.updateUserStatus(userId, newStatus);
      setUsers((prev) =>
        prev.map((u) => (u._id === userId ? { ...u, status: newStatus } : u)),
      );
      toast.success(
        `User ${newStatus === "blocked" ? "blocked" : "unblocked"} successfully`,
      );
    } catch {
      toast.error("Failed to update user status");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64 bg-white rounded-xl border border-neutral/5">
        <FiLoader className="animate-spin text-primary" size={32} />
      </div>
    );
  }

  return (
    <div className="bg-white p-6 sm:p-8 rounded-xl border border-neutral/5 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-neutral">Manage Users</h2>
        <span className="text-sm text-neutral/60">{users.length} users</span>
      </div>

      {users.length === 0 ? (
        <p className="text-center text-neutral/60 py-8">No users found.</p>
      ) : (
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
              {users.map((user) => (
                <tr
                  key={user._id}
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
                      {user.status.charAt(0).toUpperCase() +
                        user.status.slice(1)}
                    </span>
                  </td>
                  <td className="py-4 text-right">
                    {user.role !== "admin" && (
                      <button
                        onClick={() => handleToggleBlock(user._id, user.status)}
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
      )}
    </div>
  );
}
