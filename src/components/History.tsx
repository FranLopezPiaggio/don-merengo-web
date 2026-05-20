"use client";

import { motion } from "motion/react";
import Image from "next/image";

interface HistoryProps {
  backgroundImage?: string;
}

export default function History({ backgroundImage = "/rioUruguay.webp" }: HistoryProps) {
  return (
    <section id="historia" className="relative py-32 min-h-[600px] flex items-center">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={backgroundImage}
          alt="Historia de Don Merengo"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-forest/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-serif text-white mb-6">
              Nuestra Historia
            </h2>
            <div className="w-24 h-[1px] bg-sage mb-8" />
            <p className="text-white/90 text-lg leading-relaxed mb-6">
              Don Merengo Club de Campo es un lugar con historia, en donde surgieron muchos encuentros iniciando con nuestro bisabuelo y en donde nosotros, hijos y nietos queremos continuar la historia.
            </p>
            <p className="text-white/90 text-lg leading-relaxed mb-6">
              Por eso hoy en día seguimos abriendo nuestras puertas para que nuevos amigos puedan disfrutar de nuestros espacios y crear nuevas experiencias inolvidables.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}