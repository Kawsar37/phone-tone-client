"use client";

import { useSession } from "@/lib/auth-client";
import { FiMail, FiPhone, FiCalendar, FiLoader } from "react-icons/fi";

export default function UserProfilePage() {
  const { data: session, isPending } = useSession();
  const memberSince = session?.user?.createdAt
    ? new Date(session.user.createdAt).toLocaleDateString()
    : "Unknown";

  if (isPending) {
    return (
      <div className="flex items-center justify-center h-64 bg-white rounded-xl border border-neutral/5">
        <FiLoader className="animate-spin text-primary" size={32} />
      </div>
    );
  }

  if (!session?.user) {
    return (
      <div className="text-center text-neutral/60">
        Please log in to view your profile.
      </div>
    );
  }

  const user = session.user;

  return (
    <div className="bg-white p-6 sm:p-8 rounded-xl border border-neutral/5 shadow-sm">
      <h2 className="text-xl font-bold text-neutral mb-6">
        Profile Information
      </h2>

      {/* Header / Avatar */}
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-8 pb-8 border-b border-neutral/10">
        <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center text-primary text-3xl font-bold flex-shrink-0">
          {user.name?.charAt(0).toUpperCase() || "U"}
        </div>
        <div className="text-center sm:text-left">
          <h3 className="text-2xl font-bold text-neutral">
            {user.name || "User"}
          </h3>
          <p className="text-neutral/60 flex items-center gap-1.5 justify-center sm:justify-start mt-1">
            <FiCalendar size={14} />
            Member since{" "}
            {memberSince}
          </p>
        </div>
      </div>

      {/* Info Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex items-center gap-4 p-4 rounded-lg bg-bg-light border border-neutral/5">
          <div className="w-10 h-10 flex items-center justify-center rounded-full bg-primary/10 text-primary">
            <FiMail size={18} />
          </div>
          <div>
            <p className="text-xs text-neutral/50 uppercase font-semibold">
              Email Address
            </p>
            <p className="text-sm font-medium text-neutral">{user.email}</p>
          </div>
        </div>

        <div className="flex items-center gap-4 p-4 rounded-lg bg-bg-light border border-neutral/5">
          <div className="w-10 h-10 flex items-center justify-center rounded-full bg-primary/10 text-primary">
            <FiPhone size={18} />
          </div>
          <div>
            <p className="text-xs text-neutral/50 uppercase font-semibold">
              Phone Number
            </p>
            <p className="text-sm font-medium text-neutral">
              {(user as { phone?: string }).phone || "Not provided"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
