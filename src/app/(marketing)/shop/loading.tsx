export default function ShopLoading() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Skeleton */}
      <section className="bg-gradient-to-b from-neutral-50 to-white py-16 md:py-24">
        <div className="container-lb">
          <div className="mx-auto max-w-2xl text-center">
            <div className="mx-auto mb-4 h-12 w-64 animate-pulse rounded-lg bg-neutral-200" />
            <div className="mx-auto h-6 w-96 max-w-full animate-pulse rounded-lg bg-neutral-200" />
          </div>
        </div>
      </section>

      {/* Products Skeleton */}
      <section className="py-12 md:py-16">
        <div className="container-lb">
          <div className="mb-8">
            <div className="h-5 w-24 animate-pulse rounded bg-neutral-200" />
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="overflow-hidden rounded-xl bg-white shadow-sm">
                <div className="aspect-[4/5] animate-pulse bg-neutral-200" />
                <div className="p-4">
                  <div className="mb-2 h-3 w-16 animate-pulse rounded bg-neutral-200" />
                  <div className="mb-2 h-5 w-full animate-pulse rounded bg-neutral-200" />
                  <div className="mb-3 h-4 w-3/4 animate-pulse rounded bg-neutral-200" />
                  <div className="h-6 w-24 animate-pulse rounded bg-neutral-200" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
