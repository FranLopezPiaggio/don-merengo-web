"use client";

import { useState } from "react";
import { DayPicker } from "react-day-picker";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { motion, AnimatePresence } from "motion/react";
import { Check, Send, Calendar, Users, Phone, Mail } from "lucide-react";

// WhatsApp business number (configurable)
const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;

function generateWhatsAppMessage(data: {
  name: string;
  phone: string;
  email: string;
  people: string;
  date: Date | undefined;
}) {
  const dateStr = data.date
    ? format(data.date, "dd/MM/yyyy", { locale: es })
    : "No seleccionada";

  const message = `Hola, soy ${data.name}
Teléfono: ${data.phone}
Email: ${data.email}
Fecha: ${dateStr}
Personas: ${data.people}

Quiero realizar una reserva.`;

  return encodeURIComponent(message);
}

export default function BookingSection() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date(),
  );
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    people: "2",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Generate WhatsApp URL
    const message = generateWhatsAppMessage({
      ...formData,
      date: selectedDate,
    });

    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;

    // Open WhatsApp in new tab
    window.open(whatsappUrl, "_blank");

    // Show success state
    setIsSubmitted(true);

    // Reset after 5 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: "", email: "", phone: "", people: "2" });
      setSelectedDate(new Date());
    }, 5000);
  };

  return (
    <section id="reservas" className="py-24 bg-cream">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif text-forest mb-4">
            Planifica tu Visita
          </h2>
          <div className="w-24 h-[1px] bg-sage mx-auto mb-6" />
          <p className="text-[#2D3424]/70 max-w-2xl mx-auto font-light">
            Selecciona la fecha de tu preferencia y completa el formulario para
            que nuestro equipo de conserjería coordine tu llegada.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Calendar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white p-8 rounded-xl shadow-sm border border-[#2D3424]/5 flex justify-center"
          >
            <DayPicker
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              locale={es}
              classNames={{
                root: "w-full max-w-sm mx-auto",
                months: "relative",
                month: "space-y-4",
                month_caption:
                  "text-center text-lg font-serif text-forest tracking-wide pt-1",
                caption_label: "text-lg",
                nav: "absolute top-0 right-0 flex gap-1",
                button_previous:
                  "p-1.5 rounded-full hover:bg-cream transition-all duration-200 text-forest/30 hover:text-sage",
                button_next:
                  "p-1.5 rounded-full hover:bg-cream transition-all duration-200 text-forest/30 hover:text-sage",
                chevron: "fill-sage w-5 h-5",
                month_grid: "w-full border-collapse",
                weekdays: "w-full",
                weekday:
                  "text-center text-[11px] uppercase tracking-[0.15em] text-forest/40 font-medium pb-2 w-[14.2857%]",
                weeks: "w-full",
                week: "",
                day: "text-center p-0 w-[14.2857%]",
                day_button:
                  "w-10 h-10 mx-auto text-sm text-forest/70 hover:bg-cream hover:text-forest rounded-full transition-all duration-200 flex items-center justify-center cursor-pointer",
                today: "text-gold font-bold",
                outside: "opacity-0 pointer-events-none",
                disabled: "opacity-15 pointer-events-none",
                focused:
                  "ring-2 ring-sage/30 ring-offset-1 rounded-full",
                selected:
                  "bg-sage text-white font-medium hover:bg-sage hover:text-white rounded-full shadow-sm",
              }}
            />
          </motion.div>

          {/* Form */}
          <AnimatePresence mode="wait">
            {isSubmitted ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white p-8 rounded-xl shadow-sm border border-forest/5 flex flex-col items-center justify-center text-center min-h-[400px]"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 15 }}
                  className="w-20 h-20 bg-sage/10 rounded-full flex items-center justify-center mb-6"
                >
                  <Check className="w-10 h-10 text-sage" />
                </motion.div>
                <h3 className="text-2xl font-serif text-forest mb-3">
                  ¡Reserva Enviada!
                </h3>
                <p className="text-[#2D3424]/60 mb-6 max-w-sm">
                  Serás redirigido a WhatsApp para confirmar tu solicitud con
                  nuestro equipo.
                </p>
                <div className="flex items-center gap-2 text-sm text-[#2D3424]/40">
                  <Send className="w-4 h-4" />
                  <span>Redirigiendo...</span>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="form"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-white p-8 rounded-xl shadow-sm border border-forest/5"
              >
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs uppercase tracking-widest text-[#2D3424]/60 flex items-center gap-2">
                        <Users className="w-3 h-3" /> Nombre Completo
                      </label>
                      <input
                        required
                        type="text"
                        className="w-full bg-[#F5F2ED]/50 border border-[#2D3424]/10 px-4 py-3 rounded-sm focus:outline-none focus:border-sage transition-colors"
                        placeholder="Ej: Juan Pérez"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs uppercase tracking-widest text-[#2D3424]/60 flex items-center gap-2">
                        <Phone className="w-3 h-3" /> Teléfono
                      </label>
                      <input
                        required
                        type="tel"
                        className="w-full bg-[#F5F2ED]/50 border border-[#2D3424]/10 px-4 py-3 rounded-sm focus:outline-none focus:border-sage transition-colors"
                        placeholder="+54 9 11 ..."
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest text-[#2D3424]/60 flex items-center gap-2">
                      <Mail className="w-3 h-3" /> Email
                    </label>
                    <input
                      required
                      type="email"
                      className="w-full bg-[#F5F2ED]/50 border border-[#2D3424]/10 px-4 py-3 rounded-sm focus:outline-none focus:border-sage transition-colors"
                      placeholder="juan@ejemplo.com"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs uppercase tracking-widest text-[#2D3424]/60 flex items-center gap-2">
                        <Users className="w-3 h-3" /> Cantidad de Personas
                      </label>
                      <select
                        className="w-full bg-[#F5F2ED]/50 border border-[#2D3424]/10 px-4 py-3 rounded-sm focus:outline-none focus:border-sage transition-colors"
                        value={formData.people}
                        onChange={(e) =>
                          setFormData({ ...formData, people: e.target.value })
                        }
                      >
                        {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                          <option key={n} value={n}>
                            {n} {n === 1 ? "Persona" : "Personas"}
                          </option>
                        ))}
                        <option value="9+">Más de 8</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs uppercase tracking-widest text-[#2D3424]/60 flex items-center gap-2">
                        <Calendar className="w-3 h-3" /> Fecha Seleccionada
                      </label>
                      <div className="w-full bg-[#2D3424]/5 border border-[#2D3424]/10 px-4 py-3 rounded-sm text-[#2D3424]/80">
                        {selectedDate
                          ? format(selectedDate, "dd/MM/yyyy")
                          : "Selecciona una fecha"}
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 bg-forest text-white uppercase tracking-[0.2em] text-sm hover:bg-sage transition-all duration-500 rounded-sm mt-4 flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    Enviar Solicitud por WhatsApp
                  </button>

                  <p className="text-xs text-center text-[#2D3424]/40">
                    Serás redirigido a WhatsApp para confirmar tu reserva
                  </p>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
