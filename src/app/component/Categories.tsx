'use client';

import { useState, useEffect } from "react";
import Image from "next/image";
import { client } from "../../sanity/lib/client";

type Product = {
  stock: number;
  _id: string;
  slug: string;
  images: { imageUrl: string }[];
  title?: string; // Optional title property
};

const getData = async (): Promise<Product[]> => {
  const response: Product[] = await client.fetch(
    `*[_type == "allproduct" && slug.current in ["9", "5", "12"]]{
      slug,
      _id,
      title,
      stock,
      images[]{
        "imageUrl": image.asset->url
      }
    }`
  );
  return response;
};

const Categories = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getData();
        setProducts(data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="sm:mb-96 mb-28">
      <div>
        <p className="text-[#272343] text-[32px] leading-[35.2px] text-center sm:text-left font-inter sm:ml-44 mb-11">
          Top categories
        </p>
        <div className="flex sm:flex-row flex-col justify-center items-center sm:gap-7">
          {loading ? (
            <p>Loading...</p>
          ) : (
            products.map((product) => (
              <div
                key={product._id}
                className="w-[324px] h-[424px] rounded-[10px] transition-transform duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl"
              >
                {product.images[0] && (
                  <Image
                    src={product.images[0].imageUrl}
                    alt={`Image for ${product.slug}`}
                    width={324}
                    height={424}
                    className="w-full h-full object-cover rounded-[10px]"
                  />
                )}
                <div className="bg-[#000000B2] p-[20px] rounded-br-[10px]">
                  <h1 className="text-[#FFFFFF] font-bold text-[20px] leading-[22px]">
                    {product.title || "Default Title"}
                  </h1>
                  <p className="text-[#FFFFFF]">
                    {typeof product.stock === "number"
                      ? ` ${product.stock} products`
                      : "Stock unavailable"}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Categories;
