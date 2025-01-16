'use client'
import React from 'react'
import { IoMdCheckmark } from "react-icons/io";
import Link from 'next/link';
import Image from 'next/image';
import circle from "@/app/assets/circle.png"
import Logo from "@/app/assets/Logo Icon.png";
import cart from "@/app/assets/cart (2).png";
import num from "@/app/assets/No.png";

const Header = () => {
  return (
<div className='bg-[#272343] text-[#FFFFFF] h-auto flex flex-col sm:flex-row justify-around items-center py-[12px] px-4 sm:px-10 lg:px-20 sm:py-[18px] rounded-lg shadow-lg'>
  <div className='flex justify-center items-center gap-[8px] opacity-80 transition-opacity duration-300 hover:opacity-100'>
    <IoMdCheckmark className='text-[16px] sm:text-[20px] lg:text-[24px]' />
    <p className='text-[13px] sm:text-[15px] lg:text-[17px] text-center sm:text-left'>Free shipping on all orders over $50</p>
  </div>
  
  <div className='opacity-80 sm:mt-0 gap-[16px] sm:gap-[24px] lg:gap-[28px] font-normal text-[13px] sm:text-[14px] lg:text-[15px] leading-[18px] flex flex-col sm:flex-row justify-between items-center transition-opacity duration-300 hover:opacity-100'>
    <select className="bg-[#272343] ml-0 lg:ml-7 border border-[#FFFFFF] rounded-md focus:outline-none cursor-pointer hover:bg-[#434A7E] transition-colors duration-300 text-[13px] sm:text-[14px] lg:text-[15px] p-1 sm:p-2">
      <option value="eng">Eng</option>
    </select>
    <div>
      <Link href="/FAQs" className='hover:text-[#FFA500] transition-colors duration-300 text-[13px] sm:text-[14px] lg:text-[15px]'>FAQs</Link>
    </div>
    <div className='flex justify-center items-center gap-[8px] cursor-pointer hover:scale-110 transition-transform duration-300'>
      <Image src={circle} alt="help" className='w-[14px] sm:w-[16px] lg:w-[18px]' /> 
      <p className='hover:text-[#FFA500] transition-colors duration-300 text-[13px] sm:text-[14px] lg:text-[15px]'>Need Help</p>
    </div>
  </div>
</div>

  
  )
}

export default Header;

export const Header2 =()=> {
  return(
    <div className='flex justify-around items-center py-[10px] sm:py-[20px] px-[10px] w-full'>
    <div className='flex gap-[8px]'>
      <Image src={Logo} alt="logo" className='w-[30px] sm:w-[36px] h-[30px] sm:h-[36px] bg-[#FFFFFF] rounded-full transition-transform duration-300 hover:scale-110'/>
      <h1 className='font-medium text-[24px] sm:text-[28px] leading-[24px] sm:leading-[32px] transition-all duration-300 hover:text-[#029FAE] cursor-pointer'>Comforty</h1>
    </div>
    <div className='flex items-center gap-4 sm:gap-[12px]'>
      <Image src={cart} alt="cart" className='w-[22px] sm:w-[26px] h-[22px] sm:h-[26px] transition-transform duration-300 hover:scale-110'/>
      <Link href="/cart" className='font-medium text-[12px] sm:text-[14px] leading-[14px] flex justify-center items-center gap-[8px] cursor-pointer hover:scale-110 transition-transform duration-300'>Cart</Link>
      <Image src={num} alt="circle" className='w-[20px] sm:w-[24px] h-[20px] sm:h-[24px] transition-transform duration-300 hover:scale-110'/>
    </div>
  </div>
  
  
   
   
  )
}
import { useState } from 'react';  // Import useState hook from React
import { IoMdMenu } from "react-icons/io";

export const Header3 = () => {
  const [isOpen, setIsOpen] = useState(false); // Declare state variable

  const toggleMenu = () => {
    setIsOpen(!isOpen); // Toggle menu visibility
  };

  return (
    <div className='font-medium text-sm leading-[15.4px] py-[10px] sm:py-[14px] text-[#636270] flex flex-col md:flex-row justify-around items-center bg-[#FFFFFF] drop-shadow-sm decoration-[#E1E3E5] px-[10px] sm:px-0 relative'>
      
      {/* Menu Links (Desktop and Medium Screens) */}
      <div className='sm:flex md:flex hidden sm:justify-between space-x-4 sm:space-x-8 sm:mb-0'>
        <Link href="/" className='text-[#007580]'>Home</Link>
        <Link href="#" className='text-[#007580]'>Shop</Link>
        <Link href="/products" className='text-[#007580]'>Product</Link>
        <Link href="/about" className='text-[#007580]'>About</Link>
      </div>

      {/* Contact Info (Desktop, Medium Screens) */}
      <div className='flex gap-4 sm:gap-80'>
        <div className='text-center sm:text-left'>
          <Link href="/contact" className='hidden lg:block'>Contact: (808) 555-0111</Link>
        </div>
      </div>

      {/* Hamburger Icon (Mobile and Medium Screens) */}
      <div className='sm:hidden md:hidden absolute top-4 right-4'>
        <button onClick={toggleMenu} className='text-[#007580]'>
          {/* Hamburger Icon */}
          <IoMdMenu className='text-lg'/>
        </button>
      </div>

      {/* Mobile and Medium Menu Links */}
      <div className={`sm:hidden ${isOpen ? 'block' : 'hidden'} bg-[#F0F2F3] w-full text-center text-[#636270] py-4 px-6`}>
        <Link href="/" className='block py-2'>Home</Link>
        <Link href="#" className='block py-2'>Shop</Link>
        <Link href="/product" className='block py-2'>Product</Link>
        <Link href="/pages" className='block py-2'>Pages</Link>
        <Link href="/about" className='block py-2'>About</Link>
        <Link href="/contact" className='block py-2'>Contact: (808) 555-0111</Link>
      </div>
    </div>
  );
};
