import { Query } from "node-appwrite";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { createSessionClient } from "@/config/appwrite";

async function getMyBookings() {
    // Retrieve the cookies instance
    const cookiesInstance = await cookies();

    // Retrieve the session cookie
    const sessionCookie = cookiesInstance.get('appwrite-session-cookie');
    if (!sessionCookie) {
        redirect("/login");
        return {
            error: "No session cookie found!",
            isLoading: false
        };
    }

    try {
        const { databases, account } = await createSessionClient(sessionCookie.value);
        const user = await account.get();

        const userId = user.$id;

        //fetch rooms
        const { documents: rooms } = await databases.listDocuments(
            process.env.NEXT_PUBLIC_APPWRITE_DATABASE!,
            process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_BOOKING!,
            [Query.equal("user_id", userId)]
        )

        return rooms;
    } catch (error) {
        console.log("Failed to get my bookings: ", error);
        return {
            error: "Failed to get my bookings!",
            isLoading: false
        }
    }
}

export default getMyBookings;