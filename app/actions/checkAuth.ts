"use server";

import { cookies } from "next/headers";

import { createSessionClient } from "@/config/appwrite";

import { SessionResponse } from "@/utils/types";

export async function checkAuth(): Promise<SessionResponse> {

    // Retrieve the cookies instance
    const cookiesInstance = await cookies();

    // Retrieve the session cookie
    const sessionCookie = cookiesInstance.get('appwrite-session-cookie');
    if (!sessionCookie) {
        return {
            isAuthenticated: false,
            isLoading: false
        };
    }

    try {
        // Initialize the session client with the session cookie's value
        const { account } = await createSessionClient(sessionCookie.value);
        const user = await account.get();

        // Return success message
        return {
            isAuthenticated: true,
            isLoading: false,
            user: {
                id: user.$id,
                name: user.name,
                email: user.email
            }
        };
    } catch (error) {
        console.log("check auth error", error);
        return {
            isAuthenticated: false,
            isLoading: false
        };
    }
}
