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

// Fetch product data from Sanity
const getData = async (slug: string): Promise<Product | null> => {
  try {
    const query = `*[_type == "allproduct" && slug.current == $slug]{
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
    }`;
    const res = await client.fetch(query, { slug });
    return res.length > 0 ? res[0] : null;
  } catch (error) {
    console.error("Error fetching product data:", error);
    return null;
  }
};

// Generate dynamic metadata for SEO
export async function generateMetadata({ params }: Props) {
  const product = await getData(params.slug);
  return {
    title: product ? product.title : "Product Not Found",
    description: product ? product.description : "No description available",
  };
}

// Product Page Component
const ProductPage = async ({ params }: Props) => {
  const { slug } = params;

  // Fetch product data using the slug
  const product = await getData(slug);

  // Handle case where product is not found
  if (!product) {
    return (
      <div className="text-center mt-20 text-gray-600">
        <h1 className="text-2xl font-semibold">No product found for this slug</h1>
        <p>Please check the URL or go back to the homepage.</p>
      </div>
    );
  }

  return (
    <div>
      {/* Product Details Section */}
      <div className="flex flex-col lg:flex-row justify-around items-center mb-24 mt-24 px-4">
        {/* Product Image */}
        <div className="flex justify-center lg:justify-start">
          {product.images[0]?.imageUrl ? (
            <Image
              src={product.images[0].imageUrl}
              alt={`Image of ${product.title}`}
              width={475}
              height={407}
              className="w-auto h-[307px] sm:h-[407px] hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="bg-gray-200 w-full h-[407px] rounded-lg flex items-center justify-center">
              <span className="text-gray-500">No Image</span>
            </div>
          )}
        </div>

        {/* Product Details */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left mt-8 lg:mt-0">
          <h1 className="font-bold text-3xl sm:text-4xl mb-4">{product.title}</h1>
          <button className="bg-[#029FAE] text-white rounded-full py-2 px-4 mb-4 hover:bg-[#026f7f]">
            {product.price} USD
          </button>
          {product.oldPrice && (
            <p className="line-through text-gray-500">{product.oldPrice}</p>
          )}
          <p className="text-gray-600 max-w-lg mb-4">{product.description}</p>
          <button className="w-[180px] h-[50px] bg-[#029FAE] text-white rounded-lg flex items-center justify-center gap-2 hover:bg-[#026f7f]">
            {product.images[0]?.cartIcon ? (
              <Image
                src={product.images[0].cartIcon}
                alt="Add to cart icon"
                width={22}
                height={22}
              />
            ) : (
              <span className="text-xs">Add to Cart</span>
            )}
          </button>
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="mt-16">
        <Newsletter/>
      </div>
    </div>
  );
};

export default ProductPage;
