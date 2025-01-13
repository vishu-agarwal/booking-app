"use client";

import React, { useState } from "react";
import { FaSignInAlt } from "react-icons/fa";
import { toast } from "react-toastify";

import Link from "next/link";
import { useRouter } from "next/navigation";

import Heading from "@/components/Heading";
import RoomBookingLoader from "@/components/RoomBookingLoader";

import { useAuth } from "@/context/authContext";

import { createSession } from "../actions/createSession";

const Login = () => {
  const router = useRouter();
  const { setIsAuthenticated } = useAuth();

  const [loading, setLoading] = useState<boolean>(false);
  const [isRedirecting, setIsRedirecting] = useState<boolean>(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);

    const formData = new FormData(event.target as HTMLFormElement);

    try {
      const result = await createSession(formData);
      if (result.error) {
        toast.error(result.error);
      } else if (result.success) {
        toast.success(result.success);
        setIsAuthenticated(true);
        setIsRedirecting(true);
        router.push("/rooms");
      }
    } catch (error) {
      console.log("Error while creating session", error);
      toast.error("Error while creating session!");
    } finally {
      setLoading(false);
    }
  };

  if (loading || isRedirecting) {
    return <RoomBookingLoader />;
  }

  return (
    <div className="bg-white p-10 rounded-lg shadow-lg w-full max-w-lg mx-auto">
      <Heading title="Login to Your Account" />
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex flex-wrap gap-4 w-full">
          <div className="w-full xs:w-[48%]">
            <label htmlFor="email" className="block text-gray-600 font-medium">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-lime-500"
              required
            />
          </div>
          <div className="w-full xs:w-[48%]">
            <label htmlFor="password" className="block text-gray-600 font-medium">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-lime-500"
              required
            />
          </div>
        </div>
        <div className="flex justify-between items-center">
          <button
            type="submit"
            className="bg-lime-600 text-white py-2 px-6 rounded-lg hover:bg-lime-700 focus:outline-none focus:ring-2 focus:ring-lime-500 flex items-center justify-center w-full"
          >
            <FaSignInAlt className="mr-2" />
            Login
          </button>
        </div>
      </form>
      <p className="mt-4 text-center text-gray-600">
        Don&apos;t have an account?{" "}
        <Link href="/register" className="text-lime-600 hover:underline">
          Register
        </Link>
      </p>
    </div>
  );
};

export default Login;
