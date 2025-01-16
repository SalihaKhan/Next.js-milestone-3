import React from 'react'
import Image from 'next/image'
import logo1 from "@/app/assets/Logo (1).png";
import logo2 from "@/app/assets/Logo (2).png";
import logo3 from "@/app/assets/Logo (3).png";
import logo4 from "@/app/assets/Logo (4).png";
import logo5 from "@/app/assets/Logo (5).png";
import logo6 from "@/app/assets/Logo (6).png";
import logo7 from "@/app/assets/Logo (7).png";


const Brandsection = () => {
  return (
    <div>
    {/* Logos Section */}
    <div className="flex flex-wrap justify-center sm:justify-around sm:mx-20 mt-20 sm:mt-32 gap-8 transition-all duration-300">
      <Image src={logo1} alt="logo" className="w-[60px] sm:w-[85px] h-[62px] sm:h-[87px] transition-transform duration-300 hover:scale-105" />
      <Image src={logo2} alt="logo" className="w-[75px] sm:w-[107px] h-[77px] sm:h-[109px] transition-transform duration-300 hover:scale-105" />
      <Image src={logo3} alt="logo" className="w-[95px] sm:w-[135px] h-[97px] sm:h-[139px] transition-transform duration-300 hover:scale-105" />
      <Image src={logo4} alt="logo" className="w-[50px] sm:w-[63px] h-[52px] sm:h-[65px] transition-transform duration-300 hover:scale-105" />
      <Image src={logo5} alt="logo" className="w-[70px] sm:w-[98px] h-[80px] sm:h-[101px] transition-transform duration-300 hover:scale-105" />
      <Image src={logo6} alt="logo" className="w-[85px] sm:w-[113px] h-[87px] sm:h-[115px] transition-transform duration-300 hover:scale-105" />
      <Image src={logo7} alt="logo" className="w-[60px] sm:w-[84px] h-[62px] sm:h-[87px] transition-transform duration-300 hover:scale-105" />
    </div>
  
    {/* Featured Products Title */}
    <div className="flex justify-center sm:justify-start">
      <p className="text-[#272343] text-[24px] sm:text-[28px] lg:text-[32px] leading-[28px] sm:leading-[32px] lg:leading-[35.2px] mb-6 sm:mb-8 lg:mb-11 font-inter text-center lg:text-left sm:ml-48 sm:mt-7 mx-auto mt-7 transition-all duration-300 hover:text-[#029FAE]">
        Featured Products
      </p>
    </div>
  </div>
  
  
  )
}

export default Brandsection
