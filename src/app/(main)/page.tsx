import Hero from '@/components/home/Hero'
import BrandCinematic from '@/components/home/BrandCinematic'
import ValueProposition from '@/components/home/ValueProposition'

export default function Home() {
  return (
    <>
      <Hero />
      <BrandCinematic videoFileName="cinematic-reveal.mp4" className="mt-0" />
      <ValueProposition />
    </>
  )
}
