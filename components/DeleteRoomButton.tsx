'use client'

import { deleteRoom } from "@/app/actions/deleteRooms";
import { FC, useState } from "react";
import { toast } from "react-toastify";
import DeleteModal from "./DeleteModal";
import { cancelRoomBooking } from "@/app/actions/cancelRoomBooking";
import { redirect } from "next/navigation";
import { useAuth } from "@/context/authContext";

interface IDeleteRoomButtonProps {
    id: string;
    title: string
};

export const DeleteRoomButton: FC<IDeleteRoomButtonProps> = ({ id, title }) => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const { setLoading } = useAuth()

    const handleDelete = async () => {
        setLoading(true);
        setIsModalOpen(false);
        try {
            const response = title === "Delete" ? await deleteRoom(id) : await cancelRoomBooking(id);
            if (response.success) {
                setLoading(false);
                toast.success(response.success);
                // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                title === "Cancel" && redirect("/bookings");
            }
            else if (response.error) {
                toast.error(response.error);
                setLoading(false);
            }
        } catch (error) {
            console.log("Failed to delete", error);
            setLoading(false);
        }
    };

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div>
            <button
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                onClick={handleOpenModal}
            >
                {title}
            </button>

            <DeleteModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onDelete={handleDelete}
                title={title}
            />
        </div>
    );
}
