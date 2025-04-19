"use client"
import Image from "next/image";
import React, { useState } from "react";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import RideForm from "./FormTest"; 

export default function Card({ transport,data }: { transport: any,data:any }) {
  const [isModalOpen, setIsModalOpen] = useState(false); 

  return (
    <div className="relative mx-auto h-[567px] w-[340px] md:w-[340px] border-[2px] rounded-lg" style={{ boxShadow: "4px 4px 2px 0px rgba(0, 0, 0, 0.4)" }}>
   
      <div className="h-[255px] w-[340px] md:w-[340px] overflow-hidden">
        <Image
          src={`https://egyptos.runasp.net/${transport.imageUrl}`}
          height={230}
          width={390}
          unoptimized
          alt={transport.name}
          className="w-full h-[255px] object-cover rounded-lg"
        />
      </div>

      
      <div className="pl-4 py-4">
        <div className="flex justify-between items-center">
          <h2 className="font-bold text-[32px]">{transport.name.slice(0, 12)}</h2>

          <div
            className="flex justify-center items-center bg-[#df3c20] text-white font-bold px-5 py-1 text-lg"
            style={{ clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%, 28% 50%)" }}
          >
            ${transport.pricePerHour}
          </div>
        </div>
      </div>

      <div className="pl-4 pt-2">
        <h3 className="py-2">
          <span className="text-[#df3c20] pr-2 font-bold">DESCRIPTION:</span>
          {transport.description.slice(0, 70)}
        </h3>
        <p className="font-semibold pb-2">
          <span className="text-[#df3c20] pr-2 font-bold">CAPACITY: </span>
          {transport.capacity} Persons
        </p>
        <p className="font-semibold pb-2">
          <span className="text-[#df3c20] pr-3 font-bold">QUANTITY: </span>
          {transport.quantity}{" "}
        </p>
        
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex justify-start items-center gap-5 mt-3  text-white px-4 py-2 rounded-lg font-bold"
        >
         <div className="w-7 h-7  bg-[#df3c20] font-bold text-white rounded-full flex justify-center items-center">
            <ArrowForwardIcon />
          </div>
          <p className="uppercase underline text-[#df3c20] font-bold">Book Now</p>
        </button>
      </div>

   
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex mt-[110px] justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-[95%] md:w-[60%] lg:w-[70%] xl:w-[60%] max-h-[80vh] overflow-auto shadow-lg relative">
       
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-2 right-2 text-red-600 text-xl font-bold"
            >
              ✖
            </button>

        
            <RideForm vehicleType={data} vehicleName={transport.name} vehicleID={transport.id} />
          </div>
        </div>
      )}
    </div>
  );
}
