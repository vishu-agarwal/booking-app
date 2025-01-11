import { createAdminClient } from "@/config/appwrite";

async function getSingleRooms(id: string) {

    try {
        const { databases } = await createAdminClient();

        //fetch rooms
        const room = await databases.getDocument(
            process.env.NEXT_PUBLIC_APPWRITE_DATABASE!,
            process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ROOMS!,
            id
        )

        return room;
    } catch (error) {
        console.log("Failed to get room: ", error);
        return {
            error: 'Error while getting room details',
            isLoading: false
        }
    }
}

export default getSingleRooms;