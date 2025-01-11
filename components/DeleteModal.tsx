import React from "react";
import { FiTrash } from "react-icons/fi";

interface DeleteModalProps {
    isOpen: boolean;
    title: string;
    onClose: () => void;
    onDelete: () => void;
}

const DeleteModal: React.FC<DeleteModalProps> = ({ isOpen, onClose, onDelete, title }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
            <div className="bg-white rounded-lg p-6 w-96">
                <h2 className="text-xl font-bold text-center mb-4">Are you sure?</h2>
                <p className="text-center text-gray-600 mb-6">
                    This action will permanently {title} this item. Are you sure you want to continue?
                </p>
                <div className="flex justify-between">
                    <button
                        onClick={onClose}
                        className="px-6 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onDelete}
                        className="px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 flex items-center"
                    >
                        <FiTrash className="mr-2" />
                        {title}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteModal;
