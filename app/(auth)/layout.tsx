import Link from "next/link";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-bg-light px-4 py-8 sm:py-12">
      <Link
        href="/"
        className="mb-6 sm:mb-8 flex items-center gap-1 text-3xl font-extrabold tracking-tight"
      >
        <span className="text-primary">Phone</span>
        <span className="text-neutral">Tone</span>
      </Link>

      <div className="w-full max-w-md bg-white p-6 sm:p-8 rounded-2xl shadow-xl border border-neutral/5">
        {children}
      </div>

      <p className="mt-6 sm:mt-8 text-sm text-neutral/50">
        &copy; {new Date().getFullYear()} PhoneTone. All rights reserved.
      </p>
    </div>
  );
}
