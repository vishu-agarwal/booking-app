'use client';

import React, {  useState } from "react";
import { FaUserPlus } from "react-icons/fa";
import { toast } from "react-toastify";

import Link from "next/link";
import { useRouter } from "next/navigation";

import Heading from "@/components/Heading";
import RoomBookingLoader from "@/components/RoomBookingLoader";

import { createUser } from "../actions/createUser";

const Register = () => {

    const router = useRouter();

    const [loading, setLoading] = useState<boolean>(false);
    const [isRedirecting, setIsRedirecting] = useState<boolean>(false);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setLoading(true);

        const formData = new FormData(event.target as HTMLFormElement);

        try {
            const result = await createUser(formData);
            if (result.error) {
                toast.error(result.error);
            } else if (result.success) {
                toast.success(result.success);
                setIsRedirecting(true);
                router.push("/login");
            }
        } catch (error) {
            console.log("Error while creating user", error);
            toast.error("Error while creating user!");
        } finally {
            setLoading(false);
        }
    };

    if (loading || isRedirecting) {
        return <RoomBookingLoader />;
    }

    return (
        <div className="bg-white p-10 rounded-lg shadow-lg w-full max-w-lg mx-auto">
            <Heading title="Create an Account" />
            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Full Name and Email */}
                <div className="flex flex-wrap gap-4 w-full">
                    <div className="w-full xs:w-[48%]">
                        <label htmlFor="name" className="block text-gray-600 font-medium">
                            Full Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-lime-500"
                            required
                        />
                    </div>
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
                            autoComplete="false"
                        />
                    </div>
                </div>
                <div className="flex flex-wrap gap-4 w-full">
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
                            autoComplete="false"
                        />
                    </div>
                    <div className="w-full xs:w-[48%]">
                        <label htmlFor="confirmPassword" className="block text-gray-600 font-medium">
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-lime-500"
                            required
                        />
                    </div>
                </div>
                <button
                    type="submit"
                    className="bg-lime-600 text-white py-2 px-6 rounded-lg hover:bg-lime-700 focus:outline-none focus:ring-2 focus:ring-lime-500 flex items-center justify-center w-full"
                >
                    <FaUserPlus className="mr-2" />
                    Register
                </button>
            </form>
            <p className="mt-4 text-center text-gray-600">
                Already have an account?{" "}
                <Link href="/login" className="text-lime-600 hover:underline">
                    Login
                </Link>
            </p>
        </div>
    );
};

export default Register;
