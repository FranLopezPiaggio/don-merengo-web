import { z } from "zod";

// Schema de validación (reutilizable)
export const reservationSchema = z.object({
    customerName: z.string()
        .min(2, "Mínimo 2 caracteres")
        .max(100, "Máximo 100 caracteres")
        .regex(/^[a-zA-ZáéíóúñÑ\s]+$/, "Solo letras y espacios"),

    email: z.string()
        .email("Email inválido")
        .max(255, "Email muy largo"),

    phoneNumber: z.string()
        .regex(/^\+?[1-9]\d{1,14}$/, "Formato internacional requerido (ej: +5491112345678)"),

    date: z.string()
        .regex(/^\d{4}-\d{2}-\d{2}$/, "Formato YYYY-MM-DD")
        .refine((date) => new Date(date) > new Date(), "La fecha debe ser futura"),

    time: z.string()
        .regex(/^([0-1][0-9]|2[0-3]):[0-5][0-9]$/, "Formato HH:MM"),

    guests: z.number()
        .int("Debe ser número entero")
        .min(1, "Mínimo 1 persona")
        .max(20, "Máximo 20 personas"),

    specialRequests: z.string()
        .max(500, "Máximo 500 caracteres")
        .optional()
        .default(""),
});

export type ReservationData = z.infer<typeof reservationSchema>;

export type ReservationErrors = z.ZodError<ReservationData>;