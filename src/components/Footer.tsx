'use client';

import { Phone, Mail, MapPin, Instagram, Facebook } from 'lucide-react';
import WhatsApp from "/svg/whatsapp-color-svgrepo-com.svg"

export default function Footer() {
  return (
    <footer id="contacto" className="bg-forest text-cream pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="space-y-6">
            <h2 className="text-3xl font-serif tracking-widest uppercase">Don Merengo</h2>
            <p className="text-cream/60 font-light text-sm leading-relaxed">
              Un legado de tradición y naturaleza. El club de campo donde cada detalle conecta.
            </p>
            <div className="flex gap-4">
              <a href="#" className="p-2 border border-cream/20 rounded-full hover:bg-sage transition-all">
                <Instagram size={18} />
              </a>
              <a href="#" className="p-2 border border-cream/20 rounded-full hover:bg-sage transition-all">
                <Facebook size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h3 className="text-lg font-serif uppercase tracking-widest">Navegación</h3>
            <ul className="space-y-4 text-sm text-cream/60 font-light">
              <li><a href="#" className="hover:text-sage transition-colors">Inicio</a></li>
              <li><a href="#reservas" className="hover:text-sage transition-colors">Reservas</a></li>
              <li><a href="#servicios" className="hover:text-sage transition-colors">Servicios</a></li>
              <li><a href="#ubicacion" className="hover:text-sage transition-colors">Ubicación</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-6">
            <h3 className="text-lg font-serif uppercase tracking-widest">Contacto</h3>
            <ul className="space-y-4 text-sm text-cream/60 font-light">
              <li className="flex items-center gap-3">
                <Phone size={16} className="text-sage" />
                <a
                  href="https://api.whatsapp.com/send?phone=5493764609782"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-sage transition-colors"
                >
                  +54 9 3764 609782
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={16} className="text-sage" />
                <span>donmerengoclubdecampo@gmail.com</span>
              </li>
              <li className="flex items-center gap-3">
                <MapPin size={16} className="text-sage" />
                <span>Club de Campo Don Merengo, Col. Garavi, Corrientes</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-cream/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] uppercase tracking-[0.2em] text-cream/40">
          <p>© {new Date().getFullYear()} Don Merengo Club de Campo. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
