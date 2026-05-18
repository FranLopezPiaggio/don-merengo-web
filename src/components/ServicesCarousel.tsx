'use client';

import useEmblaCarousel from 'embla-carousel-react';
import { motion } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useCallback } from 'react';

const services = [
  {
    title: 'Organización de Eventos',
    description: 'Espacios versátiles y un equipo dedicado para hacer de tu evento una experiencia inolvidable en un entorno de naturaleza y distinción.',
    image: '/services/ceremonia2.webp',
  },
  {
    title: 'Cumpleaños',
    description: 'Celebra tu día especial con nosotros. Salones climatizados, jardines privados y un servicio de catering personalizado para cada edad.',
    image: '/services/evento1.webp',
  },
  {
    title: 'Cabalgatas',
    description: 'Recorridos guiados por senderos naturales rodeados de monte nativo, ideales para conectar con la naturaleza y disfrutar del aire libre.',
    image: '/services/cabalgata2.webp',
  },
  {
    title: 'Cabañas',
    description: 'Acogedoras cabañas equipadas con todas las comodidades para una estadía de descanso absoluto, inmersas en el paisaje del club de campo.',
    image: '/services/cabana.webp',
  },
  {
    title: 'Bajada al Río Uruguay',
    description: 'Acceso directo a las costas del Río Uruguay con playa privada, ideal para jornadas de sol, pesca y deportes náuticos.',
    image: '/services/rio.webp',
  },
];

export default function ServicesCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'start' });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <section id="servicios" className="py-24 overflow-hidden bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="max-w-xl">
            <h2 className="text-4xl md:text-5xl font-serif text-forest mb-4">Nuestros Servicios</h2>
            <p className="text-forest/60 font-light">
              Descubre los servicios que Don Merengo tiene para ofrecerte.
            </p>
          </div>
          <div className="flex gap-4">
            <button
              onClick={scrollPrev}
              className="p-3 border border-forest/10 rounded-full hover:bg-sage hover:text-white transition-all"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={scrollNext}
              className="p-3 border border-forest/10 rounded-full hover:bg-sage hover:text-white transition-all"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        <div className="embla" ref={emblaRef}>
          <div className="embla__container flex gap-8 px-8">
            {services.map((service, index) => (
              <div key={index} className="embla__slide flex-[0_0_85%] md:flex-[0_0_45%] lg:flex-[0_0_30%]">
                <motion.div
                  whileHover={{ y: -10 }}
                  className="group cursor-pointer"
                >
                  <div>
                    <img 
                    src={service.image} 
                    alt={service.title}
                    width={1080}
                    height={1080} 
                    className="object-cover w-full h-[200px] lg:h-[300px] rounded-lg"
                    />
                  </div>
                  <h3 className="text-2xl font-serif text-forest mb-2">{service.title}</h3>
                  <p className="text-forest/60 text-sm font-light leading-relaxed">
                    {service.description}
                  </p>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
