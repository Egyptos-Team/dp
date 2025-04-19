"use client";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import Image from "next/image";
import Link from "next/link";
import "swiper/css";

export default function Slider() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await fetch("https://egyptos.runasp.net/api/AreaTypes/Get/8");
        const data = await res.json();
        setImages(data.areas); // ← هنا التعديل
        console.log("data", data);
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    fetchImages();
  }, []);

  return (
    <div className="w-full max-w-[1380px] mx-auto my-20 px-2">
      <Swiper
        modules={[Autoplay]}
        spaceBetween={10}
        slidesPerView={1}
        slidesPerGroup={1}
        loop={true}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        direction="horizontal"
        breakpoints={{
          350: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1380: { slidesPerView: 3 },
        }}
      >
        {images.length > 0 ? (
          images.map((item) => (
            <SwiperSlide key={item.id} className="flex justify-center">
              <Link href={`/explore/museum/${item.id}`} >
                <div className="flex flex-col justify-end items-end h-full">
                  <Image
                    src={`https://egyptos.runasp.net/${item.imageUrl || "default.jpg"}`}
                    alt={item.name}
                    width={454}
                    height={374.15}
                    className="rounded-xl object-cover cursor-pointer w-full h-[300px]"
                    unoptimized={true}
                  />
                  <p className="bg-red-950/60 text-[#EBD778] px-2 w-[229px] mt-[-50px] overflow-hidden h-[71px] rounded-[10px] flex items-center justify-center text-center text-base">
                    {item.name}
                  </p>
                </div>
              </Link>
            </SwiperSlide>
          ))
        ) : (
          <p className="text-center text-gray-500"> loading</p>
        )}
      </Swiper>
    </div>
  );
}
