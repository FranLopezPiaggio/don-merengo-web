// hooks/useReservationForm.ts
"use client";

import { useState, useCallback } from "react";
import { format } from "date-fns";
import { es } from "date-fns/locale";

type FormData = {
  customerName: string;
  email: string;
  phoneNumber: string;
  date: string;
  time: string;
  guests: number;
  specialRequests: string;
};

type FormErrors = {
  customerName?: string;
  email?: string;
  phoneNumber?: string;
  date?: string;
  time?: string;
  guests?: string;
};

export function useReservationForm() {
  const [formData, setFormData] = useState<FormData>({
    customerName: "",
    email: "",
    phoneNumber: "",
    date: "",
    time: "19:00",
    guests: 2,
    specialRequests: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Generar mensaje para WhatsApp
  const generateWhatsAppMessage = useCallback(
    (data: {
      customerName: string;
      phoneNumber: string;
      email: string;
      guests: number;
      date: Date | undefined;
    }) => {
      const sanitize = (text: string) =>
        text.replace(/[^\p{L}\p{N}\s@.,!¡¿?\-]/gu, "").trim().substring(0, 500);

      const formatPhone = (phone: string) => phone.replace(/[^\d+]/g, "");

      const dateStr = data.date
        ? format(data.date, "dd/MM/yyyy", { locale: es })
        : "No seleccionada";

      const message = `Hola, soy ${sanitize(data.customerName)}
Teléfono: ${formatPhone(data.phoneNumber)}
Email: ${sanitize(data.email)}
Fecha: ${dateStr}
Personas: ${data.guests}

Quiero realizar una reserva.`;

      return encodeURIComponent(message);
    },
    []
  );

  // Manejar cambio de inputs
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value } = e.target;

      if (name === "guests") {
        setFormData((prev) => ({ ...prev, guests: Number(value) }));
      } else {
        setFormData((prev) => ({ ...prev, [name]: value }));
      }
    },
    []
  );

  // Validar formulario completo
  const validateForm = useCallback(
    (data: FormData, date: Date | undefined) => {
      const newErrors: FormErrors = {};

      if (!data.customerName || data.customerName.length < 2)
        newErrors.customerName = "Mínimo 2 caracteres";
      if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
        newErrors.email = "Email inválido";
      if (!data.phoneNumber || data.phoneNumber.length < 8)
        newErrors.phoneNumber = "Mínimo 8 dígitos";
      if (!date) newErrors.date = "Selecciona una fecha";
      if (data.guests < 1 || data.guests > 20)
        newErrors.guests = "Entre 1 y 20 personas";

      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    },
    []
  );

  // Limpiar formulario
  const resetForm = useCallback(() => {
    setFormData({
      customerName: "",
      email: "",
      phoneNumber: "",
      date: "",
      time: "19:00",
      guests: 2,
      specialRequests: "",
    });
    setErrors({});
  }, []);

  return {
    formData,
    errors,
    isSubmitting,
    setIsSubmitting,
    handleChange,
    generateWhatsAppMessage,
    validateForm,
    resetForm,
  };
}
