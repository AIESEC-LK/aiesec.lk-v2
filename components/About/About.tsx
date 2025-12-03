"use client"
import { useEffect, useRef, useState } from "react"
import Image from "next/image"

export function About() {
  const cardsRef = useRef<HTMLDivElement>(null)
  const [activeValue, setActiveValue] = useState<number | null>(null)
  const [currentSentence, setCurrentSentence] = useState(0)
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [scrollProgress, setScrollProgress] = useState(0)

  const values = ["Excellence", "Integrity", "Leadership", "Diversity", "Sustainability"]

  const sentences = [
    "AIESEC is where young people step up, explore the world, and lead change. We're all about building leaders, creating impact, and making peace happen.",
    "Dive into volunteering, internships, teaching, and global experiences that challenge you, grow you, and connect you to a network of changemakers.",
    "In Sri Lanka since 1995, we're shaping the next generation of leaders ready to make a difference—for themselves, their communities, and the world.",
  ]

  const valueImages = [
    {
      src: "https://www.logos.aiesec.org/_next/image?url=https%3A%2F%2Faiesec-logos.s3.eu-west-1.amazonaws.com%2FActivating%20Leadership.png&w=640&q=75",
      alt: "Activating Leadership",
      position: { top: "10%", left: "-18%" },
      rotation: -15,
    },
    {
      src: "https://www.logos.aiesec.org/_next/image?url=https%3A%2F%2Faiesec-logos.s3.eu-west-1.amazonaws.com%2FActing%20Sustainably.png&w=640&q=75",
      alt: "Acting Sustainably",
      position: { top: "10%", right: "-18%" },
      rotation: 12,
    },
    {
      src: "https://www.logos.aiesec.org/_next/image?url=https%3A%2F%2Faiesec-logos.s3.eu-west-1.amazonaws.com%2FStriving%20for%20Excellence.png&w=640&q=75",
      alt: "Striving for Excellence",
      position: { top: "45%", left: "-20%" },
      rotation: 8,
    },
    {
      src: "https://www.logos.aiesec.org/_next/image?url=https%3A%2F%2Faiesec-logos.s3.eu-west-1.amazonaws.com%2FLiving%20Diversity.png&w=640&q=75",
      alt: "Living Diversity",
      position: { top: "45%", right: "-20%" },
      rotation: -10,
    },
    {
      src: "https://www.logos.aiesec.org/_next/image?url=https%3A%2F%2Faiesec-logos.s3.eu-west-1.amazonaws.com%2FEnjoying%20Participation.png&w=640&q=75",
      alt: "Enjoying Participation",
      position: { bottom: "10%", left: "-18%" },
      rotation: 18,
    },
    {
      src: "https://www.logos.aiesec.org/_next/image?url=https%3A%2F%2Faiesec-logos.s3.eu-west-1.amazonaws.com%2FDemonstrating%20Integrity.png&w=640&q=75",
      alt: "Demonstrating Integrity",
      position: { bottom: "10%", right: "-18%" },
      rotation: -8,
    },
  ]

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

    if (cardsRef.current) {
      const children = cardsRef.current.children
      Array.from(children).forEach((child) => observer.observe(child))
    }

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * values.length)
      setActiveValue(randomIndex)

      setTimeout(() => {
        setActiveValue(null)
      }, 2000)
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      if (!scrollContainerRef.current) return

      const container = scrollContainerRef.current
      const scrollTop = window.scrollY
      const containerTop = container.offsetTop
      const containerHeight = container.offsetHeight

      const relativeScroll = scrollTop - containerTop + window.innerHeight / 2
      const progress = Math.max(0, Math.min(1, relativeScroll / containerHeight))
      setScrollProgress(progress)

      const sectionHeight = containerHeight / 3

      if (relativeScroll < sectionHeight) {
        setCurrentSentence(0)
      } else if (relativeScroll < sectionHeight * 2) {
        setCurrentSentence(1)
      } else {
        setCurrentSentence(2)
      }
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll()

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <section id="about" className="py-32 bg-gray-50">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-7xl mx-auto mb-32">
          <h2 className="text-4xl md:text-5xl font-light leading-tight mb-2 text-gray-900">
            It's time to change the world with,
          </h2>

          <div className="relative">
            {activeValue !== null && (
              <div className="fixed top-0 left-0 w-0 h-0 overflow-hidden pointer-events-none">
                <iframe
                  id="values-video"
                  className="w-full h-full"
                  src="https://www.youtube.com/embed/yRB-kL7DEgM?autoplay=1&mute=1&loop=1&playlist=yRB-kL7DEgM&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1"
                  title="Values background video"
                  allow="autoplay; encrypted-media"
                />
              </div>
            )}

            <div className="space-y-2">
              <div className="flex gap-4 items-baseline">
                <div
                  className="relative inline-block"
                  style={{
                    background:
                      activeValue === 0
                        ? "url('https://i.ytimg.com/vi/yRB-kL7DEgM/maxresdefault.jpg') center/cover"
                        : "none",
                    backgroundClip: activeValue === 0 ? "text" : "unset",
                    WebkitBackgroundClip: activeValue === 0 ? "text" : "unset",
                    color: activeValue === 0 ? "transparent" : "#037EF3",
                    WebkitTextStroke: activeValue === 0 ? "0px" : "2px #037EF3",
                    transition: "all 0.5s ease",
                  }}
                >
                  <span className="text-5xl md:text-7xl lg:text-8xl font-semibold leading-none">Excellence,</span>
                </div>
                <div
                  className="relative inline-block"
                  style={{
                    background:
                      activeValue === 1
                        ? "url('https://i.ytimg.com/vi/yRB-kL7DEgM/maxresdefault.jpg') center/cover"
                        : "none",
                    backgroundClip: activeValue === 1 ? "text" : "unset",
                    WebkitBackgroundClip: activeValue === 1 ? "text" : "unset",
                    color: activeValue === 1 ? "transparent" : "#037EF3",
                    WebkitTextStroke: activeValue === 1 ? "0px" : "2px #037EF3",
                    transition: "all 0.5s ease",
                  }}
                >
                  <span className="text-5xl md:text-7xl lg:text-8xl font-semibold leading-none">Integrity,</span>
                </div>
              </div>

              <div className="flex gap-4 items-baseline">
                <div
                  className="relative inline-block"
                  style={{
                    background:
                      activeValue === 2
                        ? "url('https://i.ytimg.com/vi/yRB-kL7DEgM/maxresdefault.jpg') center/cover"
                        : "none",
                    backgroundClip: activeValue === 2 ? "text" : "unset",
                    WebkitBackgroundClip: activeValue === 2 ? "text" : "unset",
                    color: activeValue === 2 ? "transparent" : "#037EF3",
                    WebkitTextStroke: activeValue === 2 ? "0px" : "2px #037EF3",
                    transition: "all 0.5s ease",
                  }}
                >
                  <span className="text-5xl md:text-7xl lg:text-8xl font-semibold leading-none">Leadership,</span>
                </div>
                <div
                  className="relative inline-block"
                  style={{
                    background:
                      activeValue === 3
                        ? "url('https://i.ytimg.com/vi/yRB-kL7DEgM/maxresdefault.jpg') center/cover"
                        : "none",
                    backgroundClip: activeValue === 3 ? "text" : "unset",
                    WebkitBackgroundClip: activeValue === 3 ? "text" : "unset",
                    color: activeValue === 3 ? "transparent" : "#037EF3",
                    WebkitTextStroke: activeValue === 3 ? "0px" : "2px #037EF3",
                    transition: "all 0.5s ease",
                  }}
                >
                  <span className="text-5xl md:text-7xl lg:text-8xl font-semibold leading-none">Diversity,</span>
                </div>
              </div>

              <div className="flex gap-4">
                <div
                  className="relative inline-block"
                  style={{
                    background:
                      activeValue === 4
                        ? "url('https://i.ytimg.com/vi/yRB-kL7DEgM/maxresdefault.jpg') center/cover"
                        : "none",
                    backgroundClip: activeValue === 4 ? "text" : "unset",
                    WebkitBackgroundClip: activeValue === 4 ? "text" : "unset",
                    color: activeValue === 4 ? "transparent" : "#037EF3",
                    WebkitTextStroke: activeValue === 4 ? "0px" : "2px #037EF3",
                    transition: "all 0.5s ease",
                  }}
                >
                  <span className="text-5xl md:text-7xl lg:text-8xl font-semibold leading-none">& Sustainability</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          ref={scrollContainerRef}
          className="relative max-w-4xl mx-auto mb-32 min-h-[250px] flex items-center overflow-visible"
        >
          {[0, 1, 2].map((sentenceIndex) => (
            <div
              key={`circle-${sentenceIndex}`}
              className="absolute w-32 h-32 rounded-full border-2 border-blue-200 transition-all duration-1000 z-0"
              style={{
                top: sentenceIndex === 0 ? "15%" : sentenceIndex === 1 ? "50%" : "80%",
                left: sentenceIndex % 2 === 0 ? "5%" : "auto",
                right: sentenceIndex % 2 === 1 ? "5%" : "auto",
                opacity: currentSentence === sentenceIndex ? 0.3 : 0,
                transform: currentSentence === sentenceIndex ? "scale(1.2)" : "scale(0.8)",
                pointerEvents: "none",
              }}
            />
          ))}

          {[...Array(6)].map((_, i) => (
            <div
              key={`particle-${i}`}
              className="absolute w-2 h-2 rounded-full bg-blue-400 transition-all duration-700 z-0"
              style={{
                top: `${15 + i * 15}%`,
                left: i % 2 === 0 ? "8%" : "auto",
                right: i % 2 === 1 ? "8%" : "auto",
                opacity: Math.floor(i / 2) === currentSentence ? 0.5 : 0,
                transform: Math.floor(i / 2) === currentSentence ? "translateY(0)" : "translateY(20px)",
                pointerEvents: "none",
              }}
            />
          ))}

          {valueImages.map((image, index) => {
            const sentenceGroup = Math.floor(index / 2)
            const isVisible = sentenceGroup === currentSentence

            return (
              <div
                key={index}
                className="absolute w-28 h-28 md:w-36 md:h-36 transition-all duration-700 z-0"
                style={{
                  ...image.position,
                  transform: isVisible
                    ? `rotate(${image.rotation}deg) scale(1) translateY(${Math.sin(scrollProgress * 10 + index) * 10}px)`
                    : `rotate(${image.rotation}deg) scale(0.3) translateY(50px)`,
                  opacity: isVisible ? 0.9 : 0,
                  pointerEvents: "none",
                  filter: isVisible ? "none" : "blur(4px)",
                }}
              >
                <Image src={image.src || "/placeholder.svg"} alt={image.alt} fill className="object-contain" />
              </div>
            )
          })}

          <div
            className="absolute inset-0 pointer-events-none z-0 transition-opacity duration-1000"
            style={{
              background: `radial-gradient(circle at ${currentSentence === 0 ? "30%" : currentSentence === 1 ? "50%" : "70%"} 50%, rgba(3, 126, 243, 0.05) 0%, transparent 70%)`,
              opacity: 0.6,
            }}
          />

          <div className="relative w-full min-h-[100px] overflow-hidden z-10 bg-white/80 backdrop-blur-sm rounded-2xl p-8">
            {sentences.map((sentence, index) => (
              <div
                key={index}
                className="absolute inset-0 transition-all duration-700 ease-out p-8"
                style={{
                  transform:
                    currentSentence === index
                      ? "translateY(0) rotateX(0deg)"
                      : currentSentence > index
                        ? "translateY(-100%) rotateX(-90deg)"
                        : "translateY(100%) rotateX(90deg)",
                  opacity: currentSentence === index ? 1 : 0,
                  transformStyle: "preserve-3d",
                }}
              >
                <p className="text-xl md:text-2xl font-light leading-relaxed text-gray-700 text-balance">{sentence}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
