'use client';

import { Phone, Mail, MapPin, Instagram, Facebook, Twitter } from 'lucide-react';

export default function Footer() {
  return (
    <footer id="contacto" className="bg-forest text-cream pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="space-y-6">
            <h2 className="text-3xl font-serif tracking-widest uppercase">Don Merengo</h2>
            <p className="text-cream/60 font-light text-sm leading-relaxed">
              Un legado de tradición y naturaleza. El club de campo más exclusivo de la región, donde cada detalle está pensado para tu bienestar.
            </p>
            <div className="flex gap-4">
              <a href="#" className="p-2 border border-cream/20 rounded-full hover:bg-sage transition-all">
                <Instagram size={18} />
              </a>
              <a href="#" className="p-2 border border-cream/20 rounded-full hover:bg-sage transition-all">
                <Facebook size={18} />
              </a>
              <a href="#" className="p-2 border border-cream/20 rounded-full hover:bg-sage transition-all">
                <Twitter size={18} />
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
                <span>+54 9 11 1234 5678</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={16} className="text-sage" />
                <span>contacto@laestancia.com</span>
              </li>
              <li className="flex items-center gap-3">
                <MapPin size={16} className="text-sage" />
                <span>Club de Campo Don Merengo, Col. Garavi, Corrientes</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          {/* <div className="space-y-6">
            <h3 className="text-lg font-serif uppercase tracking-widest">Newsletter</h3>
            <p className="text-cream/60 text-sm font-light">
              Suscríbete para recibir novedades y eventos exclusivos.
            </p>
            <form className="flex">
              <input
                type="email"
                placeholder="Tu email"
                className="bg-cream/10 border border-cream/20 px-4 py-2 text-sm focus:outline-none focus:border-sage w-full"
              />
              <button className="bg-sage px-4 py-2 text-white hover:bg-white hover:text-forest transition-all">
                OK
              </button>
            </form>
          </div> */}
        </div>

        <div className="border-t border-cream/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] uppercase tracking-[0.2em] text-cream/40">
          <p>© 2024 Don Merengo Club de Campo. Todos los derechos reservados.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-cream transition-colors">Términos y Condiciones</a>
            <a href="#" className="hover:text-cream transition-colors">Política de Privacidad</a>
            <a href="#" className="hover:text-cream transition-colors">Aviso Legal</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
