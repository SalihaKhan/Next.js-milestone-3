
import React from 'react'
import Image from 'next/image'
import { client } from "../../sanity/lib/client";

// Define the product type
interface Product {
  title: string;
  price: string; // Change to `number` if it's numeric
  label?: string;
  labelColor?: string;
  oldPrice?: string; // Change to `number` if it's numeric
  images: {
    imageUrl?: string; // Image URL for the product
    cartIcon?: string; // Cart icon URL
  }[];
}

// Fetch data from Sanity
const getData = async (): Promise<Product[]> => {
  const res: Product[] = await client.fetch(
    `*[_type == "allproduct" && slug.current in ["1","2",'3',"4","9","6","7","5"]]{
      title,
      slug,
      price,
      label,
      labelColor,
      oldPrice,
      images[]{
        "imageUrl": image.asset->url,
        "cartIcon": cart.asset->url
      }
    }`
  );
  return res;
};


const Productsection = async (): Promise<React.ReactElement> => {
  const data = await getData();
  return (
    <div>
  <p className="text-[#272343] text-[32px] leading-[35.2px] text-center mb-11">Our Products</p>

  <div>
  <div className="sm:mb-48 mb-28 relative bottom-16">
  <div className="grid grid-cols-1 py-40 gap-12  sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 px-4 sm:px-8 md:px-16 lg:px-44 lg:gap-24 justify-items-center">
  
          {data?.map((product, productIndex) => (
            <div
              key={product.title || productIndex} // Unique key for each product
              className="w-[212px] h-[212px] rounded-[6px] mb-8 transition-transform duration-300 hover:scale-105"
            >
              <div className="relative">
                {/* Label */}
                {product.label && (
                  <button
                    className={`py-[4px] sm:py-[6px] px-[8px] sm:px-[10px] mt-2 sm:mt-4 ml-2 sm:ml-4 rounded absolute text-[12px] sm:text-[14px] text-[#FFFFFF]`}
                    style={{ backgroundColor: product.labelColor }}
                  >
                    {product.label}
                  </button>
                )}
  
                {/* Images */}
                {product.images[0]?.imageUrl ? (
                  <Image
                    src={product.images[0].imageUrl}
                    alt={product.title}
                    className="rounded-[6px] w-full h-auto object-cover"
                    width={212}
                    height={212}
                  />
                ) : (
                  <div className="w-full h-[212px] bg-gray-200 rounded-[6px] flex items-center justify-center">
                    <span className="text-gray-500 text-sm">No Image</span>
                  </div>
                )}
              </div>
  
              {/* Title */}
              <p className="text-[#007580] font-normal text-[16px] leading-[20.8px] mt-4 text-left">
                {product.title}
              </p>
  
              {/* Price and Cart Icon */}
              <div className="flex justify-between items-center mt-2">
                <div>
                  <span>{product.price}</span>
                  {product.oldPrice && (
                    <span className="text-[#9A9CAA] line-through ml-1">
                      {product.oldPrice}
                    </span>
                  )}
                </div>
                {product.images[0]?.cartIcon ? (
                  <Image
                    src={product.images[0].cartIcon}
                    alt="cart"
                    className="w-[34px] h-[34px]"
                    width={34}
                    height={34}
                  />
                ) : (
                  <div className="w-[34px] h-[34px] bg-gray-200 rounded-full flex items-center justify-center">
                    <span className="text-gray-500 text-xs">No Icon</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
        </div>
</div>
</div>
  
  



      
  )
}

export default Productsection
