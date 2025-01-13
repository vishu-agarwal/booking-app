'use client';

import React from 'react'
import { FaArrowLeft } from 'react-icons/fa';

import { useRouter } from 'next/navigation';

const BackButton = () => {
    const router = useRouter()

    return (
        <button
            className="mb-4 py-2 px-2 text-lime-600 rounded-md hover:bg-lime-100 transition duration-300 flex items-center gap-2"
            onClick={() => router.back()}
        >
            <FaArrowLeft />
            Back to Room
        </button>
    )
}

export default BackButton