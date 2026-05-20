"use client";

import { motion } from "motion/react";
import { Star, Quote } from "lucide-react";

const reviews = [
  {
    name: "Roberto Gómez",
    text: "Un lugar increíble para desconectarse de la ciudad. El servicio es impecable y el entorno natural es simplemente único.",
    rating: 5,
  },
  {
    name: "Elena Martínez",
    text: "Las cabalgatas y la bajada al rio son perfectas. Ideal para pasar el fin de semana en familia.",
    rating: 5,
  },
  {
    name: "Carlos Schmidt",
    text: "El quincho, la pileta y todo el campo son hermosos, muy lindo para ir a descansar.",
    rating: 4,
  },
];

export default function LocationSection() {
  return (
    <section id="ubicacion" className="py-24 bg-cream">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif text-forest mb-4">
            Ubicación & Reseñas
          </h2>
          <div className="w-24 h-[1px] bg-sage mx-auto" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Map */}
          <div className="lg:col-span-2 h-[500px] rounded-xl overflow-hidden shadow-sm border border-forest/5">
            {/* <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3284.016887868506!2d-58.381557!3d-34.6037389!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzTCsDM2JzEzLjUiUyA1OMKwMjInNTMuNiJX!5e0!3m2!1ses!2sar!4v1625145000000!5m2!1ses!2sar"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe> */}
            {/* <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14812.879834008387!2d-55.78666462117039!3d-28.23931410471625!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94560b001b29ed91%3A0x90cd275cd1c0f0f2!2sCampo%20Don%20Merengo!5e0!3m2!1ses-419!2sar!4v1776729326973!5m2!1ses-419!2sar"
              width="600"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            /> */}
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14812.879834008387!2d-55.78666462117039!3d-28.23931410471625!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94560b001b29ed91%3A0x90cd275cd1c0f0f2!2sCampo%20Don%20Merengo!5e0!3m2!1ses-419!2sar!4v1776729326973!5m2!1ses-419!2sar"
              width="800"
              height="600"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          {/* Reviews */}
          <div className="space-y-6">
            <h3 className="text-2xl font-serif text-forest mb-6 flex items-center gap-2">
              Lo que dicen nuestros socios
            </h3>
            {reviews.map((review, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-6 rounded-lg shadow-sm border border-forest/5 relative"
              >
                <Quote
                  className="absolute top-4 right-4 text-sage/20"
                  size={32}
                />
                <div className="flex gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      className={
                        i < review.rating
                          ? "fill-gold text-gold"
                          : "text-forest/10"
                      }
                    />
                  ))}
                </div>
                <p className="text-forest/70 text-sm italic mb-4 leading-relaxed">
                  &ldquo;{review.text}&rdquo;
                </p>
                <p className="text-forest font-medium text-sm">
                  — {review.name}
                </p>
              </motion.div>
            ))}

            <div className="pt-4">
              <a
                href="#"
                className="text-sage text-sm uppercase tracking-widest font-medium hover:text-forest transition-colors"
              >
                Ver todas las reseñas en Google →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
