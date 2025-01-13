'use client'
import { FC, useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface ImageGalleryProps {
  images: string[];
  id?: string;
  name?: string;
}

const ImageGallery: FC<ImageGalleryProps> = ({ images, id, name }) => {
  const [mainImage, setMainImage] = useState<string>(images[0] || '/rooms/no-image.jpg');

  const handleImageClick = (image: string) => {
    setMainImage(image);
  };

  return (
    <div className="flex flex-col gap-2">
      {/* Main Image */}
      <div className="flex-shrink-0 w-full relative lg:w-[476px] " style={{ paddingBottom: '56.25%' /* 16:9 aspect ratio */ }}>
        <Image
          src={mainImage}
          alt="Main Room Image"
          className="object-cover rounded-lg absolute top-0 left-0 w-full h-full"
          layout="fill"
        />
        {name && id &&
          <>
            <div className="absolute inset-0 bg-black opacity-30"></div>
            <div className="absolute top-4 left-4 text-white flex flex-col lg:flex-row md:items-left md:gap-4 w-full justify-between lg:pr-8">
              <h3 className="text-2xl font-semibold line-clamp-1 mb-2">{name}</h3>
              <Link href={`/rooms/${id}`} passHref>
                <button
                  className="bg-lime-700 text-white px-4 py-2 rounded-md hover:bg-lime-600 transition-colors duration-300"
                >
                  View Room
                </button>
              </Link>
            </div>
          </>}
      </div>

      {/* Thumbnails */}
      <div className="flex gap-2 mt-2 overflow-x-auto">
        {images.map((image, index) => (
          <div key={index} className="flex-shrink-0 cursor-pointer" onClick={() => handleImageClick(image)}>
            <Image
              src={image}
              alt={`Room image ${index + 1}`}
              className="w-24 h-24 object-cover rounded-lg"
              width={96}
              height={96}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageGallery;
