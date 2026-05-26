"use client";

import { useState } from "react";
import { DayPicker } from "react-day-picker";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { motion, AnimatePresence } from "motion/react";
import { Check, Send, Calendar, Users, Phone, Mail } from "lucide-react";
import { useReservationForm } from "@/hooks/useReservationForm";
import { getWhatsAppInquiryLink } from "@/lib/whatsapp";

// Número de WhatsApp (configurable vía env)
const RAW_WHATSAPP = process.env.NEXT_PUBLIC_BUSINESS_WHATSAPP;
const WHATSAPP_NUMBER = RAW_WHATSAPP?.replace(/[^\d]/g, "");
const IS_WHATSAPP_CONFIGURED = !!WHATSAPP_NUMBER && WHATSAPP_NUMBER.length >= 10;

export default function BookingSection() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Usar el hook mejorado
  const {
    formData,
    errors,
    isSubmitting,
    setIsSubmitting,
    handleChange,
    generateWhatsAppMessage,
    validateForm,
    resetForm,
    clearFieldError,
    setFieldError,
  } = useReservationForm();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!IS_WHATSAPP_CONFIGURED) {
      alert("WhatsApp no está configurado. Contacta al administrador.");
      return;
    }

    // Validar formulario con Zod
    if (!validateForm(formData, selectedDate)) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Generar mensaje sanitizado
      const message = generateWhatsAppMessage({
        customerName: formData.customerName,
        phoneNumber: formData.phoneNumber,
        email: formData.email,
        guests: formData.guests,
        date: selectedDate,
      });

      const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;

      // Abrir WhatsApp en nueva pestaña
      window.open(whatsappUrl, "_blank");

      // Mostrar éxito
      setIsSubmitted(true);

      // Reset después de 5 segundos
      setTimeout(() => {
        setIsSubmitted(false);
        resetForm();
        setSelectedDate(new Date());
        setIsSubmitting(false);
      }, 5000);

    } catch (error) {
      console.error("Error al generar reserva:", error);
      alert("Ocurrió un error. Por favor, intenta de nuevo.");
      setIsSubmitting(false);
    }
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
            Selecciona la fecha de tu preferencia y completa el formulario, en breve nos contactaremos.
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
              onSelect={(date) => {
                setSelectedDate(date);
                if (date) {
                  const today = new Date();
                  today.setHours(0, 0, 0, 0);
                  if (date <= today) {
                    setFieldError("date", "La fecha debe ser futura");
                  } else {
                    clearFieldError("date");
                  }
                } else {
                  clearFieldError("date");
                }
              }}
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
                        className={`w-full bg-[#F5F2ED]/50 border px-4 py-3 rounded-sm focus:outline-none transition-colors ${
                          errors.customerName
                            ? "border-red-400 focus:border-red-500"
                            : "border-[#2D3424]/10 focus:border-sage"
                        }`}
                        placeholder="Ej: Juan Pérez"
                        name="customerName"
                        value={formData.customerName}
                        onChange={(e) => handleChange(e)}
                      />
                      {errors.customerName && (
                        <p className="text-red-500 text-xs mt-1">{errors.customerName}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs uppercase tracking-widest text-[#2D3424]/60 flex items-center gap-2">
                        <Phone className="w-3 h-3" /> Teléfono
                      </label>
                      <input
                        required
                        type="tel"
                        className={`w-full bg-[#F5F2ED]/50 border px-4 py-3 rounded-sm focus:outline-none transition-colors ${
                          errors.phoneNumber
                            ? "border-red-400 focus:border-red-500"
                            : "border-[#2D3424]/10 focus:border-sage"
                        }`}
                        placeholder="+54 9 11 ..."
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={(e) => handleChange(e)}
                      />
                      {errors.phoneNumber && (
                        <p className="text-red-500 text-xs mt-1">{errors.phoneNumber}</p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest text-[#2D3424]/60 flex items-center gap-2">
                      <Mail className="w-3 h-3" /> Email
                    </label>
                    <input
                      required
                      type="email"
                      className={`w-full bg-[#F5F2ED]/50 border px-4 py-3 rounded-sm focus:outline-none transition-colors ${
                        errors.email
                          ? "border-red-400 focus:border-red-500"
                          : "border-[#2D3424]/10 focus:border-sage"
                      }`}
                      placeholder="juan@ejemplo.com"
                      name="email"
                      value={formData.email}
                      onChange={(e) => handleChange(e)}
                    />
                    {errors.email && (
                      <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs uppercase tracking-widest text-[#2D3424]/60 flex items-center gap-2">
                        <Users className="w-3 h-3" /> Cantidad de Personas
                      </label>
                      <select
                        className={`w-full bg-[#F5F2ED]/50 border px-4 py-3 rounded-sm focus:outline-none transition-colors ${
                          errors.guests
                            ? "border-red-400 focus:border-red-500"
                            : "border-[#2D3424]/10 focus:border-sage"
                        }`}
                        name="guests"
                        value={formData.guests}
                        onChange={(e) => handleChange(e)}
                      >
                        {[...Array(20)].map((_, i) => (
                          <option key={i + 1} value={i + 1}>
                            {i + 1} {i + 1 === 1 ? "Persona" : "Personas"}
                          </option>
                        ))}
                      </select>
                      {errors.guests && (
                        <p className="text-red-500 text-xs mt-1">{errors.guests}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs uppercase tracking-widest text-[#2D3424]/60 flex items-center gap-2">
                        <Calendar className="w-3 h-3" /> Fecha Seleccionada
                      </label>
                      <div className={`w-full bg-[#2D3424]/5 border px-4 py-3 rounded-sm text-[#2D3424]/80 ${
                        errors.date ? "border-red-400" : "border-[#2D3424]/10"
                      }`}>
                        {selectedDate
                          ? format(selectedDate, "dd/MM/yyyy")
                          : "Selecciona una fecha"}
                      </div>
                      {errors.date && (
                        <p className="text-red-500 text-xs mt-1">{errors.date}</p>
                      )}
                    </div>
                  </div>

                  {/* Botón de consulta (arriba) */}
                  <button
                    type="button"
                    onClick={() => {
                      if (IS_WHATSAPP_CONFIGURED && WHATSAPP_NUMBER) {
                        const url = getWhatsAppInquiryLink(WHATSAPP_NUMBER);
                        window.open(url, "_blank");
                      } else {
                        alert("WhatsApp no está configurado. Contacta al administrador.");
                      }
                    }}
                    className={`w-full py-3 rounded-sm text-sm font-medium uppercase tracking-[0.15em] flex items-center justify-center gap-2 transition-all duration-500 ${
                      IS_WHATSAPP_CONFIGURED
                        ? "bg-[#25D366] text-white hover:bg-[#1DA851] cursor-pointer"
                        : "bg-gray-300 text-gray-500 cursor-not-allowed"
                    }`}
                    disabled={!IS_WHATSAPP_CONFIGURED}
                  >
                    <svg
                      className="w-4 h-4"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    Tengo una consulta...
                  </button>

                  {/* Botón de enviar reserva (abajo) */}
                  <button
                    type="submit"
                    disabled={!IS_WHATSAPP_CONFIGURED || isSubmitting}
                    className={`w-full py-4 uppercase tracking-[0.2em] text-sm rounded-sm mt-3 flex items-center justify-center gap-2 transition-all duration-500 ${
                      !IS_WHATSAPP_CONFIGURED || isSubmitting
                        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                        : "bg-forest text-white hover:bg-sage cursor-pointer"
                    }`}
                    title={
                      !IS_WHATSAPP_CONFIGURED
                        ? "WhatsApp no configurado"
                        : isSubmitting
                          ? "Enviando..."
                          : undefined
                    }
                  >
                    {isSubmitting ? (
                      <svg
                        className="animate-spin h-4 w-4"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                        />
                      </svg>
                    ) : (
                      <Send className="w-4 h-4" />
                    )}
                    {!IS_WHATSAPP_CONFIGURED
                      ? "WhatsApp no disponible"
                      : isSubmitting
                        ? "Procesando..."
                        : "Enviar Solicitud por WhatsApp"}
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
