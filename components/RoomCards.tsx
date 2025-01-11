import { FC } from "react";
import Image from "next/image";
import Link from "next/link";

import { RoomsType } from "@/utils/types";

interface IRoomCardsProps {
    room: RoomsType;
}

const RoomCards: FC<IRoomCardsProps> = ({ room }) => {

    const bucketId = process.env.NEXT_PUBLIC_APPWRITE_STORAGE_BUCKET_ROOMS;
    const projectID = process.env.NEXT_PUBLIC_APPWRITE_PROJECT;
    const baseURL = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT;
    const imageURL = `${baseURL}/storage/buckets/${bucketId}/files/${room.image[0]}/view?project=${projectID}`;
    const imageSRC = room.image ? imageURL ? imageURL : '/rooms/' + room.image[0] : '/rooms/no-image.jpg';

    return (
        <div
            key={room.$id}
            className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105"
        >
            <Image
                src={imageSRC}
                alt={room.name}
                width={300}
                height={100}
                className="h-40 w-full object-cover"
            />
            <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800 line-clamp-1">{room.name}</h3>
                <p className="text-sm text-gray-600 mt-2 line-clamp-1">
                    {room.description}
                </p>
                <div className="mt-2 space-y-1">
                    <div className="text-sm text-gray-600 line-clamp-1">
                        <strong>Location:</strong> {room.location}
                    </div>
                    <div className="text-sm text-gray-600 line-clamp-1">
                        <strong>Capacity:</strong> {room.capacity} people
                    </div>
                    <div className="text-sm text-gray-600 line-clamp-1">
                        <strong>Price:</strong> ${room.price_per_hour}/hr
                    </div>
                    <div className="text-sm text-gray-600 line-clamp-1">
                        <strong>Availability:</strong> {room.availability}
                    </div>
                </div>
                <div className="mt-4">
                    <Link href={`/rooms/${room.$id}`} passHref>
                        <button className="w-full py-2 px-4 bg-cyan-600 text-white rounded-md hover:bg-cyan-700 transition duration-300">
                            View Details
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default RoomCards;
