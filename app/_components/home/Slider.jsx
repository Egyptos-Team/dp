"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/autoplay";
import { EffectCoverflow, Autoplay } from "swiper/modules";
import style from "./page.module.css";

const destinations = [
  { name: "Alex", img: "/home/c034b20aab97d3c632f9f087623f5b624f9d6826.jpg" },
  { name: "Luxor", img: "/home/ce388fbe9903940ace17c86de3d6c095c3fe060b.jpg" },
  { name: "Cairo", img: "/home/27b8aa2f230ea92c0897ff6140d649eedfffd436.jpg" },
  { name: "Siwa", img: "/home/c07500800712249f791fefc164517936ca3bc5ad.jpg" },
  { name: "Aswan", img: "/home/a1e19206b61ce0fd71bfb7b51e29129d526b5be8.jpg" },
  { name: "Hurgha", img: "/home/a2e7fda8048d5e131d9b6c6eb108ace643610f28.png" },
  { name: "Dahab", img: "/home/5bf7b756eb32be7c432cbfe5b48d27a2337c25dc.png" },
];

export default function Slider() {
  return (
    <div className="w-full px-10  mx-auto py-10 bg-white">
      <h3 className={`${style.md} text-center text-[40px] text-[#020032] mb-2 font-cursive font-normal font-[Montez]`}>Top Destination</h3>
      <h2 className={`${style.xl} text-center text-[48px] text-[#020032] font-bold mb-8`}>Popular Destination</h2>

      <Swiper
      spaceBetween={20}
        effect="coverflow"
        centeredSlides={true}
        slidesPerView={1}
        loop
        breakpoints={{
          640:{ slidesPerView:2 },
          768:{ slidesPerView:3 },
          1024:{ slidesPerView:4 },
        }}
        grabCursor
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 100,
          modifier: 2.5,
        }}
        modules={[EffectCoverflow, Autoplay]}
        className="w-full"
      >
        {destinations.map((dest, index) => (
          <SwiperSlide
            key={index}
            className="relative  w-[100%] h-[600px] overflow-hidden rounded-2xl"
          >
            <Image 
            width={700}
            height={200}
            src={dest.img}
            alt={dest.name}
            className=" w-[432px] h-[500px] rounded-2xl object-cover"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,_rgba(255,255,255,0)_-75.55%,_rgba(0,0,0,0.15)_14.45%)]"></div>
            <div className={`${style.xxl}  absolute inset-0 flex items-center justify-center text-[40px]  text-[#FFFFFF99] font-semibold shadow-[6px_4px_4px_0px_#000000] font-[Manrope] `}>
              {dest.name}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}