import type { ReservationData } from "@/types/reservation";

// Configuración (usar variables de entorno)
const BUSINESS_WHATSAPP = process.env.NEXT_PUBLIC_BUSINESS_WHATSAPP || "5491112345678";

/**
 * Construye el mensaje de reserva para WhatsApp
 * Sanitizado para prevenir inyecciones
 */
export function buildWhatsAppMessage(data: ReservationData): string {
    const sanitize = (text: string) => {
        return text
            .replace(/[^\p{L}\p{N}\s@.,!¡¿?\-]/gu, '')
            .trim()
            .substring(0, 500);
    };

    const formatDate = (dateStr: string) => {
        const [year, month, day] = dateStr.split('-');
        return `${day}/${month}/${year}`;
    };

    const lines = [
        "📅 *NUEVA RESERVA*",
        "",
        `👤 *Cliente:* ${sanitize(data.customerName)}`,
        `📞 *WhatsApp:* ${data.phoneNumber}`,
        `📧 *Email:* ${sanitize(data.email)}`,
        `🗓️ *Fecha:* ${formatDate(data.date)}`,
        `⏰ *Hora:* ${data.time}`,
        `👥 *Personas:* ${data.guests}`,
    ];

    if (data.specialRequests && data.specialRequests.trim()) {
        lines.push("", `✨ *Notas:* ${sanitize(data.specialRequests)}`);
    }

    lines.push("", "--- Mensaje automático ---");

    return lines.join("\n");
}

/**
 * Genera link de wa.me con el mensaje codificado
 */
export function generateWaMeLink(phoneNumber: string, message: string): string {
    // Limpiar número (solo dígitos)
    const cleanPhone = phoneNumber.replace(/\D/g, '');

    if (!cleanPhone || cleanPhone.length < 10) {
        throw new Error("Número de teléfono inválido");
    }

    // Codificar mensaje para URL
    const encodedMessage = encodeURIComponent(message);

    return `https://wa.me/${cleanPhone}?text=${encodedMessage}`;
}

/**
 * Función principal: genera el link de WhatsApp para la reserva
 */
export function getReservationWhatsAppLink(data: ReservationData): string {
    const message = buildWhatsAppMessage(data);
    return generateWaMeLink(BUSINESS_WHATSAPP, message);
}