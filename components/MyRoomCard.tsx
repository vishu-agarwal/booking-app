import { FC } from "react";

import Image from "next/image";
import Link from "next/link";

import { DeleteRoomButton } from "./DeleteRoomButton";

import { RoomsType } from "@/utils/types";

interface IMyRoomCardProps {
    room: RoomsType;
}

export const MyRoomCard: FC<IMyRoomCardProps> = ({ room }) => {
    const bucketId = process.env.NEXT_PUBLIC_APPWRITE_STORAGE_BUCKET_ROOMS;
    const projectID = process.env.NEXT_PUBLIC_APPWRITE_PROJECT;
    const baseURL = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT;
    const imageURL = `${baseURL}/storage/buckets/${bucketId}/files/${room.image[0]}/view?project=${projectID}`;
    const imageSRC = room.image ? imageURL ? imageURL : '/rooms/' + room.image[0] : '/rooms/no-image.jpg';

    return (
        <div
            key={room.$id}
            className="bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200"
        >
            <Image
                src={imageSRC}
                alt={room.name}
                className="h-40 w-full object-cover"
                width={300}
                height={100}
            />
            <div className="p-4">
                <h2 className="text-2xl font-semibold text-gray-800 line-clamp-1">{room.name}</h2>
                <p className="text-gray-600 mt-2 line-clamp-1">{room.description}</p>
                <p className="text-sm text-gray-500 mt-2 line-clamp-1">
                    <span className="font-medium">Location:</span> {room.location}
                </p>
                <p className="text-sm text-gray-500 line-clamp-1">
                    <span className="font-medium">Capacity:</span> {room.capacity}
                </p>
                <p className="text-lg text-lime-600 font-bold mt-2 line-clamp-1">
                    ${room.price_per_hour} / hour
                </p>
            </div>
            <div className="flex justify-between items-center bg-gray-100 px-4 py-2">
                <Link href={`/rooms/${room.$id}`} passHref>
                    <button
                        className="bg-lime-500 text-white px-4 py-2 rounded-md hover:bg-lime-600"
                    >
                        View
                    </button>
                </Link>
                <DeleteRoomButton id={room.$id} title="Delete" />
            </div>
        </div>
    );
}
