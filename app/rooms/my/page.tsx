import getMyRooms from '@/app/actions/getMyRooms';
import Heading from '@/components/Heading';
import { MyRoomCard } from '@/components/MyRoomCard';
import RoomBookingLoader from '@/components/RoomBookingLoader';
import { RoomsType } from '@/utils/types';
import Image from 'next/image';
import Link from 'next/link';
import React, { Suspense } from 'react';
import { FaPlus } from 'react-icons/fa';

const MyRooms = async () => {

    const rooms = await getMyRooms();

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
                <h1 className="text-xl font-semibold text-cyan-600 mb-4">First Add Rooms!</h1>
                <Link href={"/rooms/add"} passHref >
                    <button
                        className="inline-flex items-center px-6 py-3 bg-cyan-600 text-white rounded-md shadow-md hover:bg-cyan-700 transition duration-300"
                    >
                        <FaPlus className="mr-2" />
                        Add Rooms
                    </button>
                </Link>
            </div>
        );
    }

    return (
        <div className="container mx-auto py-4">
            <Heading title="My Rooms" />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {typedRooms && typedRooms.map((room: RoomsType) => (
                    <Suspense fallback={<RoomBookingLoader />} key={room.$id}>
                        <MyRoomCard room={room} />
                    </Suspense>
                ))}
            </div>
        </div>
    );
};

export default MyRooms;
