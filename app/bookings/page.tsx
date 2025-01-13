import { BookingRoom } from "@/utils/types";
import getMyBookings from "../actions/getMyBookings";
import Heading from "@/components/Heading";
import { BookingRoomCard } from "@/components/BookingRoomCard";
import React, { Suspense } from "react";
import RoomBookingLoader from "@/components/RoomBookingLoader";
import Image from "next/image";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";

const BookingRoomPage = async () => {
    const bookings = await getMyBookings();

    // Type assertion to BookingRoom[] if we're sure about the type
    const typedBookings = bookings as unknown as BookingRoom[];

    if (typedBookings.length === 0 || 'error' in bookings) {
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
                <h1 className="text-3xl font-semibold text-lime-600 mb-4">No bookings found!</h1>
                <Link href="/rooms" passHref>
                    <button
                        className="inline-flex items-center px-6 py-3 bg-lime-600 text-white rounded-md shadow-md hover:bg-lime-700 transition duration-300"
                    >
                        <FaArrowLeft className="mr-2" />
                        Back to Rooms
                    </button>
                </Link>
            </div>
        );
    }

    return (
        <div className="container mx-auto py-0 px-4">
            <Heading title="Your Booked Rooms" />
            <div className="space-y-4 mt-4">
                {typedBookings.length && (
                    typedBookings.map((booking: BookingRoom) => (
                        <Suspense fallback={<RoomBookingLoader />} key={booking.$id}>
                            <BookingRoomCard booking={booking} />
                        </Suspense>
                    ))
                )}
            </div>
        </div>
    );
};

export default BookingRoomPage;
