"use server";

import { ID } from "node-appwrite";

import { createAdminClient } from "@/config/appwrite";

import {  SessionResponse } from "@/utils/types";

export async function createUser(data: FormData): Promise<SessionResponse> {
  // Ensure data is of type FormData
  if (!(data instanceof FormData)) {
    return {
      error: "Invalid data type: expected FormData",
      isLoading: false
    };
  }

  // Extract from the form data
  const email = data.get("email") as string | null;
  const password = data.get("password") as string | null;
  const name = data.get("name") as string | null;
  const confirmPassword = data.get("confirmPassword") as string | null;

  if (!email || !password || !confirmPassword || !name) {
    return {
      error: "All fields are required!",
      isLoading: false
    };
  }
  if (password.length < 8) {
    return {
      error: "Password must be 8 characters!",
      isLoading: false
    }
  };
  if (confirmPassword !== password) {
    return {
      error: "Confirm Password not match with password!",
      isLoading: false
    }
  };
  try {
    const { account } = await createAdminClient();

    await account.create(ID.unique(), email, password);

    return {
      success: "Create user successfully!",
      isLoading: false
    };
  } catch (error) {
    console.error("Error occurred during user creation:", error);
    return {
      error: "Failed to create user!",
      isLoading: false
    };
  }
}
