import Link from "next/link";
import { FiHome, FiSearch } from "react-icons/fi";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-bg-light flex flex-col items-center justify-center px-4 text-center relative overflow-hidden">
      {/* Subtle Background Glows */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-secondary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-lg">
        {/* Giant 404 Text */}
        <h1 className="text-[120px] sm:text-[160px] font-extrabold text-neutral/5 leading-none tracking-tighter mb-4 select-none">
          404
        </h1>

        <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral mb-4">
          Page Not <span className="text-primary">Found</span>
        </h2>

        <p className="text-lg text-neutral/60 mb-10 leading-relaxed">
          Oops! The page you&apos;re looking for doesn&apos;t exist or has been
          moved. Let&apos;s get you back on track.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3 rounded-lg bg-primary text-white font-semibold shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all"
          >
            <FiHome size={20} /> Go Home
          </Link>
          <Link
            href="/phones"
            className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3 rounded-lg bg-white border border-neutral/20 text-neutral font-semibold hover:bg-bg-light transition-all"
          >
            <FiSearch size={20} /> Explore Phones
          </Link>
        </div>
      </div>
    </div>
  );
}
