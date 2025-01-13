"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

import { Query } from "node-appwrite";

import { createSessionClient } from "@/config/appwrite";

export async function deleteRoom(id: string) {
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
        const { documents: rooms } = await databases.listDocuments(
            process.env.NEXT_PUBLIC_APPWRITE_DATABASE!,
            process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ROOMS!,
            [Query.equal("user_id", userId)]
        )

        //find room to delete
        const roomToDelete = rooms.find(room => room.$id === id)
        //delete room
        if (roomToDelete) {
            await databases.deleteDocument(
                process.env.NEXT_PUBLIC_APPWRITE_DATABASE!,
                process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ROOMS!,
                roomToDelete.$id
            )

            revalidatePath("/rooms/my", 'layout')

            return {
                success: "Room deleted successfully!",
            isLoading: false
            };
        }
        else {
            return {
                error: "Room not found!",
            isLoading: false
            }
        }

    } catch (error) {
        console.log("Failed to delete rooms: ", error);
        return {
            error: "Failed to delete rooms!",
            isLoading: false
        }
    }
}
