"use server";

import { cookies } from "next/headers";

import { createAdminClient } from "@/config/appwrite";

import { SessionResponse } from "@/utils/types";

export async function createSession(data: FormData): Promise<SessionResponse> {
  // Ensure data is of type FormData
  if (!(data instanceof FormData)) {
    return {
      error: "Invalid data type: expected FormData"
    };
  }

  // Extract email and password from the form data
  const email = data.get("email") as string | null;
  const password = data.get("password") as string | null;

  // Validate email and password
  if (!email || !password) {
    return {
      error: "Email and password both required!",
      isLoading: false
    };
  }

  try {
    const { account } = await createAdminClient();

    // Generate session using email and password
    const session = await account.createEmailPasswordSession(email, password);

    // Await cookies and set the session cookie
    const cookiesInstance = await cookies();
    cookiesInstance.set("appwrite-session-cookie", session.secret, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      expires: new Date(session.expire),
      path: "/"
    });

    // // If previousState exists, log the user ID
    // if (previousState?.userId) {
    //   console.log("Previous user ID: ", previousState.userId);
    // }

    // Return success message
    return {
      success: "Logged in successfully!",
      isLoading: false
    };
  } catch (error) {
    // Log the error and throw a new error with a custom message
    console.error("Error occurred during session creation:", error);
    return {
      error: "Invalid credentials!",
      isLoading: false
    };
  }
}
