import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { createAdminClient } from "@/config/appwrite";

async function getBookedRoom(id: string) {
   const cookiesInstance = await cookies();

    // Retrieve the session cookie
    const sessionCookie = cookiesInstance.get('appwrite-session-cookie');
    if (!sessionCookie) {
        redirect("/login");
    }
    try {
        const { databases } = await createAdminClient();

        //fetch rooms
        const room = await databases.getDocument(
            process.env.NEXT_PUBLIC_APPWRITE_DATABASE!,
            process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_BOOKING!,
            id
        )

        return room;
    } catch (error) {
        console.log("Failed to get booking room: ", error);
        return {
            error: 'Error while getting booked room details',
            isLoading: false
        }
    }
}

export default getBookedRoom;