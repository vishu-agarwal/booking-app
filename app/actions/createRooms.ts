"use server";

import { ID } from "node-appwrite";

import { checkAuth } from "./checkAuth";

import { createAdminClient } from "@/config/appwrite";

import { SessionResponse } from "@/utils/types";

export async function createRoom(data: FormData): Promise<SessionResponse> {
    if (!(data instanceof FormData)) {
        return {
            error: "Invalid data type: expected FormData",
            isLoading: false
        };
    }

    const requiredFields = [
        "name",
        "description",
        "sqft",
        "capacity",
        "location",
        "address",
        "amenities",
        "availability",
        "price_per_hour"
    ];
    for (const field of requiredFields) {
        if (!data.get(field)) {
            return {
                error: `${field} is required!`,
                isLoading: false
            };
        }
    }

    const images = data.getAll("roomImage");
    const validImages = images.filter((img) => img instanceof File);

    if (validImages.length === 0) {
        return {
            error: "No valid images provided!",
            isLoading: false

        };
    }

    try {
        const { databases, storage } = await createAdminClient();
        const { user } = await checkAuth();

        if (!user) {
            return {
                error: "Need to login to create a room!",
                isLoading: false

            };
        }

        const imageIDs: string[] = [];
        for (const image of validImages) {
            const response = await storage.createFile("room-book", ID.unique(), image as File);
            imageIDs.push(response.$id);
        }

        await databases.createDocument(
            process.env.NEXT_PUBLIC_APPWRITE_DATABASE!,
            process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ROOMS!,
            ID.unique(),
            {
                user_id: user.id,
                ...Object.fromEntries(requiredFields.map((key) => [key, data.get(key)])),
                image: imageIDs,
            }
        );

        return {
            success: "Created room successfully!",
            isLoading: false

        };
    } catch (error) {
        console.error("Error during room creation:", error);
        return {
            error: "Failed to create room!",
            isLoading: false

        };
    }
}
