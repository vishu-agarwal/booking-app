"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

import { ID } from "node-appwrite";

import { createSessionClient } from "@/config/appwrite";

import { checkAuth } from "./checkAuth";
import checkRoomAvailability from "./checkRoomAvailability";

import { SessionResponse } from "@/utils/types";

export async function bookRoom(data: FormData): Promise<SessionResponse> {

    const cookiesInstance = await cookies();

    // Retrieve the session cookie
    const sessionCookie = cookiesInstance.get('appwrite-session-cookie');
    if (!sessionCookie) {
        redirect("/login");
    }

    if (!(data instanceof FormData)) {
        return {
            error: "Invalid data type: expected FormData",
            isLoading: false
        };
    }

    const requiredFields = [
        "check_in_date",
        "check_out_date",
        "check_in_time",
        "check_out_time",
        "room_id"
    ];
    for (const field of requiredFields) {
        if (!data.get(field)) {
            return {
                error: `${field} is required!`,
                isLoading: false
            };
        }
    }

    try {
        const { databases } = await createSessionClient(sessionCookie.value);
        const { user } = await checkAuth();

        if (!user) {
            return {
                error: "Need to login to create a room!",
                isLoading: false
            };
        }

        // Extract from the form data
        const check_in_date = data.get("check_in_date") as string;
        const check_out_date = data.get("check_out_date") as string;
        const check_in_time = data.get("check_in_time") as string;
        const check_out_time = data.get("check_out_time") as string;
        const room_id = data.get("room_id") as string;

        //combine date time
        const checkInDateTime = `${check_in_date}T${check_in_time}`
        const checkOutDateTime = `${check_out_date}T${check_out_time}`

        //check room available
        const isAvailableRoom = checkRoomAvailability(room_id, checkInDateTime, checkOutDateTime)
        if (!isAvailableRoom) {
            return {
                error: 'This room is already booked for this time',
                isLoading: false
            }
        }

        const bookingDate = {
            check_in: checkInDateTime,
            check_out: checkOutDateTime,
            user_id: user.id,
            room_id
        }

        await databases.createDocument(
            process.env.NEXT_PUBLIC_APPWRITE_DATABASE!,
            process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_BOOKING!,
            ID.unique(),
            bookingDate
        );
        revalidatePath("/bookings", 'layout')

        return {
            success: "Room booked successfully!",
            isLoading: false
        };
    } catch (error) {
        console.error("Error during booking room:", error);
        return {
            error: "Failed to book room!",
            isLoading: false
        };
    }
}
