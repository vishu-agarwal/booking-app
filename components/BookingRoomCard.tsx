import { BookingRoom } from "@/utils/types";
import Image from "next/image";
import { FC } from "react";
import { DeleteRoomButton } from "./DeleteRoomButton";
import Link from "next/link";
import { formateDate } from "@/utils/helpers";

interface IBookingRoomCardProps {
    booking: BookingRoom;
}

export const BookingRoomCard: FC<IBookingRoomCardProps> = ({ booking }) => {
    const bucketId = process.env.NEXT_PUBLIC_APPWRITE_STORAGE_BUCKET_ROOMS;
    const projectID = process.env.NEXT_PUBLIC_APPWRITE_PROJECT;
    const baseURL = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT;
    const imageURL = `${baseURL}/storage/buckets/${bucketId}/files/${booking.room_id.image[0]}/view?project=${projectID}`;
    const imageSRC = booking.room_id.image
        ? imageURL
            ? imageURL
            : "/rooms/" + booking.room_id.image[0]
        : "/rooms/no-image.jpg";

    return (
        <div
            key={booking.$id}
            className="bg-white shadow-md rounded-lg flex flex-col md:flex-row items-center p-4 md:p-6 gap-4 md:gap-6"
        >
            <div className="w-full md:w-32 h-48 md:h-32 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                <Image
                    src={imageSRC}
                    alt={booking.room_id.name}
                    className="object-cover w-full h-full"
                    width={300}
                    height={200}
                />
            </div>
            <div className="flex-1 text-center md:text-left">
                <h2 className="text-lg md:text-xl font-semibold text-gray-800">
                    {booking.room_id.name}
                </h2>
                <p className="text-sm text-gray-600">
                    Check-in: {formateDate(booking.check_in)}
                </p>
                <p className="text-sm text-gray-600">
                    Check-out: {formateDate(booking.check_out)}
                </p>
            </div>

            <div className="flex justify-center md:justify-end gap-2 md:gap-4">
                <Link href={`/bookings/${booking.$id}`} passHref>
                    <button
                        className="bg-lime-500 text-white px-4 py-2 rounded-md hover:bg-lime-600"
                    >
                        View
                    </button>
                </Link>
                <DeleteRoomButton id={booking.$id} title="Cancel" />
            </div>
        </div >
    );
};
