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

  // Validar un campo individual (retorna mensaje de error o null)
  const validateField = useCallback((name: string, value: string | number) => {
    switch (name) {
      case "customerName":
        if (!value || String(value).length < 2) return "Mínimo 2 caracteres";
        if (!/^[a-zA-ZáéíóúñÑ\s]+$/.test(String(value)))
          return "Solo letras y espacios";
        return null;
      case "email":
        if (!value) return "Campo requerido";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value)))
          return "Email inválido";
        return null;
      case "phoneNumber":
        if (!value) return "Campo requerido";
        if (String(value).length < 8) return "Mínimo 8 dígitos";
        return null;
      case "guests":
        if (Number(value) < 1 || Number(value) > 20)
          return "Entre 1 y 20 personas";
        return null;
      default:
        return null;
    }
  }, []);

  // Manejar cambio de inputs (actualiza estado + valida en tiempo real)
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const target = e.target;
      const { name } = target;

      // Detectar checkbox → usar checked en vez de value
      const value =
        target instanceof HTMLInputElement && target.type === "checkbox"
          ? target.checked
          : target.value;

      // Actualizar formData
      if (name === "guests") {
        setFormData((prev) => ({ ...prev, guests: Number(value) }));
      } else {
        setFormData((prev) => ({ ...prev, [name]: value }));
      }

      // Validar el campo en tiempo real (solo inputs de texto/select)
      if (typeof value === "string") {
        const error = validateField(name, value);
        setErrors((prev) => ({ ...prev, [name]: error || undefined }));
      }
    },
    [validateField]
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
      if (!date) {
        newErrors.date = "Selecciona una fecha";
      } else {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        if (date <= today) {
          newErrors.date = "La fecha debe ser futura";
        }
      }
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

  // Limpiar error de un campo específico
  const clearFieldError = useCallback((field: string) => {
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  }, []);

  // Establecer error de un campo específico
  const setFieldError = useCallback((field: string, message: string) => {
    setErrors((prev) => ({ ...prev, [field]: message }));
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
    clearFieldError,
    setFieldError,
  };
}
