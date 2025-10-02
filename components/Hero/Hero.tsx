"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { useEffect, useRef } from "react"

export function Hero() {
  const statsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-on-scroll")
          }
        })
      },
      { threshold: 0.1 },
    )

    if (statsRef.current) {
      const children = statsRef.current.children
      Array.from(children).forEach((child) => observer.observe(child))
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 w-full h-full">
        <iframe
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          style={{
            width: "100vw",
            height: "100vh",
            transform: "scale(1.5)",
            opacity: 0.5,
          }}
          src="https://www.youtube.com/embed/2BcA4ECWiT8?autoplay=1&mute=1&loop=1&playlist=2BcA4ECWiT8&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1"
          title="Background video"
          allow="autoplay; encrypted-media"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/20 to-background/60" />
      </div>

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-100 rounded-2xl opacity-40 blur-xl animate-float" />
        <div className="absolute top-40 right-20 w-24 h-24 bg-purple-100 rounded-2xl opacity-40 blur-xl animate-float-delayed" />
        <div className="absolute bottom-40 left-1/4 w-28 h-28 bg-pink-100 rounded-2xl opacity-40 blur-xl animate-float" />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10 pt-32 pb-20">
        <div className="max-w-5xl mx-auto text-center space-y-8 animate-fade-in">
          <div className="inline-block">
            <div className="bg-white/70 backdrop-blur-sm text-gray-800 px-5 py-2.5 rounded-full text-sm font-medium shadow-sm flex items-center justify-center min-h-[2.5rem]">
              Celebrating 30 Years in Sri Lanka
            </div>
          </div>

          <h1 className="text-6xl md:text-8xl lg:text-9xl font-light leading-[0.95] text-balance tracking-tight">
            Youth Leadership
            <br />
            <span className="font-normal">That Transforms</span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-600 leading-relaxed max-w-3xl mx-auto font-light text-pretty">
            AIESEC empowers young people to explore their potential through international exchanges and volunteer
            opportunities across 110+ countries.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            
            
          </div>

          <div ref={statsRef} className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-16 max-w-4xl mx-auto">
            <div className="space-y-2">
              <div className="text-5xl md:text-6xl font-light text-gray-900">500+</div>
              <div className="text-sm text-gray-500 font-light">Active Members</div>
            </div>
            <div className="space-y-2">
              <div className="text-5xl md:text-6xl font-light text-gray-900">15+</div>
              <div className="text-sm text-gray-500 font-light">Universities</div>
            </div>
            <div className="space-y-2">
              <div className="text-5xl md:text-6xl font-light text-gray-900">1000+</div>
              <div className="text-sm text-gray-500 font-light">Exchanges</div>
            </div>
            <div className="space-y-2">
              <div className="text-5xl md:text-6xl font-light text-gray-900">30</div>
              <div className="text-sm text-gray-500 font-light">Years</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
