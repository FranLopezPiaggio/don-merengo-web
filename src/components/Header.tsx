'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Phone, Instagram, Facebook } from 'lucide-react';

const SCROLL_THRESHOLD = 150;
const SCROLL_DELAY = 120;

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hideTimeout, setHideTimeout] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    let currentScrollY = 0;
    
    const handleScroll = () => {
      const newScrollY = window.scrollY;
      
      // Transparency logic
      if (newScrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Hide/Show logic con latencia
      if (newScrollY > currentScrollY && newScrollY > SCROLL_THRESHOLD) {
        // Scroll down → hide con delay
        if (!hideTimeout && isVisible) {
          const timeout = setTimeout(() => {
            setIsVisible(false);
          }, SCROLL_DELAY);
          setHideTimeout(timeout);
        }
      } else if (newScrollY < currentScrollY) {
        // Scroll up → show inmediato y cancelar hide
        if (hideTimeout) {
          clearTimeout(hideTimeout);
          setHideTimeout(null);
        }
        setIsVisible(true);
      }
      
      currentScrollY = newScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (hideTimeout) clearTimeout(hideTimeout);
    };
  }, [isVisible, hideTimeout]);

  const navLinks = [
    { name: 'Inicio', href: '#' },
    { name: 'Reservas', href: '#reservas' },
    { name: 'Servicios', href: '#servicios' },
    { name: 'Ubicación', href: '#ubicacion' },
    { name: 'Contacto', href: '#contacto' },
  ];

  return (
    <motion.header
      initial={{ y: 0 }}
      animate={{ y: isVisible ? 0 : -200 }}
      transition={{ duration: 0.3 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? 'bg-cream/90 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <Image 
          src={isScrolled ? '/don-merengo-logo-b.svg' : '/don-merengo-logo-w.svg'}
          alt="Don Merengo Club de Campo" 
          width={125}
          height={125}
          className="w-32 h-auto transition-all duration-300"
        />

        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className={`text-sm uppercase tracking-widest hover:text-sage transition-colors ${
                isScrolled ? 'text-forest' : 'text-white'
              }`}
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <X className={isScrolled ? 'text-forest' : 'text-white'} />
          ) : (
            <Menu className={isScrolled ? 'text-forest' : 'text-white'} />
          )}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-cream border-t border-forest/10 p-6 md:hidden flex flex-col space-y-4 shadow-xl"
          >
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-forest text-lg font-serif uppercase tracking-widest border-b border-forest/5 pb-2"
              >
                {link.name}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
