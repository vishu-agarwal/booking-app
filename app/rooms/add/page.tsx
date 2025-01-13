'use client';

import Heading from "@/components/Heading";
import { useState } from "react";
import { toast } from "react-toastify";
import { FaPlusCircle } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { BsCloudUpload } from "react-icons/bs";
import { createRoom } from "@/app/actions/createRooms";
import Image from "next/image";
import RoomBookingLoader from "@/components/RoomBookingLoader";

const AddRoom = () => {
    const router = useRouter();

    const [roomImage, setRoomImage] = useState<File[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [isRedirecting, setIsRedirecting] = useState<boolean>(false);
    const [isDragActive, setIsDragActive] = useState(false);

    const handleFileDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragActive(false);

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            const files = Array.from(e.dataTransfer.files).slice(0, 5 - roomImage.length);
            setRoomImage((prevImages) => [...prevImages, ...files]);
        }
    };

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const files = Array.from(e.target.files).slice(0, 5 - roomImage.length);
            setRoomImage((prevImages) => [...prevImages, ...files]);
        }
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragActive(true);
    };

    const handleDragLeave = () => {
        setIsDragActive(false);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData(e.target as HTMLFormElement);

        roomImage.forEach((file) => {
            formData.append("roomImage", file);
        });

        try {
            const result = await createRoom(formData);
            if (result.error) {
                toast.error(result.error);
            } else if (result.success) {
                toast.success(result.success);
                setIsRedirecting(true);
                router.push("/rooms");
            }
        } catch (error) {
            console.log("Error while creating room", error);
            toast.error("Error while creating room!");
        } finally {
            setLoading(false);
        }
    };

    if (loading || isRedirecting) {
        return <RoomBookingLoader />;
    }

    return (
        <div className="bg-white p-6 rounded-xl shadow-xl mx-auto max-w-4xl">
            <Heading title="Add a New Room" />
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Room Name */}
                <div className="col-span-4">
                    <div className="flex flex-col space-y-2">
                        <label htmlFor="name" className="text-gray-700 font-medium">Room Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            placeholder="Enter the room name"
                            className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500"
                            required
                        />
                    </div>
                </div>

                <div className="col-span-4 md:col-span-4 lg:col-span-4 grid sm:grid-cols-2 gap-2">
                    <div className="flex flex-col space-y-2">
                        <label htmlFor="description" className="text-gray-700 font-medium">Description</label>
                        <textarea
                            id="description"
                            name="description"
                            placeholder="Provide a brief description"
                            className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500"
                            required
                        />
                    </div>
                    <div className="flex flex-col space-y-2">
                        <label htmlFor="amenities" className="text-gray-700 font-medium">Amenities</label>
                        <textarea
                            id="amenities"
                            name="amenities"
                            placeholder="Enter amenities"
                            className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500"
                            required
                        />
                    </div>
                </div>

                <div className="col-span-4 md:col-span-4 lg:col-span-4 grid sm:grid-cols-4 gap-2">
                    <div className="flex flex-col space-y-2">
                        <label htmlFor="sqft" className="text-gray-700 font-medium">Square Feet</label>
                        <input
                            type="number"
                            id="sqft"
                            name="sqft"
                            placeholder="Enter square footage"
                            className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500"
                            required
                        />
                    </div>
                    <div className="flex flex-col space-y-2">
                        <label htmlFor="capacity" className="text-gray-700 font-medium">Capacity</label>
                        <input
                            type="number"
                            id="capacity"
                            name="capacity"
                            placeholder="Enter capacity"
                            className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500"
                            required
                        />
                    </div>
                    <div className="flex flex-col space-y-2">
                        <label htmlFor="availability" className="text-gray-700 font-medium">Availability</label>
                        <input
                            type="text"
                            id="availability"
                            name="availability"
                            placeholder="Enter availability"
                            className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500"
                            required
                        />
                    </div>
                    <div className="flex flex-col space-y-2">
                        <label htmlFor="price_per_hour" className="text-gray-700 font-medium">Price Per Hour</label>
                        <input
                            type="number"
                            id="price_per_hour"
                            name="price_per_hour"
                            placeholder="Enter price per hour"
                            className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500"
                            required
                        />
                    </div>
                </div>

                <div className="col-span-4 md:col-span-4 lg:col-span-4 grid sm:grid-cols-2 gap-2">
                    <div className="flex flex-col space-y-2">
                        <label htmlFor="location" className="text-gray-700 font-medium">Location</label>
                        <input
                            type="text"
                            id="location"
                            name="location"
                            placeholder="Enter the location"
                            className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500"
                            required
                        />
                    </div>
                    <div className="flex flex-col space-y-2">
                        <label htmlFor="address" className="text-gray-700 font-medium">Address</label>
                        <input
                            type="text"
                            id="address"
                            name="address"
                            placeholder="Enter the address"
                            className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500"
                            required
                        />
                    </div>
                </div>

                {/* Image Upload Section */}
                <div className="col-span-4 md:col-span-4 lg:col-span-4">
                    <label className="block text-gray-700 font-medium mb-2">Room Image</label>
                    <div className="flex flex-col md:flex-row space-x-2">
                        <div
                            className={`border-2 border-dashed p-8 rounded-lg text-center ${isDragActive ? "border-lime-500 bg-lime-50" : "border-gray-300"}`}
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onDrop={handleFileDrop}
                            style={{ flex: 1 }}
                        >
                            <input
                                type="file"
                                multiple
                                className="hidden"
                                id="fileInput"
                                accept="image/*"
                                onChange={handleFileSelect}
                            />
                            <label htmlFor="fileInput" className="cursor-pointer">
                                <BsCloudUpload size={50} className="mx-auto text-gray-500" />
                                {roomImage.length > 0 ? (
                                    <p className="text-gray-700 mt-2">Selected images:</p>
                                ) : (
                                    <p className="text-gray-500 mt-2">Drag and drop images here, or click to select files</p>
                                )}
                            </label>
                        </div>

                        {roomImage.length > 0 && (
                            <div className="flex flex-col items-center mt-4 md:mt-0" style={{ flex: 1 }}>
                                <div className="grid grid-cols-3 gap-4 px-2 overflow-y-auto" style={{ maxHeight: '200px', minHeight: '100px' }}>
                                    {roomImage.map((file, index) => (
                                        <div key={index} className="flex flex-col items-center">
                                            <Image
                                                src={URL.createObjectURL(file)}
                                                alt={file.name}
                                                className="object-cover rounded-md"
                                                width={96}
                                                height={96}
                                            />
                                            <p className="text-sm text-gray-500 mt-2">{file.name}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Submit Button */}
                <div className="col-span-4 md:col-span-4 lg:col-span-4 flex justify-center">
                    <button
                        type="submit"
                        className="w-full bg-lime-600 text-white py-3 rounded-lg hover:bg-lime-700 focus:outline-none focus:ring-2 focus:ring-lime-500 flex items-center justify-center text-lg font-semibold"
                    >
                        <FaPlusCircle className="mr-2" />
                        Add Room
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddRoom;
