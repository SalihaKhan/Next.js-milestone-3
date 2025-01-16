import React from 'react';
import { client } from "../../sanity/lib/client";
import Image from 'next/image';

type Product = {
  slug: string;
  _id: string;
  images: { imageUrl: string }[];
};

const getData = async (): Promise<Product[]> => {
  const response: Product[] = await client.fetch(
    `*[_type == "allproduct" && slug.current in ["3", "4", "1", "6", "5"]]{
      slug,
      _id,
      images[] {
        "imageUrl": image.asset->url
      }
    }`
  );
  return response;
};

const Popularstyles = async () => {
  const data = await getData();

  // Handle case where no data is returned
  if (!data || data.length === 0) {
    return (
      <div className="text-center text-gray-500">
        No popular styles available at the moment.
      </div>
    );
  }

  return (
    <div>
      {/* Title */}
      <div className="font-roboto font-normal text-[28px] sm:text-[34px] text-center leading-[39.84px] mb-12 sm:mb-16 transition-all duration-500 ease-in-out">
        Explore new and popular styles
      </div>

      {/* Container */}
      <div className="flex sm:flex-row flex-col justify-center items-center gap-4 sm:gap-8 mb-24 sm:mb-36 px-4 sm:px-0 transition-all duration-500 ease-in-out">
        
        {/* Large Image (first product) */}
        {data[0]?.images?.[0]?.imageUrl ? (
          <div className="relative group">
            <Image
              src={data[0].images[0].imageUrl}
              alt={`Product ${data[0].slug}`}
              width={464}
              height={464}
              className="w-[280px] h-[280px] sm:w-[464px] sm:h-[464px] transition-transform duration-500 hover:scale-105"
            />
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-500"></div>
          </div>
        ) : (
          <div className="text-gray-500">No large image available</div>
        )}

        {/* Grid of smaller images */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          {data.slice(1).map((product) => (
            <div className="relative group" key={product._id}>
              {product.images?.[0]?.imageUrl ? (
                <Image
                  src={product.images[0].imageUrl}
                  alt={`Product ${product.slug}`}
                  width={232}
                  height={232}
                  className="w-[140px] h-[140px] sm:w-[232px] sm:h-[232px] transition-transform duration-500 hover:scale-105"
                />
              ) : (
                <div className="text-gray-500">No image available</div>
              )}
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-500"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Popularstyles;
