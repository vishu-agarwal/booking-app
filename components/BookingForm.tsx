'use client'

import { FC, useState } from "react";
import Heading from "./Heading";
import { useRouter } from "next/navigation";
import { bookRoom } from "@/app/actions/bookRoom";
import { toast } from "react-toastify";
import RoomBookingLoader from "./RoomBookingLoader";

interface IBookingFormProps {
    roomId: string;
}

const BookingForm: FC<IBookingFormProps> = ({ roomId }) => {

    const router = useRouter();

    const [loading, setLoading] = useState<boolean>(false);
    const [isRedirecting, setIsRedirecting] = useState<boolean>(false);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setLoading(true);

        const formData = new FormData(event.target as HTMLFormElement);

        try {
            const result = await bookRoom(formData);
            if (result.error) {
                toast.error(result.error);
            } else if (result.success) {
                toast.success(result.success);
                setIsRedirecting(true);
                router.push("/bookings");
            }
        } catch (error) {
            console.log("Error while booking room", error);
            toast.error("Error while booking room!");
        } finally {
            setLoading(false);
        }
    };

    if (loading || isRedirecting) {
        return <RoomBookingLoader />;
    }

    return (
        <div className="mt-4 mx-auto px-6 py-4 bg-white rounded-lg shadow-xl">
            <Heading title="Book Your Room" />
            <form onSubmit={handleSubmit} className="space-y-6">
                <input
                    type="hidden"
                    id="room_id"
                    name="room_id"
                    value={roomId}
                    required
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="flex flex-col">
                        <label htmlFor="check_in_date" className="text-gray-700 font-semibold mb-2">
                            Check-in Date
                        </label>
                        <input
                            type="date"
                            id="check_in_date"
                            name="check_in_date"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-600 transition duration-300"
                            required
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="check_in_time" className="text-gray-700 font-semibold mb-2">
                            Check-in Time
                        </label>
                        <input
                            type="time"
                            id="check_in_time"
                            name="check_in_time"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-600 transition duration-300"
                            required
                        />
                    </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="flex flex-col">
                        <label htmlFor="check_out_date" className="text-gray-700 font-semibold mb-2">
                            Check-out Date
                        </label>
                        <input
                            type="date"
                            id="check_out_date"
                            name="check_out_date"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-600 transition duration-300"
                            required
                        />
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="check_out_time" className="text-gray-700 font-semibold mb-2">
                            Check-out Time
                        </label>
                        <input
                            type="time"
                            id="check_out_time"
                            name="check_out_time"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-600 transition duration-300"
                            required
                        />
                    </div>
                </div>
                <div className="mt-8">
                    <button
                        type="submit"
                        className="w-full py-3 px-4 bg-cyan-600 text-white font-semibold rounded-md hover:bg-cyan-700 focus:outline-none focus:ring-4 focus:ring-cyan-300 transition duration-300"
                    >
                        Confirm Booking
                    </button>
                </div>
            </form>
        </div>
    );
};

export default BookingForm;
