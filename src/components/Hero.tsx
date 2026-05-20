'use client';

import { motion } from 'motion/react';
import Image from 'next/image';

export default function Hero() {
  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/entrada2.webp"
          alt="Don Merengo Club de Campo"
          fill
          className="object-cover blur-[6px] scale-105"
          priority
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl">

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="text-5xl md:text-8xl text-white font-serif mb-8 leading-tight"
        >
          Naturaleza, Paz <br /> & Tradición
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="flex flex-col md:flex-row items-center justify-center gap-6"
        >
          <a
            href="#reservas"
            className="px-10 py-4 bg-sage text-white uppercase tracking-widest text-xs hover:bg-forest transition-all duration-300 rounded-sm"
          >
            Reservar Ahora
          </a>
          <a
            href="#servicios"
            className="px-10 py-4 border border-white text-white uppercase tracking-widest text-xs hover:bg-white hover:text-forest transition-all duration-300 rounded-sm"
          >
            Explorar Club
          </a>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50"
      >
        <div className="w-[1px] h-16 bg-gradient-to-b from-white/50 to-transparent mx-auto" />
      </motion.div>
    </section>
  );
}
