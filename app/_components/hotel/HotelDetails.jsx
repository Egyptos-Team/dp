"use client";
import { useState, useEffect } from "react";
import { usePathname, } from "next/navigation";

import { motion } from "framer-motion";
import Image from "next/image";
import {  FaPhone, FaFacebook } from "react-icons/fa";
import { HiLocationMarker } from "react-icons/hi";
import { BsCurrencyDollar } from "react-icons/bs";
import { MdLocationCity } from "react-icons/md";
import { AiOutlineLink } from "react-icons/ai";

const HotelDetails = () => {
 
  const pathname = usePathname();
  const id = pathname.split("/").pop();

  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchHotel = async () => {
      try {
        const res = await fetch(
          `https://egyptos.runasp.net/api/Hotels/Get/${id}`
        );
        if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
        const data = await res.json();
        setHotel(data);
      } catch (error) {
        console.error("Error fetching hotel details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHotel();
  }, [id]);

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!hotel) return <p className="text-center mt-10">Hotel not found.</p>;

  return (
    <div className="flex flex-col w-[90%] justify-between m-auto pt-7  md:flex-row p-5 gap-5">
      {/* النص والموقع */}
      <div className="w-[100%] md:w-[46%]">
        <div>
          <div
            className="p-6 bg-cover bg-center relative rounded-lg shadow-lg mb-5"
            style={{ backgroundImage: "url('/images/bh1.png')" }}
          >
            <div className="absolute top-0 left-0 w-full h-full bg-[#EBD778] opacity-85"></div>
            <p className="relative font-ravi lg:text-[45px] text-[20px] sm:text-[30px]  font-semibold text-center z-10">
              {hotel.name}
            </p>
          </div>

          <div className="bg-[#020032] text-golden p-8 rounded-xl shadow-lg relative">
            <h2 className="text-2xl font-light mb-4">About hotel</h2>

            <div className="w-[70%] max-[700px]:w-full leading-tight relative ">
              {" "}
              
              <div className="flex items-center space-x-3 mb-5">
                <div className="bg-[#EBD778] p-2 rounded-sm">
                  <HiLocationMarker className="text-[#020032] text-xl" />
                </div>
                <p>{hotel.locationName}</p>
              </div>
              
              <a
                href={`https://www.google.com/maps/search/?q=${hotel.address}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-3 mb-5 cursor-pointer hover:underline"
              >
                <div className="bg-[#EBD778] p-2 rounded-sm">
                  <MdLocationCity className="text-[#020032] text-xl" />
                </div>
                <p>{hotel.address}</p>
              </a>
              
              <a
                href={hotel.webSite}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-3 mb-5 cursor-pointer hover:underline"
              >
                <div className="bg-[#EBD778] p-2 rounded-sm">
                  <AiOutlineLink className="text-[#020032] text-xl" />
                </div>
                <p className="truncate">{hotel.webSite}</p>
              </a>
              
              <a
                href={`tel:${hotel.phoneNumber}`}
                className="flex items-center space-x-3 mb-5 cursor-pointer hover:underline"
              >
                <div className="bg-[#EBD778] p-2 rounded-sm">
                  <FaPhone className="text-[#020032] text-xl" />
                </div>
                <p>{hotel.phoneNumber}</p>
              </a>
              
              <a
                href={hotel.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-3 mb-5 cursor-pointer hover:underline"
              >
                <div className="bg-[#EBD778] p-2 rounded-sm">
                  <FaFacebook className="text-[#020032] text-xl" />
                </div>
                <p className="truncate">{hotel.facebook}</p>
              </a>
              
              <div className="flex items-center space-x-5">
                <div className="bg-[#EBD778] p-2 rounded-sm">
                  <BsCurrencyDollar className="text-[#020032] text-xl" />
                </div>
                <p className="flex items-center gap-2">
                  {hotel.pricePerHour} EP{" "}
                  <span className="text-[12px] font-thin text-[#d9d9d9a5]">
                    (price per hour)
                  </span>
                </p>
              </div>{" "}
            </div>
            <motion.div
              className="absolute top-[20px] w-fit left-[80%] max-[1000px]:hidden h-full flex flex-col items-center"
              animate={{ x: [-40, 40, -40] }} 
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }} 
            >
              
              <div className="w-[2px] bg-[#EBD778] relative top-[-20px] left-[-4px] h-[110px]"></div>

              
              <Image
                src={`../../../images/key1.png`}
                width={450}
                height={300}
                alt="Key Image"
                unoptimized
                className="object-cover w-[100px] h-[100px] relative top-[-35px] max-[1000px]:w-[50px]"
              />
            </motion.div>
          </div>
        </div>
        <div className="my-5 max-[768px]:hidden">
          <iframe
            src={hotel.location}
            width="100%"
            height="400"
            className="rounded-lg shadow-lg"
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
      </div>

      
      <div className="w-[100%] md:w-[46%] pb-6 flex min-h-[400px] justify-center">
        <Image
          src={`https://egyptos.runasp.net/${hotel.imageUrl}`}
          width={450}
          height={300}
          alt={hotel.name}
          unoptimized
          className="object-cover   w-[100%] "
        />
      </div>
      <div className="my-5 max-[768px]:block hidden">
        <iframe
          src={hotel.location}
          width="100%"
          height="400"
          className="rounded-lg shadow-lg"
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      </div>
    </div>
  );
};

export default HotelDetails;
