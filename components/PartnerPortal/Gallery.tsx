"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

const galleryImages = [
  {
    id: 1,
    src: "/images/partnerPortal/Gallery/1_img.jpg",
    alt: "Partnership Event 1",
    caption: "Collaborative initiatives with our partners"
  },
  {
    id: 2,
    src: "/images/partnerPortal/Gallery/2_img.jpg",
    alt: "Partnership Event 2", 
    caption: "Building meaningful connections"
  },
  {
    id: 3,
    src: "/images/partnerPortal/Gallery/3_img.jpg",
    alt: "Partnership Event 3",
    caption: "Innovation and growth together"
  },
  {
    id: 4,
    src: "/images/partnerPortal/Gallery/4_img.jpg",
    alt: "Partnership Event 4",
    caption: "Empowering youth through partnerships"
  },
  {
    id: 5,
    src: "/images/partnerPortal/Gallery/5_img.jpg",
    alt: "Partnership Event 5",
    caption: "Creating opportunities for young leaders"
  },
  {
    id: 6,
    src: "/images/partnerPortal/Gallery/6_img.jpg",
    alt: "Partnership Event 6",
    caption: "Celebrating successful collaborations"
  }
];

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<typeof galleryImages[0] | null>(null);

  return (
    <section className="bg-gradient-to-br from-gray-50 to-white py-24">
      <div className="container mx-auto px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Partnership <span className="text-[#037EF3]">Gallery</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Moments captured from our collaborative journey with partners, 
            showcasing the impact we create together
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {galleryImages.map((image, index) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
              className="group cursor-pointer"
              onClick={() => setSelectedImage(image)}
            >
              <div className="relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 bg-white">
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-4 left-4 right-4">
                    <p className="text-white text-sm font-medium">
                      {image.caption}
                    </p>
                  </div>
                </div>

                {/* Hover Effect Border */}
                <div className="absolute inset-0 border-2 border-[#037EF3] rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Lightbox Modal */}
        <AnimatePresence>
          {selectedImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedImage(null)}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="relative max-w-4xl max-h-[90vh] mx-auto"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close Button */}
                <button
                  onClick={() => setSelectedImage(null)}
                  className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors z-10"
                >
                  <X size={32} />
                </button>

                {/* Image */}
                <img
                  src={selectedImage.src}
                  alt={selectedImage.alt}
                  className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
                />

                {/* Caption */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 rounded-b-lg">
                  <p className="text-white text-center font-medium">
                    {selectedImage.caption}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Gallery;
