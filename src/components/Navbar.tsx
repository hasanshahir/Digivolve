"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useTheme } from "@/context/ThemeContext";
import { Sun, Moon, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: "Services", href: "/services" },
    { name: "How We Work", href: "/#how-we-work" },
    { name: "Our Process", href: "/#our-process" },
    { name: "Our Work", href: "/#our-work" },
    { name: "Reviews", href: "/#reviews" },
    { name: "Contact", href: "/contact" },
    { name: "Portal", href: "/login" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b-2 border-border bg-bg/95 backdrop-blur-md transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Logo Mark */}
          <div className="flex-shrink-0">
            <Link href="/" className="group flex items-center gap-2">
              <span className="brutalist-badge-coral w-10 h-10 flex items-center justify-center font-display font-bold text-xl text-white select-none">
                H
              </span>
              <span className="font-display font-bold text-2xl tracking-tight text-text">
                HKH<span className="text-accent-coral">.</span>
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="font-medium text-sm text-text-muted hover:text-text hover:underline transition-colors underline-offset-4"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Right actions (Theme Toggle & CTA) */}
          <div className="hidden md:flex items-center gap-4">
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="w-11 h-11 border-2 border-border bg-surface text-text rounded-full flex items-center justify-center shadow-brutal hover:shadow-brutal-sm hover:translate-x-[2px] hover:translate-y-[2px] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all duration-150 cursor-pointer"
              aria-label="Toggle theme"
            >
              {theme === "light" ? (
                <Moon className="w-5 h-5" />
              ) : (
                <Sun className="w-5 h-5 text-accent-amber animate-[spin_10s_linear_infinite]" />
              )}
            </button>

            {/* CTA Button */}
            <Link
              href="/contact?focus=Quote"
              className="brutalist-btn brutalist-btn-primary px-6 py-2.5 text-sm"
            >
              Get a Free Quote
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center gap-3">
            <button
              onClick={toggleTheme}
              className="w-10 h-10 border-2 border-border bg-surface text-text rounded-full flex items-center justify-center shadow-brutal hover:shadow-brutal-sm hover:translate-x-[2px] hover:translate-y-[2px] transition-all cursor-pointer"
              aria-label="Toggle theme"
            >
              {theme === "light" ? (
                <Moon className="w-4 h-4" />
              ) : (
                <Sun className="w-4 h-4 text-accent-amber" />
              )}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="w-10 h-10 border-2 border-border bg-surface text-text rounded-full flex items-center justify-center shadow-brutal hover:shadow-brutal-sm hover:translate-x-[2px] hover:translate-y-[2px] transition-all cursor-pointer"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t-2 border-border bg-bg overflow-hidden transition-colors duration-300"
          >
            <div className="px-4 py-6 space-y-4 flex flex-col items-center">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="font-display font-bold text-xl text-text hover:text-accent-coral transition-colors"
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-4 w-full max-w-xs flex flex-col items-center">
                <Link
                  href="/contact?focus=Quote"
                  onClick={() => setMobileMenuOpen(false)}
                  className="brutalist-btn brutalist-btn-primary w-full py-3 text-center text-sm"
                >
                  Get a Free Quote
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
