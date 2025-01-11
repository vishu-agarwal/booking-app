import { createAdminClient } from "@/config/appwrite";

async function getAllRooms() {
    try {
        const { databases } = await createAdminClient();

        //fetch rooms
        const { documents: rooms } = await databases.listDocuments(
            process.env.NEXT_PUBLIC_APPWRITE_DATABASE!,
            process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ROOMS!,
        )
        //revalidate cache
        // revalidatePath("/", 'layout');
        return rooms;
    } catch (error) {
        console.log("Failed to get rooms: ", error);
        return {
            error: "Failed to get all rooms",
            isLoading: false
        }
        // redirect('/error');
    }
}

export default getAllRooms;