"use server";

import { cookies } from "next/headers";

import { createSessionClient } from "@/config/appwrite";

import { SessionResponse } from "@/utils/types";

export async function destroySession(): Promise<SessionResponse> {

    // Retrieve the cookies instance
    const cookiesInstance = await cookies();

    // Retrieve the session cookie
    const sessionCookie = cookiesInstance.get('appwrite-session-cookie');
    if (!sessionCookie) {
        return {
            error: "No session cookie found!",
            isLoading: false
        };
    }

    try {
        // Initialize the session client with the session cookie's value
        const { account } = await createSessionClient(sessionCookie.value);

        // Delete the current session
        await account.deleteSessions();

        // Clear the session cookie from the browser
        cookiesInstance.delete('appwrite-session-cookie');

        // Return success message
        return {
            success: "Logged out successfully!",
            isLoading: false
        };
    } catch (error) {
        console.log("Destroy session error", error);

        // Return error message in case of failure
        return {
            error: "Unable to logout!",
            isLoading: false
        };
    }
}
