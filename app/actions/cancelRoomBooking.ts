"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

import { createSessionClient } from "@/config/appwrite";

export async function cancelRoomBooking(id: string) {
    // Retrieve the cookies instance
    const cookiesInstance = await cookies();

    // Retrieve the session cookie
    const sessionCookie = cookiesInstance.get('appwrite-session-cookie');
    if (!sessionCookie) {
        redirect("/login");
    }

    try {
        const { databases, account } = await createSessionClient(sessionCookie.value);
        const user = await account.get();

        const userId = user.$id;

        //fetch rooms
        const booking = await databases.getDocument(
            process.env.NEXT_PUBLIC_APPWRITE_DATABASE!,
            process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_BOOKING!,
            id
        )

        if (booking.user_id !== userId) {
            return {
                error: "You are not authoeized to cancel this booking!",
                isLoading: false
            }
        }

        await databases.deleteDocument(
            process.env.NEXT_PUBLIC_APPWRITE_DATABASE!,
            process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_BOOKING!,
            id
        )

        revalidatePath("/bookings", 'layout')

        return {
            success: "Booking canceled successfully!",
            isLoading: false
        };

    } catch (error) {
        console.log("Failed to cancel booking: ", error);
        return {
            error: "Failed to cancel booking!",
            isLoading: false
        }
    }
}
