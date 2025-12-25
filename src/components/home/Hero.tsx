export default function Hero() {
    return (
        <section className="min-h-screen flex flex-col items-center justify-center text-center px-6">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">
                Lazain Bleu
            </h1>

            <p className="text-lg md:text-xl text-neutral-600 dark:text-neutral-300 max-w-xl mb-8">
                Elevate your essence. Discover premium fragrances crafted for modern luxury.
            </p>

            <button className="px-6 py-3 rounded-xl bg-black text-white dark:bg-white dark:text-black transition hover:opacity-80">
                Shop Now
            </button>
        </section>
    );
}