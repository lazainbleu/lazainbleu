'use client'

import { Globe } from '@/components/ui/world-map'
import { motion } from 'framer-motion'
import { clsx } from 'clsx'

export default function StoreLocations() {
  const cities = [
    { lat: -7.9839, lng: 112.6214, label: 'Malang' },
    { lat: -6.2088, lng: 106.8456, label: 'Jakarta' },
    { lat: 48.8566, lng: 2.3522, label: 'Paris' },
    { lat: 51.5074, lng: -0.1278, label: 'London' },
  ]

  const flightPaths = [
    { from: cities[0], to: cities[2] },
    { from: cities[1], to: cities[3] },
  ]

  return (
    <section className="relative w-full overflow-hidden bg-white py-24 dark:bg-neutral-950 md:py-32 lg:py-40">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-neutral-50/30 to-transparent dark:via-neutral-900/20" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center md:mb-20"
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-4 py-1.5 dark:border-neutral-800 dark:bg-neutral-950">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-neutral-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-neutral-500" />
            </span>
            <span className="text-sm text-neutral-600 dark:text-neutral-400">
              Global Expansion
            </span>
          </div>

          <h2 className="mb-5 text-4xl font-light tracking-tight text-neutral-900 dark:text-neutral-100 md:text-5xl lg:text-6xl">
            Coming soon to your city
          </h2>

          <p className="mx-auto max-w-2xl text-lg text-neutral-600 dark:text-neutral-400">
            Experience our signature fragrances in exclusive boutiques across the world’s
            most iconic cities
          </p>
        </motion.div>

        {/* Globe Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <div className="relative mx-auto max-w-3xl">
            <div className="bg-gradient-radial pointer-events-none absolute inset-0 -z-10 from-neutral-200/40 via-transparent to-transparent blur-3xl dark:from-neutral-800/40" />
            <div className="overflow-hidden rounded-3xl border border-neutral-200 bg-white p-8 shadow-2xl dark:border-neutral-800 dark:bg-neutral-950 md:p-12">
              <Globe dots={cities} connections={flightPaths} />
              <p className="mt-6 text-center text-sm text-neutral-500 dark:text-neutral-500">
                Drag to rotate • Connecting Global Hubs
              </p>
            </div>
          </div>
        </motion.div>

        {/* Cities Grid Section */}
        <div>
          <p className="mb-10 text-center text-sm font-medium uppercase tracking-wider text-neutral-500">
            Featured Locations
          </p>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:gap-5">
            {cities.map((city) => (
              <motion.div
                key={city.label}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }} // ✅ dihapus semua delay
                whileHover={{ y: -3, scale: 1.02 }}
                className={clsx(
                  'group relative overflow-hidden rounded-xl',
                  'border border-neutral-200 bg-white p-5',
                  'transition-all duration-300',
                  'hover:border-neutral-300 hover:shadow-lg hover:shadow-neutral-200/50',
                  'dark:border-neutral-800 dark:bg-neutral-950',
                  'dark:hover:border-neutral-700 dark:hover:shadow-neutral-900/30'
                )}
              >
                <div className="mb-3 flex h-2.5 w-2.5">
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-neutral-400 transition-colors group-hover:bg-neutral-500 dark:bg-neutral-600 dark:group-hover:bg-neutral-500" />
                </div>
                <h3 className="mb-1 text-base font-medium text-neutral-900 dark:text-neutral-100">
                  {city.label}
                </h3>
                <p className="text-xs text-neutral-500">Future Concept</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
