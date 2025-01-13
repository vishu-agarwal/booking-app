import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { Query } from "node-appwrite";

import { createSessionClient } from "@/config/appwrite";

async function getMyRooms() {
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
            process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ROOMS!,
            [Query.equal("user_id", userId)]
        )

        //revalidate
        // revalidatePath("/", 'layout');
        return rooms;
    } catch (error) {
        console.log("Failed to get my rooms: ", error);
        return {
            error: "Failed to get my rooms!",
            isLoading: false
        }
    }
}

export default getMyRooms;