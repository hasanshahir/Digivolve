"use client";

import React, { useState } from "react";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Testimonial {
  id: number;
  rating: number;
  text: string;
  author: string;
  role: string;
  company: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    rating: 5,
    text: "HKH completely transformed our brand assets and delivered a conversion-optimized marketing website in under two weeks. Our inbound lead conversions jumped by 42% in the first month.",
    author: "Salman Khan",
    role: "Founder",
    company: "SwiftSaaS",
  },
  {
    id: 2,
    rating: 5,
    text: "Working directly with the creators at HKH made a massive difference. No middle management delays. They built an educational content pipeline that established our authority online in record time.",
    author: "Amna Shah",
    role: "Marketing Director",
    company: "Visa Agency Hub",
  },
  {
    id: 3,
    rating: 5,
    text: "The cross-platform app developed by HKH features an incredibly intuitive design and operates flawlessly. Our customer retention rates grew by 30% in just two months after release.",
    author: "David Vance",
    role: "Product Owner",
    company: "FinTech Solved",
  },
];

export default function ReviewsCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto px-4">
      {/* Quotation Mark Accent badges */}
      <div className="absolute -top-6 -left-2 sm:-left-6 hidden sm:block">
        <span className="brutalist-badge-coral w-12 h-12 flex items-center justify-center text-white">
          <Quote className="w-5 h-5 fill-current" />
        </span>
      </div>

      <div className="absolute -bottom-6 -right-2 sm:-right-6 hidden sm:block">
        <span className="brutalist-badge-sky w-12 h-12 flex items-center justify-center text-text">
          <Quote className="w-5 h-5 fill-current transform rotate-180" />
        </span>
      </div>

      {/* Main Card */}
      <div className="brutalist-card bg-surface p-8 sm:p-12 md:p-16 text-left relative overflow-hidden min-h-[300px] flex flex-col justify-between">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
            className="space-y-6"
          >
            {/* Stars */}
            <div className="flex gap-1">
              {[...Array(testimonials[activeIndex].rating)].map((_, i) => (
                <Star key={i} className="w-6 h-6 fill-accent-amber text-border" strokeWidth={2} />
              ))}
            </div>

            {/* Testimonial text */}
            <p className="text-xl sm:text-2xl font-display font-medium text-text leading-relaxed">
              "{testimonials[activeIndex].text}"
            </p>

            {/* Author */}
            <div>
              <h5 className="font-display font-bold text-lg text-text">
                {testimonials[activeIndex].author}
              </h5>
              <p className="text-text-muted text-sm">
                {testimonials[activeIndex].role}, <span className="text-accent-coral font-semibold">{testimonials[activeIndex].company}</span>
              </p>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Buttons */}
        <div className="flex justify-end gap-3 mt-8 pt-6 border-t border-border/10">
          <button
            onClick={handlePrev}
            className="w-10 h-10 border-2 border-border bg-bg text-text rounded-full flex items-center justify-center shadow-brutal-sm hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none transition-all cursor-pointer"
            aria-label="Previous review"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={handleNext}
            className="w-10 h-10 border-2 border-border bg-bg text-text rounded-full flex items-center justify-center shadow-brutal-sm hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none transition-all cursor-pointer"
            aria-label="Next review"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
