export default function ProductDetailLoading() {
  return (
    <main className="min-h-screen bg-white">
      <div className="container-lb py-8">
        {/* Breadcrumb Skeleton */}
        <div className="mb-8">
          <div className="h-5 w-32 animate-pulse rounded bg-neutral-200" />
        </div>

        <div className="grid gap-12 lg:grid-cols-2">
          {/* Image Skeleton */}
          <div className="space-y-4">
            <div className="aspect-square animate-pulse rounded-xl bg-neutral-200" />
            <div className="grid grid-cols-4 gap-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="aspect-square animate-pulse rounded-lg bg-neutral-200"
                />
              ))}
            </div>
          </div>

          {/* Info Skeleton */}
          <div className="lg:py-8">
            <div className="mb-2 h-4 w-24 animate-pulse rounded bg-neutral-200" />
            <div className="mb-4 h-10 w-3/4 animate-pulse rounded bg-neutral-200" />
            <div className="mb-6 h-8 w-32 animate-pulse rounded bg-neutral-200" />
            <div className="mb-6 h-8 w-40 animate-pulse rounded-full bg-neutral-200" />

            <div className="mb-8 space-y-3">
              <div className="h-5 w-24 animate-pulse rounded bg-neutral-200" />
              <div className="h-4 w-full animate-pulse rounded bg-neutral-200" />
              <div className="h-4 w-full animate-pulse rounded bg-neutral-200" />
              <div className="h-4 w-3/4 animate-pulse rounded bg-neutral-200" />
            </div>

            <div className="mb-8 space-y-3">
              <div className="h-14 w-full animate-pulse rounded-xl bg-neutral-200" />
              <div className="h-14 w-full animate-pulse rounded-xl bg-neutral-200" />
            </div>

            <div className="grid grid-cols-3 gap-4 border-t border-neutral-100 pt-8">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="h-10 w-10 animate-pulse rounded-full bg-neutral-200" />
                  <div className="space-y-1">
                    <div className="h-4 w-20 animate-pulse rounded bg-neutral-200" />
                    <div className="h-3 w-16 animate-pulse rounded bg-neutral-200" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
