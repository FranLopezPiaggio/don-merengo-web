// lib/submitReservation.ts
import type { ReservationData } from "@/types/reservation";

/**
 * Esta función es un placeholder para futura integración con API
 * Por ahora solo valida y retorna los datos
 */
export async function submitReservation(data: ReservationData): Promise<{ success: boolean; error?: string }> {
    // Simular delay de red
    await new Promise(resolve => setTimeout(resolve, 500));

    try {
        // Aquí podrías enviar a tu backend en el futuro
        console.log("Reserva guardada:", data);

        // Guardar en localStorage para demo
        const reservations = JSON.parse(localStorage.getItem("reservations") || "[]");
        reservations.push({ ...data, timestamp: new Date().toISOString() });
        localStorage.setItem("reservations", JSON.stringify(reservations));

        return { success: true };
    } catch (error) {
        return { success: false, error: "Error al guardar la reserva" };
    }
}