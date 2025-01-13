'use client'

import { useEffect, useState } from "react";

import Image from "next/image";

const Carousel: React.FC = () => {
    const [currentImage, setCurrentImage] = useState(0);
    const images = [
        "/meeting-room-1.jpg",
        "/meeting-room-2.jpg",
        "/meeting-room-3.jpg",
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImage((prev) => (prev + 1) % images.length);
        }, 3000);

        return () => clearInterval(interval);
    }, [images.length]);

    return (
        <div className="relative">
            <Image
                src={images[currentImage]}
                alt="Meeting Room"
                className="w-full h-80 sm:h-96 object-cover rounded-xl shadow-lg transition-all duration-500 ease-in-out"
                width={1000}
                height={1000}
            />
            <div className="absolute top-1/2 left-4 transform -translate-y-1/2 text-white text-3xl cursor-pointer">
                <button onClick={() => setCurrentImage((currentImage - 1 + images.length) % images.length)}>
                    &#8592;
                </button>
            </div>
            <div className="absolute top-1/2 right-4 transform -translate-y-1/2 text-white text-3xl cursor-pointer">
                <button onClick={() => setCurrentImage((currentImage + 1) % images.length)}>
                    &#8594;
                </button>
            </div>
        </div>
    );
};

export default Carousel;