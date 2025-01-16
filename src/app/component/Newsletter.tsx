import React from 'react'
import {client} from "../../sanity/lib/client";


type Product = {
  slug: string;
  _id: string;
  images: { imageUrl: string }[];
};

const getData = async (): Promise<Product[]> => {
  const response: Product[] = await client.fetch(
    `*[_type == "allproduct" && slug.current in ["5", "9", "2", "1", "3", "12"]]{
      slug,
      _id,
      images[]{
        "imageUrl": image.asset->url
      }
    }`
  );
  return response;
};

export default async function ProductGrid() {
  const data = await getData();

  return (
    <div className="flex flex-row justify-center items-center sm:grid sm:justify-center sm:grid-cols-3 sm:items-center sm:px-20 lg:px-0 lg:flex gap-10 mt-16 mb-20">
      {data.map((product, index) => (
        <div
          key={index}
          className="opacity-0 animate-fade-in-up"
          style={{ animationDelay: `${index * 200}ms` }} // Staggered animation
        >
          {product.images.map((image, imgIndex) => (
            <img
              key={imgIndex}
              src={image.imageUrl}
              alt={`Product image for ${product.slug}`}
              className="w-[156px] h-[156px] object-cover"
            />
          ))}
        </div>
      ))}
    </div>
  );
}
