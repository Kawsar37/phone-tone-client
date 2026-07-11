export function PhoneCardSkeleton() {
  return (
    <div className="flex flex-col h-full bg-white rounded-xl border border-neutral/5 shadow-sm overflow-hidden animate-pulse">
      {/* Image Skeleton */}
      <div className="relative aspect-square w-full bg-bg-light p-6">
        <div className="h-full w-full bg-neutral/10 rounded-lg" />
        <div className="absolute top-3 left-3 h-6 w-16 bg-neutral/10 rounded-full" />
      </div>

      {/* Content Skeleton */}
      <div className="flex flex-col flex-grow p-5 gap-3">
        <div className="h-5 w-3/4 bg-neutral/10 rounded" />
        <div className="h-4 w-full bg-neutral/10 rounded" />
        <div className="h-4 w-1/2 bg-neutral/10 rounded" />

        <div className="flex items-center justify-between mt-auto pt-3">
          <div className="h-7 w-20 bg-neutral/10 rounded" />
          <div className="h-5 w-10 bg-neutral/10 rounded" />
        </div>

        <div className="h-10 w-full bg-neutral/10 rounded-lg mt-2" />
      </div>
    </div>
  );
}
