// app/products/[slug]/page.tsx
import React from 'react';
import { client } from "@/sanity/lib/client";
import Image from 'next/image';
import Newsletter from '../../component/Newsletter';

interface Product {
  title: string;
  price: string;
  description: string;
  label?: string;
  labelColor?: string;
  oldPrice?: string;
  images: {
    imageUrl?: string;
    cartIcon?: string;
  }[];
}

interface Props {
  params: {
    slug: string;
  };
}

// Fetch product data based on the slug
const getData = async (slug: string): Promise<Product | null> => {
  const res = await client.fetch(
    `*[_type == "allproduct" && slug.current == "${slug}"]{ 
      title,
      price,
      _id,
      "slug": slug.current,
      label,
      labelColor,
      description,
      oldPrice,
      images[] {
        "imageUrl": image.asset->url,
        "cartIcon": cart.asset->url
      }
    }`
  );
  return res.length > 0 ? res[0] : null;
};

// Page component to render product details
const ProductPage = async ({ params }: Props) => {
  const { slug } = params;

  // Fetch product data using the slug
  const product = await getData(slug);

  // If no product data found
  if (!product) {
    return <div className="text-center mt-20">No product found for this slug</div>;
  }

  return (
    <div>
      <div className="flex flex-col lg:flex-row md:flex-col justify-around items-center mb-24 lg:ml-20 md:ml-0 ml-0 sm:mb-32 mt-24 sm:mt-48 md:mt-36 px-4">
        {/* Image Section */}
        <div className="flex justify-center lg:justify-start">
          {product.images[0]?.imageUrl ? (
            <Image
              src={product.images[0].imageUrl}
              alt={product.title}
              className="w-auto h-[307px] sm:h-[407px] sm:w-[475px] md:h-[375px] md:w-[420px] transform transition-transform duration-300 hover:scale-105"
              width={475} // You can adjust the width and height based on your needs
              height={407}
            />
          ) : (
            <div className="w-full h-[407px] bg-gray-200 rounded-[6px] flex items-center justify-center">
              <span className="text-gray-500 text-sm">No Image</span>
            </div>
          )}
        </div>

        {/* Content Section */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left mt-8 lg:mt-0">
          <h1 className="font-bold text-[36px] sm:text-[48px] lg:text-[60px] leading-tight sm:leading-[66px] mb-3 lg:mb-4 max-w-lg">
            {product.title}
          </h1>
          <button className="text-white bg-[#029FAE] rounded-full py-2 px-4 text-sm lg:text-base mb-4 transition-all duration-300 transform hover:scale-105 hover:bg-[#026f7f]">
            {product.price} USD
          </button>
          {product.oldPrice && (
            <p className="text-[#9A9CAA] text-[16px] sm:text-[18px] md:text-[22px] leading-[24px] sm:leading-[28px] md:leading-[33px] mb-4 line-through">
              {product.oldPrice}
            </p>
          )}
          <p className="text-[#272343] opacity-60 text-[16px] sm:text-[18px] md:text-[22px] leading-[24px] sm:leading-[28px] md:leading-[33px] max-w-lg mb-4">
           {product.description}
          </p>
          <button className="w-[180px] sm:w-[212px] h-[50px] sm:h-[63px] text-white bg-[#029FAE] rounded-lg flex justify-center items-center gap-2 transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:bg-[#026f7f]">
            {product.images[0]?.cartIcon ? (
              <Image src={product.images[0].cartIcon} alt="cart" className="w-[18px] sm:w-[22px] h-[18px] sm:h-[22px]" width={22} height={22} />
            ) : (
              <span className="text-xs">No Icon</span>
            )}
            Add To Cart
          </button>
        </div>
      </div>

      <div className="mt-44 mb-28">
        <p className="text-[#272343] text-[50px] text-center font-roboto">Or subscribe to the newsletter</p>
      </div>

      <div className="flex justify-center sm:gap-52 gap-0 mb-16">
        <input type="text" placeholder="Email Address..." className="underline underline-offset-4" />
        <button className="text-[#1E2832] underline underline-offset-4">SUBMIT</button>
      </div>

      <div>
        <p className="text-[#272343] text-[50px] text-center font-roboto">Follow products and discounts on Instagram</p>
      </div>

      <Newsletter />
    </div>
  );
};

export default ProductPage;
