import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function SliderTransportion({ typeId }: { typeId: string }) {
  console.log(` slider ${typeId}`);
  let pathImage: string = " ";
  if (typeId === "1") {
    pathImage = "/transportion/car box.png";
  }
  if (typeId === "2") {
    pathImage = "/transportion/bus.png";
  }
  if (typeId === "3") {
    pathImage = "/transportion/scoter.png";
  }
  if (typeId === "4") {
    pathImage = "/transportion/bicycle  box.png";
  }else{
    pathImage = "/transportion/car box.png";
  }
  return (
    <div className="relative">
      <div className=" max-h-[888px] overflow-hidden ">
        <Image
          src={pathImage}
          height={858}
          width={1440}
          alt="transport background"
          className=" w-full h-full"
        />
      </div>
      <div className=" hidden absolute top-8 left-9 md:top-[60px] md:left-[70px]  w-[40%] h-[55%] bg-[#3A3A3CCC] lg:flex items-center justify-center rounded-md">
        <div className="absolute w-[80%] h-[90%] text-white  ">
          <div className="absolute w-[80px] h-[5px] bg-[#EB4D2B] "></div>
          <div className="text-[22px] xl:text-[32px] font-bold uppercase mt-4">
            Book the best service as per you requirement...
          </div>
          <div className="2xl:text-[20px]">
            We make private transportation easier and more convenient. We
            provide customized ride options based on your preferences. With
            smart recommendations, you can quickly find the best transportation
            solutions. Whether for daily commutes or special trips, we ensure a
            seamless experience. Enjoy hassle-free booking and reliable service
            tailored to your needs
          </div>
          <Link href="#next-section" className=" absolute bottom-0 flex items-center justify-center bg-[#DF3C20] capitalize  rounded-sm xl:mt-4 text-[24px] xl:h-[50px] w-[160px] xl:w-[200px]">
            {" "}
            take a look <ArrowDropDownIcon />
          </Link>
        </div>
      

      </div>
    </div>
  );
}