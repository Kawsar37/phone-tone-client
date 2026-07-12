"use client";

import { useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { useAuth } from "@/providers/AuthProvider";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

export default function LoginPage() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const fillDemoCredentials = () => {
    setEmail("admin@phonetone.com");
    setPassword("Admin123!");
    toast.info("Demo credentials filled!");
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await login(email, password);
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Invalid email or password.";
      toast.error("Login Failed", { description: message });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <h1 className="text-2xl font-bold text-neutral text-center mb-2">
        Welcome Back
      </h1>
      <p className="text-neutral/60 text-center mb-8 text-sm">
        Sign in to your PhoneTone account
      </p>

      <form onSubmit={handleLogin} className="space-y-5">
        <Input
          label="Email Address"
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input
          label="Password"
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center gap-2 text-neutral/70 cursor-pointer">
            <input
              type="checkbox"
              className="rounded border-neutral/30 text-primary focus:ring-primary"
            />
            Remember me
          </label>
          <Link href="#" className="text-primary font-medium hover:underline">
            Forgot password?
          </Link>
        </div>

        <Button type="submit" isLoading={isLoading}>
          Sign In
        </Button>

        <Button type="button" variant="outline" onClick={fillDemoCredentials}>
          Fill Demo Credentials
        </Button>
      </form>

      <p className="mt-8 text-center text-sm text-neutral/60">
        Don&apos;t have an account?{" "}
        <Link
          href="/register"
          className="text-primary font-semibold hover:underline"
        >
          Create Account
        </Link>
      </p>
    </>
  );
}
