"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import Image from "next/image"

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navLinks = [
    { href: "#home", label: "Home" },
    { href: "#about", label: "About" },
    { href: "#opportunities", label: "Opportunities" },
    { href: "#partners", label: "Partners" },
    { href: "#contact", label: "Contact" },
  ]

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/40 backdrop-blur-xl border-b border-white/20 shadow-lg shadow-black/5" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <a href="#home" className="flex items-center relative z-10">
            <Image
              src="https://aiesec.lk/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fbluelogo.11776f2a.png&w=384&q=75"
              alt="AIESEC Sri Lanka"
              width={120}
              height={40}
              className="h-10 w-auto"
            />
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="relative px-4 py-2 text-sm font-light text-gray-700 hover:text-gray-900 transition-all duration-300 rounded-lg hover:bg-white/30 hover:backdrop-blur-md group"
              >
                <span className="relative z-10">{link.label}</span>
                <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-white/0 to-white/0 group-hover:from-white/40 group-hover:to-white/10 transition-all duration-300 opacity-0 group-hover:opacity-100" />
              </a>
            ))}
            <Button 
              size="sm" 
              className="relative overflow-hidden bg-black/80 backdrop-blur-md hover:bg-black/90 text-white rounded-lg h-9 px-5 font-light border border-white/10 shadow-lg shadow-black/20 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-black/30 ml-2"
            >
              <span className="relative z-10">Join Now</span>
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsOpen(!isOpen)} 
            className="md:hidden text-gray-900 p-2 rounded-lg hover:bg-white/30 hover:backdrop-blur-md transition-all duration-300" 
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-white/20">
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 text-sm font-light text-gray-700 hover:text-gray-900 transition-all duration-300 rounded-lg hover:bg-white/30 hover:backdrop-blur-md"
                >
                  {link.label}
                </a>
              ))}
              <Button 
                size="sm" 
                className="relative overflow-hidden bg-black/80 backdrop-blur-md hover:bg-black/90 text-white rounded-lg w-full font-light border border-white/10 shadow-lg shadow-black/20 transition-all duration-300"
              >
                <span className="relative z-10">Join Now</span>
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navigation;