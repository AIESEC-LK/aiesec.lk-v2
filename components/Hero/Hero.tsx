"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import Image from "next/image"

export function Hero() {
  const statsRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const mobileVideoRef = useRef<HTMLVideoElement>(null)
  const [isMobile, setIsMobile] = useState(false)
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false)

  useEffect(() => {
    // Check if window width is less than 768px
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    // Initial check
    checkMobile()

    // Add event listener for window resize
    window.addEventListener('resize', checkMobile)

    // Cleanup
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Lazy load video when component comes into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !shouldLoadVideo) {
            setShouldLoadVideo(true)
          }
        })
      },
      { threshold: 0.1 }
    )

    // Create a ref to the section element for video lazy loading
    const currentSection = document.getElementById('home')
    if (currentSection) {
      observer.observe(currentSection)
    }

    return () => observer.disconnect()
  }, [shouldLoadVideo])

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
    <section id="home" className="relative border-b-5 border-blue-500 min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 w-full h-full">
        {/* Desktop Video */}
        {shouldLoadVideo && (
          <video
            ref={videoRef}
            className={`absolute inset-0 w-full h-full object-cover pointer-events-none ${
              isMobile ? 'hidden' : 'block'
            }`}
            style={{
              width: "100vw",
              height: "150vh",
              transform: "scale(1.8)",
              opacity: 0.5,
            }}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            onLoadedData={() => {
              // Ensure video plays when loaded
              if (videoRef.current) {
                videoRef.current.play().catch(() => {
                  // Handle autoplay failure silently
                })
              }
            }}
          >
            <source src="/videos/desktop.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        )}

        {/* Mobile Video */}
        {shouldLoadVideo && (
          <video
            ref={mobileVideoRef}
            className={`absolute inset-0 w-full h-full object-cover pointer-events-none ${
              isMobile ? 'block' : 'hidden'
            }`}
            style={{
              width: "100vw",
              height: "150vh",
              transform: "scale(2)",
              opacity: 0.5,
            }}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            onLoadedData={() => {
              // Ensure video plays when loaded
              if (mobileVideoRef.current) {
                mobileVideoRef.current.play().catch(() => {
                  // Handle autoplay failure silently
                })
              }
            }}
          >
            <source src="/videos/mobile.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        )}
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
            <Image 
              src="/images/hero/30 Years Logo.png"
              alt="AIESEC Sri Lanka 30 Years"
              width={80}
              height={40}
              className="object-contain hover:scale-110 transition-transform duration-300"
              priority
            />
          </div>

          <h1 className="text-6xl md:text-8xl lg:text-9xl font-light leading-[0.95] text-balance tracking-tight">
            Youth Leadership
            <br />
            <span className="font-normal">That Transforms</span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-600 leading-relaxed max-w-6xl mx-auto font-light text-pretty">
            AIESEC empowers young people to explore their potential through international exchanges and volunteer
            opportunities across 110+ countries.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center ">
            
            
          </div>

          <div ref={statsRef} className="grid grid-cols-2 md:grid-cols-4 gap-8 pb-42 max-w-4xl mx-auto">
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

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-gray-300 rounded-full flex items-start justify-center p-2">
          <div className="w-1.5 h-1.5 bg-gray-400 rounded-full" />
        </div>
      </div>
    </section>
  )
}
