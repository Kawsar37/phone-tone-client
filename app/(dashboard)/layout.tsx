"use client";

import { useAuth } from "@/providers/AuthProvider";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";
import { FiLoader } from "react-icons/fi";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login");
    }

    if (!isLoading && user) {
      if (user.role === "user" && pathname.startsWith("/admin")) {
        router.push("/user");
      }
      if (user.role === "admin" && pathname.startsWith("/user")) {
        router.push("/admin");
      }
    }
  }, [user, isLoading, router, pathname]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-bg-light">
        <FiLoader className="animate-spin text-primary" size={40} />
      </div>
    );
  }

  if (!user) return null;

  return <>{children}</>;
}
