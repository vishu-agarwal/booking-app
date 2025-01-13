import React, { Suspense } from "react";
import RoomCards from "@/components/RoomCards";
import Heading from "@/components/Heading";
import { RoomsType } from "@/utils/types";
import getAllRooms from "../actions/getAllRooms";
import RoomBookingLoader from "@/components/RoomBookingLoader";
import Image from "next/image";
import Link from "next/link";
import { FaPlus } from "react-icons/fa";

export default async function Rooms() {

    const rooms = await getAllRooms() || [];
    // Type assertion to BookingRoom[] if we're sure about the type
    const typedRooms = rooms as unknown as RoomsType[];

    if (typedRooms.length === 0 || 'error' in rooms) {
        return (
            <div className="p-10 rounded-xl max-w-lg mx-auto mt-2 text-center shadow-lg">
                <div className="mb-6">
                    <Image
                        src="/not-found.webp"
                        alt="Room Not Found"
                        className="mx-auto w-40"
                        width={100}
                        height={100}
                    />
                </div>
                <h1 className="text-3xl font-semibold text-lime-600 mb-4">Rooms Not Available!</h1>
                <Link href={"/rooms/add"} passHref >
                    <button
                        className="inline-flex items-center px-6 py-3 bg-lime-600 text-white rounded-md shadow-md hover:bg-lime-700 transition duration-300"
                    >
                        <FaPlus className="mr-2" />
                        Add Rooms
                    </button>
                </Link>
            </div>
        );
    }

    return (
        <>
            {rooms.length > 0 && (
                <div className="container mx-auto px-4 py-2">
                    <Heading title="Available Rooms" />
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
                        {typedRooms.map((item: RoomsType) => (
                            <Suspense fallback={<RoomBookingLoader />} key={item.$id}>
                                <RoomCards room={item} />
                            </Suspense>
                        ))}
                    </div>
                </div>
            )}
        </>
    );
}
