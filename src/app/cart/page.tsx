'use client'
import { useState } from 'react';
import React from 'react';
import Image from 'next/image';
import orangechair from "@/app/assets/Image (2).png";
import hearticon from "@/app/assets/Frame (1).png";
import deleteicon from "@/app/assets/Frame (2).png";
import brownchair from "@/app/assets/Image (6).png";
import { StaticImageData } from 'next/image';

// Define Type for Cart Item
type CartItem = {
  id: number;
  name: string;
  price: number;
  size: string;
  quantity: number;
  image: StaticImageData;
};

// Initial Cart Data
const initialCart: CartItem[] = [
  {
    id: 1,
    name: 'Library Stool Chair',
    price: 99,
    size: 'L',
    quantity: 0,
    image: orangechair,
  },
  {
    id: 2,
    name: 'Library Stool Chair',
    price: 99,
    size: 'L',
    quantity: 0,
    image: brownchair,
  },
];

// Main Cart Page Component
const Cartpage: React.FC = () => {
  const [cart, setCart] = useState<CartItem[]>(initialCart);

  // Quantity Change Handler
  const handleQuantityChange = (id: number, change: number): void => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(0, item.quantity + change) }
          : item
      )
    );
  };

  // Remove Item Handler
  const handleRemove = (id: number): void => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  // Calculate Subtotal
  const subtotal: number = cart.reduce(
    (acc: number, item: CartItem) => acc + item.price * item.quantity,
    0
  );

  // Checkout Handler
  const handleCheckout = (): void => {
    alert('Proceeding to Checkout!');
  };

  return (
    <div className="flex flex-col lg:flex-row">
  {/* Left Section: Cart Items */}
  <div className="w-full lg:w-3/4 px-4 lg:px-8">
    <div className="flex justify-around items-center">
      <div className="w-full">
        <hr className="mt-10 mb-10" />
        <h1 className="font-medium text-xl lg:text-2xl text-gray-900 mb-6 text-center lg:text-left lg:px-48 ">
          Bag
        </h1>
      </div>
    </div>

    {cart.length > 0 ? (
      cart.map((item) => (
        <div
          key={item.id}
          className="flex flex-col sm:flex-row mb-9 items-center lg:px-36 "
        >
          {/* Product Image */}
          <div className="mx-auto sm:ml-10">
            <Image
              src={item.image}
              alt={item.name}
              width={150}
              height={150}
              className="object-contain"
            />
          </div>
          {/* Product Details */}
          <div className="mt-4 sm:mt-0 sm:ml-7 flex-grow text-center sm:text-left">
            <div className="flex flex-col sm:flex-row justify-between sm:w-[400px]">
              <p className="font-normal text-lg text-gray-800">{item.name}</p>
              <p className="font-semibold text-gray-800">
                MRP: ${item.price * item.quantity}
              </p>
            </div>
            <p className="text-gray-500 mt-2">Size {item.size}</p>
            <div className="flex items-center justify-center sm:justify-start gap-4 mt-2">
              <button
                onClick={() => handleQuantityChange(item.id, -1)}
                className="px-2 py-1 bg-gray-200 rounded disabled:opacity-50"
                disabled={item.quantity <= 1}
              >
                -
              </button>
              <p className="font-semibold">{item.quantity}</p>
              <button
                onClick={() => handleQuantityChange(item.id, 1)}
                className="px-2 py-1 bg-gray-200 rounded"
              >
                +
              </button>
            </div>
            <div className="flex gap-4 justify-center sm:justify-start mt-4">
              <Image
                src={hearticon}
                alt="Save"
                width={24}
                height={24}
                className="cursor-pointer"
              />
              <button onClick={() => handleRemove(item.id)}>
                <Image
                  src={deleteicon}
                  alt="Delete"
                  width={24}
                  height={24}
                  className="cursor-pointer"
                />
              </button>
            </div>
          </div>
        </div>
      ))
    ) : (
      <p className="text-center mt-10 text-gray-500">Your cart is empty.</p>
    )}
  </div>

  {/* Right Section: Summary */}
  <div className="w-full lg:w-1/4 px-4 mt-10 lg:mt-0">
    <div className="bg-gray-100 p-6 rounded-lg">
      <h1 className="text-xl font-medium text-gray-900 mb-5 text-center lg:text-left">
        Summary
      </h1>
      <div className="flex justify-between mb-4">
        <h2 className="text-gray-800">Subtotal</h2>
        <p className="text-gray-800">${subtotal.toFixed(2)}</p>
      </div>
      <div className="flex justify-between mb-4">
        <p className="text-gray-600">Estimated Delivery & Handling</p>
        <p className="text-gray-800">Free</p>
      </div>
      <div className="flex justify-between border-t pt-4 mb-5">
        <div className="text-gray-800">Total</div>
        <div className="font-semibold text-gray-900">${subtotal.toFixed(2)}</div>
      </div>
      <button
        className="w-full bg-teal-600 text-white py-3 rounded-lg hover:bg-teal-700 transition duration-300"
        onClick={handleCheckout}
      >
        Member Checkout
      </button>
    </div>
  </div>
</div>

  );
};

export default Cartpage;
