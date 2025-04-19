"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import Image from "next/image";
import React from "react";
import style from "./page.module.css";
import Link from "next/link";

const images = [
  "/about/f3c23f819145b4d6e7d81a50707f437d.png",
  "/about/bb9359a493ac7351220ec7594b4e836f.jpg",
  "/about/3857369b5576ba9cb17a7fa01c5db8ec.jpg",
  "/about/5bc8513d32d1a98fd8b686d2e1ae6255.jpg",
];

const About = () => {
  return (
    <div className="bg-white font-[cairo]">
      <div>
        <div className="relative overflow-hidden">
          <div className="relative">
            <Swiper
              speed={1000}
              loop={true}
              autoplay={{ delay: 2000, disableOnInteraction: false }}
              navigation={{
                nextEl: ".custom-next",
                prevEl: ".custom-prev",
              }}
              modules={[Navigation, Autoplay, EffectFade]}
              className="mySwiper text-textWhite"
            >
              {images.map((src, index) => (
                <SwiperSlide key={index}>
                  <Image
                    quality={100}
                    width={1441}
                    height={100}
                    src={src}
                    alt="Full Width Image"
                    className="h-[500px] w-full bg-cover "
                  />
                  <div className="absolute w-full h-[500px] rounded-lg inset-0 bg-[linear-gradient(180deg,rgba(217,217,217,0)_0%,rgba(23,23,23,0.72)66.81%)]"></div>
                </SwiperSlide>
              ))}
            </Swiper>
            <button
              className="custom-prev absolute top-[50%] transform translate-[-50%] left-2 z-10 bg-[#FFFFFF] text-[#111827] px-4 py-2 rounded-full hover:bg-[midnightBlue] hover:text-[#FFFFFF]"
              aria-label="Previous"
            >
              ❮
            </button>
            <button
              className="custom-next absolute top-[50%] transform translate-[-50%] right-2 z-10 bg-[#FFFFFF] text-[#111827] px-4 py-2 rounded-full hover:bg-[midnightBlue] hover:text-[#FFFFFF]"
              aria-label="Next"
            >
              ❯
            </button>
          </div>
        </div>
        <h1 className="text-[#ffffff] z-10 absolute bottom-[18%] left-[2%] font-semibold font-[Poppins] italic sm:text-[28px] lg:text-[40px]">
          Experience Egypt ... Like Never Before
        </h1>
      </div>
      {/* start sec 1  */}
      <div className={`${style.padding} container sm:pl-20 lg:pl-20 lg:pr-10`}>
        <h1
          className={`${style.about} pt-14 pb-8 text-[#111827] text-[40px] font-semibold`}
        >
          About us
        </h1>

        <div>
  <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-8">
    <div className="relative overflow-hidden group">
      <div className="relative">
        <Image
          src="/about/a5958be45de6b490527f7dd79d9d7f95.jpg"
          alt="img1"
          width={800}
          height={300}
          className={`${style.img} h-[431px] w-full object-cover rounded-lg`}
        />
        <div className="absolute w-full h-full overflow-hidden rounded-lg inset-0 bg-[linear-gradient(180deg,rgba(255,176,30,0.08)_0%,rgba(48,31,0,0.64)_100%)]"></div>
        <div className="absolute bottom-[-50%] left-0 w-full h-full flex flex-col justify-center items-start pl-2 transition-all duration-700 group-hover:bottom-[-30%]">
          <h2 className="text-[#FFFFFF] font-[poppins] font-semibold italic pb-2 sm:text-[28px] lg:text-[40px] cursor-pointer">
            Experience Egypt
          </h2>
          <p className="text-[#FFFFFF] font-[poppins] font-normal sm:text-[15px] lg:text-[18px] leading-tight">
            Lorem ipsum dolor, sit amet consectetur, <br />
            adipisicing elit. Accusantium distinctio eumnis <br />
            quos nostrum voluptate obcaecati.
          </p>
        </div>
      </div>
    </div>
    <div className="px-4 md:px-8 mt-16 lg:px-0">
      <h1 className="text-[#111827] font-[poppins] font-extrabold sm:text-[28px] lg:text-[40px]">
        Egyptus
      </h1>
      <p className={`${style.pragraph} text-[#111827] font-[poppins] font-normal sm:text-[20px] lg:text-[24px] leading-relaxed`}>
        Welcome to Egyptus! your trusted travel <br />
        in exploring the wonders of Egypt <br />
        Our mission is to connect travelers from <br />
        Around the globe with the unmatched, Beauty, rich history, and vibrant culture of our land.
      </p>
    </div>
  </div>
  <div className="grid md:grid-cols-1 text-right mt-10 lg:grid-cols-2 gap-8">
    <div className="px-4 mt-16 md:px-8 lg:px-0">
      <h1 className="text-[#111827] font-[poppins] font-extrabold sm:text-[28px] lg:text-[40px]">
        Egyptus
      </h1>
      <p className={`${style.pragraph} text-[#111827] font-[poppins] font-normal sm:text-[20px] lg:text-[24px] leading-relaxed`}>
        Welcome to Egyptus! your trusted travel <br />
        in exploring the wonders of Egypt <br />
        Our mission is to connect travelers from <br />
        Around the globe with the unmatched, Beauty, rich history, and vibrant culture of our land.
      </p>
    </div>
    <div className="relative overflow-hidden md:pr-10 pr-0 group">
      <div className="relative">
        <Image
          src="/about/5fe127f714b9458abfb93d39f7f78ff1.jpg"
          alt="img1"
          width={800}
          height={300}
          className={`${style.img} h-[431px] w-full object-cover rounded-lg`}
        />
        <div className="absolute w-full h-full overflow-hidden rounded-lg inset-0 bg-[linear-gradient(180deg,rgba(255,176,30,0.08)_0%,rgba(48,31,0,0.64)_100%)]"></div>
        <div className="absolute bottom-[-50%] left-0 w-full h-full flex flex-col justify-center items-end pr-3 transition-all duration-700 group-hover:bottom-[-30%]">
          <h2 className="text-[#FFFFFF] font-[poppins] font-semibold italic pb-2 text-right sm:text-[28px] lg:text-[40px] cursor-pointer">
            Experience Egypt
          </h2>
          <p className="text-[#FFFFFF] font-[poppins] font-normal sm:text-[15px] lg:text-[18px] leading-tight">
            Lorem ipsum dolor, sit amet consectetur, <br />
            adipisicing elit. Accusantium distinctio eumnis <br />
            quos nostrum voluptate obcaecati.
          </p>
        </div>
      </div>
    </div>
  </div>
</div>
      </div>

      {/* start sec 2 */}
      <div className=" mt-20 ">
        <div className=" text-white  bg:z-10 inset-0 bg-[url('/about/33e7c7743775c179156ca6ddaeb40054.png')] bg-cover bg-center ">
          <div className={`${style.bgGradient} bg-opacity-80 inset-0`}>
            <h1
              className={`${style.store} font-semibold sm:text-[40px] lg:text-[48px] text-center sm:py-5`}
            >
              Exclusive store
            </h1>
            <p
              className={`${style.storePara} sm:leading-[50px] lg:leading-[64px] sm:text-[25px] lg:text-[32px] text-center pb-7`}
            >
              At Egypts, we also bring a piece of Egypt to you through our
              <br />
              <span className="font-bold sm:text-[25px] md:text-[30px] lg:text-[32px] text-[#F2C166] text-center">
                {" "}
                exclusive store
              </span>{" "}
              <br />
              At Egypt, we also bring a piece of Egypt to you through our <br/> exclusive store,keeping your memories alive  even after<br/> you've returned home. Explore our unique collection of gifts
            </p>
          </div>
        </div>
      </div>

      {/* start sec 3 */}
      {/* first con */}
      <div className={`${style.padding} lg:pl-20 sm:pl-10 lg:pr-20 sm:pr-10`}>
        <div className=" grid md:grid-cols-1 lg:grid-cols-2 gap-7 mt-16">
          <div className="relative overflow-hidden ">
            <div className="transition-transform duration-1000 hover:scale-110 relative">
              <Image
                className=" object-cover h-[580px] rounded-tr-[32px] rounded-bl-[32px]"
                width={650}
                height={300}
                alt="img3"
                src="/about/72471b95a6b8956b4b5dc9e74f7e1e54.jpg"
              />
              <div className="absolute w-[650px] h-[580px] rounded-tr-[32px] rounded-bl-[32px] inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0)_0%,rgba(0,0,0,0.81)_100%)]"></div>
            </div>
            <div className="absolute top-[65%] left-[10%]">
              <h3
                className={`${style.text} font-bold text-[40px] text-white pb-10`}
              >
                Hotels
              </h3>
              <Link
                className={`${style.btn} bg-[#D9D9D9] hover:bg-[midnightBlue] font-medium text-[32px] text-white px-[40px] py-[10px] bg-[#FFFFFF3D] rounded-md`}
                href="/"
              >
                Discover
              </Link>
            </div>
          </div>
          <div className="relative overflow-hidden">
            <div className="transition-transform duration-1000 hover:scale-110 relative">
              <Image
                className=" object-cover h-[580px] rounded-tr-[32px] rounded-bl-[32px]"
                width={650}
                height={300}
                alt="img3"
                src="/about/b20f25e44653866ec78d4b16f759c86e.jpg"
              />
              <div className="absolute w-[650px] h-[580px] rounded-tr-[32px] rounded-bl-[32px] inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0)_0%,rgba(0,0,0,0.81)_100%)]"></div>
            </div>
            <div className="absolute top-[65%] left-[10%]">
              <h3
                className={`${style.text} font-bold text-[40px] text-white pb-10`}
              >
                Transportaion
              </h3>
              <Link
                className={`${style.btn} bg-[#D9D9D9] hover:bg-[midnightBlue] font-medium text-[32px] text-white  px-[40px] py-[10px] bg-[#FFFFFF3D] rounded-md`}
                href="/"
              >
                Discover
              </Link>
            </div>
          </div>
        </div>

        {/* second con */}
        <div className="col-span-3 mt-20">
          <div className="relative overflow-hidden">
            <div className="transition-transform w-[1350px] duration-1000 hover:scale-110 relative">
              <Image
                className=" object-cover w-[1370px] h-[265px] rounded-tr-[55px] rounded-bl-[32px]"
                width={1350}
                height={300}
                alt="img3"

                src="/about/9eef3cd99631edb845ee2053dd244724.jpg"
              />
              <div className="absolute w-[1350px] h-[265px] rounded-tr-[32px] rounded-bl-[32px] inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0)_0%,rgba(0,0,0,0.81)_100%)]"></div>
            </div>
            <div
              className={`${style.para} absolute  sm:left-[32%] top-[20%] lg:left-[40%]`}
            >
              <h3
                className={`${style.text} font-bold text-[40px] text-white text-center  pb-10`}
              >
                Restaurant
              </h3>
              <Link
                className={`${style.btn} bg-[#D9D9D9] hover:bg-[midnightBlue] font-medium text-[32px] text-white px-[70px] py-[10px] bg-[#FFFFFF3D] rounded-md`}
                href="/"
              >
                Discover
              </Link>
            </div>
          </div>
        </div>

        {/* third con */}
        <div className=" grid md:grid-cols-1 lg:grid-cols-2 gap-7 mt-20">
          <div className="relative overflow-hidden">
            <div className="  transition-transform duration-1000 hover:scale-110 relative">
              <Image
                className=" object-cover  h-[580px] rounded-tr-[32px] rounded-bl-[32px]"
                width={650}
                height={300}
                alt="img3"
                src="/about/1142b925b1658d187b4158496006fe4d.jpg"
              />
              <div className="absolute w-[650px] h-[580px] rounded-tr-[32px] rounded-bl-[32px] inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0)_0%,rgba(0,0,0,0.81)_100%)]"></div>
            </div>
            <div className="absolute top-[65%] left-[10%]">
              <h3
                className={`${style.text} font-bold text-[40px] text-white  pb-10`}
              >
                Event
              </h3>
              <Link
                className={`${style.btn} bg-[#D9D9D9] hover:bg-[midnightBlue] font-medium text-[32px] text-white px-[40px] py-[10px] bg-[#FFFFFF3D] rounded-md`}
                href="/"
              >
                Discover
              </Link>
            </div>
          </div>
          <div className="relative overflow-hidden">
            <div className="transition-transform duration-1000 hover:scale-110 relative">
              <Image
                className=" object-cover  h-[580px] rounded-tr-[32px] rounded-bl-[32px]"
                width={650}
                height={300}
                alt="img3"
                src="/about/6697abef0d646e0d43013065b27ccc06.jpg"
              />
              <div className="absolute w-[650px] h-[580px] rounded-tr-[32px] rounded-bl-[32px] inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0)_0%,rgba(0,0,0,0.81)_100%)]"></div>
            </div>
            <div className="absolute top-[65%] left-[10%]">
              <h3
                className={`${style.text} font-bold text-[40px] text-white pb-10`}
              >
                Store
              </h3>
              <Link
                className={`${style.btn} bg-[#D9D9D9] hover:bg-[midnightBlue] font-medium text-[32px] text-white px-[40px] py-[10px] bg-[#FFFFFF3D] rounded-md`}
                href="/"
              >
                Discover
              </Link>
            </div>
          </div>
        </div>

        {/* forth con */}
        <div className="col-span-3 mt-20 mb-20">
          <div className="relative overflow-hidden">
            <div className="transition-transform duration-1000 hover:scale-110 relative">
              <Image
                className=" object-cover h-[336px] rounded-[32px]"
                width={1350}
                height={300}
                alt="img3"
                src="/about/4cb34068dc0f9be228c2b2535e96804e.jpg"
              />
              <div className="absolute w-[1350px] h-[336px] rounded-[32px] inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0)_0%,rgba(0,0,0,0.81)_100%)]"></div>
            </div>
            <div
              className={`${style.para} absolute top-[30%] sm:left-[32%] lg:left-[40%]`}
            >
              <h3
                className={`${style.text} font-bold sm:text-[30px] sm:ml-5 lg:text-[40px] text-white  pb-10`}
              >
                Up to 50% offer{" "}
              </h3>
              <Link
                className={`${style.btn} bg-[#D9D9D9] hover:bg-[midnightBlue] font-medium text-[32px] text-white px-[70px]  py-[7px] ml-7 bg-[#FFFFFF3D] rounded-md`}
                href="/"
              >
                Book
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
