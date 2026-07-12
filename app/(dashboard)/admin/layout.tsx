"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Navbar } from "@/components/shared/Navbar";
import { Footer } from "@/components/shared/Footer";
import { Sidebar } from "@/components/shared/Sidebar";
import { authClient } from "@/lib/auth-client";
import {
  FiGrid,
  FiPlusCircle,
  FiSmartphone,
  FiPackage,
  FiUsers,
} from "react-icons/fi";

const adminLinks = [
  { href: "/admin", label: "Overview", icon: FiGrid },
  { href: "/admin/phones/add", label: "Add Phone", icon: FiPlusCircle },
  { href: "/admin/phones", label: "Manage Phones", icon: FiSmartphone },
  { href: "/admin/orders", label: "Manage Orders", icon: FiPackage },
  { href: "/admin/users", label: "Manage Users", icon: FiUsers },
];

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  const handleLogout = async () => {
    await authClient.signOut();
    toast.success("Logged out successfully");
    router.push("/login");
    router.refresh();
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-bg-light py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-extrabold text-neutral mb-8">
            Admin <span className="text-primary">Dashboard</span>
          </h1>

          <div className="flex flex-col lg:flex-row gap-8">
            <Sidebar
              links={adminLinks}
              title="Admin Menu"
              onLogout={handleLogout}
            />
            <div className="flex-grow">{children}</div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
