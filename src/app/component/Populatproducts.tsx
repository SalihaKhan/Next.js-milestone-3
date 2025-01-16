'use client'
import React, { useEffect, useState } from 'react';
import { client } from "../../sanity/lib/client";
import Image from 'next/image';

type Product = {
  slug: string;
  _id: string;
  images: { imageUrl: string }[];
};

const getData = async (): Promise<Product[]> => {
  const response: Product[] = await client.fetch(
    `*[_type == "allproduct" && slug.current in ["7", "8", "12", "3", "9"]]{
      slug,
      _id,
      images[] {
        "imageUrl": image.asset->url
      }
    }`
  );
  return response;
};

const PopularProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getData();
      setProducts(data);
    };
    fetchData();
  }, []);

  return (
    <div>
      <div>
        <p className="text-[#272343] text-[32px] leading-[35.2px] font-semibold text-center sm:text-left sm:ml-48 mb-12">
          Our Popular Products
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center lg:px-28 mb-24">
        {products.map((product) => (
          <div key={product._id} className="transition-transform duration-300 hover:scale-105">
            <Image
              src={product.images[0]?.imageUrl || '/default-image.png'} // Fallback to a default image if no image exists
              alt="product"
              className="w-[550px] h-[275px] mb-3"
              width={550}
              height={275}
            />
            <p className="font-normal text-[20px] leading-[28px] text-[#2A254B] mb-1">
              {product.slug} {/* You can use the actual title of the product here if it exists */}
            </p>
            <p className="font-normal text-[18px] leading-[27px] text-[#2A254B]">$99.00</p> {/* Add dynamic price if available */}
          </div>
        ))}
      </div>
      <PopularProducts />
    </div>
  );
};

export default PopularProducts;
