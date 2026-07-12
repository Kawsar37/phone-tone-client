"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Navbar } from "@/components/shared/Navbar";
import { Footer } from "@/components/shared/Footer";
import { Sidebar } from "@/components/shared/Sidebar";
import { authClient } from "@/lib/auth-client";
import { FiUser, FiPackage, FiShoppingBag } from "react-icons/fi";

const userLinks = [
  { href: "/user", label: "Profile", icon: FiUser },
  { href: "/user/orders", label: "My Orders", icon: FiPackage },
  { href: "/cart", label: "My Cart", icon: FiShoppingBag },
];

export default function UserDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  const handleLogout = async () => {
    await authClient.signOut();
    toast.success("Logged out successfully", {
      description: "See you next time!",
    });
    router.push("/login");
    router.refresh();
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-bg-light py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-extrabold text-neutral mb-8">
            My <span className="text-primary">Dashboard</span>
          </h1>

          <div className="flex flex-col lg:flex-row gap-8">
            <Sidebar
              links={userLinks}
              title="User Menu"
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
