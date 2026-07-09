import Hero from '@/modules/home/components/Hero'
import BrandCinematic from '@/modules/home/components/BrandCinematic'
import DiscoverysGrid from '@/modules/home/components/DiscoveryGrid'
import ValueProposition from '@/modules/home/components/ValueProposition'
import FeaturedProducts from '@/modules/home/components/FeaturedProducts'

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedProducts />
      <BrandCinematic videoFileName="cinematic-reveal.mp4" className="mt-0" />
      <ValueProposition />
      <DiscoverysGrid />
    </>
  )
}
