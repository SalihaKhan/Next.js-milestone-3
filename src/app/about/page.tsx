'use client'
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import whitechair from "@/app/assets/Image.png";
import deliverycart from "@/app/assets/Delivery.png";
import checkmark from "@/app/assets/Checkmark--outline.png";
import purchase from "@/app/assets/Purchase.png";
import sprout from "@/app/assets/Sprout.png";
import { client } from "../../sanity/lib/client";

type Product = {
  slug: string;
  _id: string;
  title: string;
  price: string;
  description: string;
  images: { imageUrl: string }[];
};

const getData = async (slugs: string[]): Promise<Product[]> => {
  try {
    const response: Product[] = await client.fetch(
      `*[_type == "allproduct" && slug.current in $slugs]{
        slug,
        _id,
        title,
        price,
        description,
        images[] {
          "imageUrl": image.asset->url
        }
      }`,
      { slugs }
    );
    return response;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};

const Aboutpage = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    // Fetch data for specific slugs, for example ["1", "2", "3"]
    const fetchData = async () => {
      const data = await getData([""]);
      setProducts(data);
    };
    fetchData();
  }, []);

  return (
    <div>
      {/* About Us Section */}
      <div className="flex flex-col sm:flex-row justify-center items-center gap-6 mb-32 mt-32 px-4">
        <div className="sm:w-[510px] w-[410px] h-[378px] bg-[#007580] text-white p-8 transition-transform duration-300 hover:scale-105 rounded-lg shadow-lg">
          <h1 className="font-bold text-[32px] leading-[38.73px] pt-4">
            About Us - Comforty
          </h1>
          <p className="pt-4 mb-6">
            At Comforty, we believe that the right chair can blend ergonomic design, premium materials, and modern aesthetics seamlessly with functionality.
          </p>
          <button className="bg-[#F9F9F926] py-3 px-6 rounded-lg transition-all duration-300 hover:bg-white hover:text-[#007580]">
            View collection
          </button>
        </div>

        <div className="sm:w-[510px] w-[410px] h-[378px] transition-transform duration-300 hover:scale-105">
          <Image
            src={whitechair}
            alt="chair"
            className="rounded-lg shadow-lg"
            width={380}
            height={200}
          />
        </div>
      </div>

      {/* Displaying the Products */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 justify-items-center mb-24 px-32">
        {products.map((product) => (
          <div key={product._id} className="text-left transition-transform duration-300 hover:scale-105">
            <Image
              src={product.images[0]?.imageUrl || '/default-image.png'} // Fallback to a default image if none exists
              alt={product.title}
              className="mb-3 rounded-lg"
              width={270}
              height={270}
            />
            <h1 className="font-normal text-[20px] leading-[28px] text-[#007580] mb-2">
              {product.title}
            </h1>
            <p className="font-normal text-[16px] leading-[24px] text-[#007580] mb-2">
              {product.description}
            </p>
            <div className="font-bold text-[14px]">{product.price}</div>
          </div>
        ))}
      </div>

      {/* Brand Difference Section */}
      <div>
        <p className="text-[#272343] text-[32px] leading-[35.2px] font-semibold text-center mb-16">
          What makes our Brand Different
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 justify-items-center mb-24 px-32">
        {[ 
          { image: deliverycart, title: "Next day as standard", description: "Order before 3pm and get your order the next day as standard" },
          { image: checkmark, title: "Quality Guaranteed", description: "We ensure premium materials for our products." },
          { image: purchase, title: "Easy Purchase", description: "Seamless checkout experience for every customer." },
          { image: sprout, title: "Eco-Friendly", description: "We prioritize sustainability in our manufacturing." }
        ].map((item, index) => (
          <div key={index} className="text-left transition-transform duration-300 hover:scale-105">
            <Image src={item.image} alt={item.title} className="mb-3" />
            <h1 className="font-normal text-[20px] leading-[28px] text-[#007580] mb-2">
              {item.title}
            </h1>
            <p className="font-normal text-[16px] leading-[24px] text-[#007580] w-[213px] mx-auto">
              {item.description}
            </p>
          </div>
        ))}
      </div>

      {/* Popular Products Section */}
      {/* (You can add more content here for popular products) */}
    </div>
  );
};

export default Aboutpage;
