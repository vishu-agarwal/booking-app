import { FC, Suspense } from "react";
import Image from "next/image";
import Heading from "@/components/Heading";
import BookingForm from "@/components/BookingForm";
import getSingleRooms from "@/app/actions/getSingleRoom";
import Link from "next/link";
import RoomBookingLoader from "@/components/RoomBookingLoader";
import { FaArrowLeft } from "react-icons/fa";
import ImageGallery from "@/components/ImageGallery";
import BackButton from "./_component/BackButton";

type tParams = Promise<{ id: string }>;
interface IViewRoomProps {
    params: tParams;
}
const ViewRoom: FC<IViewRoomProps> = async ({ params }) => {
    const param = await params
    const { id } = param;

    const room = await getSingleRooms(id);
    let imageSRC: string[];

    if (!room || 'error' in room) {
        return (
            <div className="bg-white shadow-lg rounded-lg p-8 max-w-lg text-center">
                <div className="mb-6">
                    <Image
                        src="/not-found.webp"
                        alt="Room Not Found"
                        className="mx-auto w-40"
                        width={100}
                        height={100}
                    />
                </div>
                <h1 className="text-2xl font-bold text-gray-800 mb-4">
                    Oops! Room Not Found
                </h1>
                <p className="text-gray-600 mb-6">
                    We couldn’t find the room you’re looking for. It may have been removed or doesn’t exist.
                </p>
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
    } else {
        const bucketId = process.env.NEXT_PUBLIC_APPWRITE_STORAGE_BUCKET_ROOMS;
        const projectID = process.env.NEXT_PUBLIC_APPWRITE_PROJECT;
        const baseURL = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT;


        imageSRC = room.image?.map((image: string) => {
            const imageURL = `${baseURL}/storage/buckets/${bucketId}/files/${image}/view?project=${projectID}`;
            return imageURL;
        }) || [];
    }

    return (
        <div className="max-w-screen-lg mx-auto px-4 pb-6">
            <Heading title={room.name} />
            <BackButton />
            <div className="flex flex-col lg:flex-row gap-6">
                {/* <div className="flex-shrink-0">
                    <Image
                        src={imageSRC}
                        alt={room.name}
                        className="w-full h-80 object-cover rounded-lg"
                        width={500}
                        height={320}
                    />
                </div> */}
                <ImageGallery images={imageSRC} />
                <div className="flex-grow">
                    <p className="text-base text-gray-600 mb-4">{room.description}</p>
                    <div className="space-y-2">
                        <div className="text-sm text-gray-600">
                            <strong>Location:</strong> {room.location}
                        </div>
                        <div className="text-sm text-gray-600">
                            <strong>Address:</strong> {room.address}
                        </div>
                        <div className="text-sm text-gray-600">
                            <strong>Capacity:</strong> {room.capacity} people
                        </div>
                        <div className="text-sm text-gray-600">
                            <strong>Price:</strong> ${room.price_per_hour}/hr
                        </div>
                        <div className="text-sm text-gray-600">
                            <strong>Availability:</strong> {room.availability}
                        </div>
                        <div className="text-sm text-gray-600">
                            <strong>Amenities:</strong> {room.amenities}
                        </div>
                        <div className="text-sm text-gray-600">
                            <strong>Size:</strong> {room.sqft} sqft
                        </div>
                    </div>
                </div>
            </div>
            <Suspense fallback={<RoomBookingLoader />}>
                <BookingForm roomId={room.$id} />
            </Suspense>
        </div>
    );
};

export default ViewRoom;
