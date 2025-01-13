import Image from "next/image";
import { FC } from "react";
import Link from "next/link";
import { DeleteRoomButton } from "@/components/DeleteRoomButton";
import getBookedRoom from "@/app/actions/getRoomBooking";
import Heading from "@/components/Heading";
import { formateDate } from "@/utils/helpers";
import { FaArrowLeft } from "react-icons/fa";
import ImageGallery from "@/components/ImageGallery";

type tParams = Promise<{ id: string }>;
interface IViewBookingPageProps {
    params: tParams;
}

const ViewBookingPage: FC<IViewBookingPageProps> = async ({ params }) => {
    const param = await params;
    const { id } = param;
    const booking = await getBookedRoom(id);

    if (!booking || 'error' in booking) {
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
                <h1 className="text-3xl font-semibold text-lime-600 mb-4">Booking Not Found</h1>
                <p className="text-gray-600 mb-6">The booking you are looking for doesn&apos;t exist or has been removed.</p>
                <Link href="/bookings">
                    <button className="inline-flex items-center px-6 py-3 bg-lime-600 text-white rounded-lg shadow-md hover:bg-lime-700 transition duration-300">
                        <FaArrowLeft className="mr-2" />
                        Back to Bookings
                    </button>
                </Link>
            </div>
        );
    }

    let imageSRC: string[] = [];

    const bucketId = process.env.NEXT_PUBLIC_APPWRITE_STORAGE_BUCKET_ROOMS;
    const projectID = process.env.NEXT_PUBLIC_APPWRITE_PROJECT;
    const baseURL = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT;


    imageSRC = booking.room_id.image?.map((image: string) => {
        const imageURL = `${baseURL}/storage/buckets/${bucketId}/files/${image}/view?project=${projectID}`;
        return imageURL;
    }) || [];

    return (
        <div className="max-w-screen-lg mx-auto px-4 pb-6">
            <Heading title="Booking Details" />

            <div className="flex items-center justify-between mb-2">
                <Link href="/bookings">
                    <button className="flex items-center text-lime-600 hover:text-lime-800 transition duration-300">
                        <FaArrowLeft className="mr-2" />
                        Back to Bookings
                    </button>
                </Link>
                <DeleteRoomButton id={id} title="Cancel" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="rounded-xl overflow-hidden shadow-lg relative lg:w-[476px] ">
                    {/* <Image
                        src={imageSRC}
                        alt={booking.room_id.name}
                        className="object-cover w-full h-full"
                        width={400}
                        height={300}
                    />
                    <div className="absolute inset-0 bg-black opacity-30"></div>

                    <div className="absolute top-4 left-4 text-white flex flex-col lg:flex-row md:items-left md:gap-4 w-full justify-between lg:pr-8">
                        <h3 className="text-2xl font-semibold line-clamp-1 mb-2">{booking.room_id.name}</h3>
                        <Link href={`/rooms/${booking.room_id.$id}`} passHref>
                            <button
                                className="bg-lime-700 text-white px-4 py-2 rounded-md hover:bg-lime-600 transition-colors duration-300"
                            >
                                View Room
                            </button>
                        </Link>
                    </div> */}
                    <ImageGallery images={imageSRC} id={booking.room_id.$id} name={booking.room_id.name} />
                </div>

                <div className="space-y-2">
                    <div className="bg-white shadow-lg rounded-xl p-4">
                        <h3 className="text-lg font-semibold text-lime-600 mb-2">Room Information</h3>
                        <div className="space-y-1 text-gray-700">
                            <p><strong>Description:</strong> {booking.room_id.description}</p>
                            <p><strong>Amenities:</strong> {booking.room_id.amenities}</p>
                            <p><strong>Location:</strong> {booking.room_id.location}</p>
                            <p><strong>Size:</strong> {booking.room_id.sqft} sqft</p>
                            <p><strong>Capacity:</strong> {booking.room_id.capacity} people</p>
                            <p><strong>Address:</strong> {booking.room_id.address}</p>
                        </div>
                    </div>
                    <div className="bg-white shadow-lg rounded-xl p-4">
                        <h3 className="text-lg font-semibold text-lime-600 mb-2">Booking Dates</h3>
                        <div className="space-y-1 text-gray-700">
                            <p><strong>Check-in:</strong> {formateDate(booking.check_in)}</p>
                            <p><strong>Check-out:</strong> {formateDate(booking.check_out)}</p>
                            <p><strong>Price per hour:</strong> ${booking.room_id.price_per_hour}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewBookingPage;
