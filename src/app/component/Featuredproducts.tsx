import React from 'react';
import { client } from "../../sanity/lib/client";
import Image from 'next/image';

type Product = {
  slug: string;
  _id: string;
  title:string;
  price: string;
  images: { imageUrl: string }[];
};

const getData = async (): Promise<Product[]> => {
  const response: Product[] = await client.fetch(
    `*[_type == "allproduct" && slug.current in ["7", "8", "12", "3", "9"]]{
      slug,
      _id,
      title,
      price,
      images[] {
        "imageUrl": image.asset->url
      }
    }`
  );
  return response;
};

const Featuredproducts = async () => {
  const data = await getData();

  if (!data || data.length === 0) {
    return (
      <div className="text-center mt-10 text-gray-500">
        No featured products found.
      </div>
    );
  }

  return (
    <div>
      <div>
        <p className="text-[#272343] text-[32px] leading-[35.2px] lg:ml-32 text-center lg:text-left">
          Featured Products
        </p>
      </div>

      {/* Product Grid */}
      <div className="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-10 px-6 lg:px-28 py-20">
        {data.map((product) => (
          <div key={product._id} className="group w-auto max-w-sm">
            {/* Image with Hover Effect */}
            <Image
              src={product.images[0]?.imageUrl || '/fallback.png'} // Fallback image
              alt={product.slug}
              width={270}
              height={270}
              className="w-full h-[263px] rounded-[10px] object-cover transition-transform duration-300 group-hover:scale-105"
            />
            {/* Product Details */}
            <div className="flex justify-between items-center mt-4">
              <div className="text-[#272343] font-normal text-[16px]">
                {product.title || 'Unknown Product'}
              </div>
              <div className="font-bold text-[14px]">
                {product.price ? `$${product.price}` : 'Price Unavailable'}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Featuredproducts;

