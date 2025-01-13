import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { Query } from "node-appwrite";

import { DateTime } from "luxon";

import { createSessionClient } from "@/config/appwrite";

import { toUTCDateTime } from "@/utils/helpers";

function dateOverlap(checkInA: DateTime, checkInB: DateTime, checkOutA: DateTime, checkOutB: DateTime) {
    return checkInA < checkOutB && checkOutA > checkInB;
}

async function checkRoomAvailability(id: string, check_in: string, check_out: string) {
    // Retrieve the cookies instance
    const cookiesInstance = await cookies();

    // Retrieve the session cookie
    const sessionCookie = cookiesInstance.get('appwrite-session-cookie');
    if (!sessionCookie) {
        redirect("/login");
    }

    const checkInDateTime = toUTCDateTime(check_in)
    const checkOutDateTime = toUTCDateTime(check_out)

    try {
        const { databases } = await createSessionClient(sessionCookie.value);

        //fetch rooms;

        const { documents: bookings } = await databases.listDocuments(
            process.env.NEXT_PUBLIC_APPWRITE_DATABASE!,
            process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_BOOKING!,
            [Query.equal("room_id", id)]
        );

        // loop for check booking overlaps

        for (const booking of bookings) {
            const bookingCheckInDateTime = toUTCDateTime(booking.check_in);
            const bookingCheckOutDateTime = toUTCDateTime(booking.check_out);

            if (dateOverlap(checkInDateTime, checkOutDateTime, bookingCheckInDateTime, bookingCheckOutDateTime)) {
                return false //overlap found  do not book room               
            }
        }
        //no overlap found continue to book!
        return true;
    } catch (error) {
        console.log("Failed to check rooms availability: ", error);
        return {
            error: "Failed to check my rooms availability!",
            isLoading: false
        }
    }
}

export default checkRoomAvailability;