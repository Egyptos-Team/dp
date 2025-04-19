import Image from "next/image";
import React from "react";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

export default function Card({ transport }: { transport: any }) {
  return (
    <div className= "mx-auto h-[567px] w-[350px] md:w-[370px] border-[2px] rounded-lg"  style={{ boxShadow: "4px 4px 2px 0px rgba(0, 0, 0, 0.4)" }}>
      <div className="h-[255px] w-[350px] md:w-[370px] overflow-hidden">
        {" "}
        <Image
          src={`https://egyptos.runasp.net/${transport.imageUrl}`}
          height={230}
          width={390}
          unoptimized
          alt={transport.name}
          className="w-full h-[255px] object-cover rounded-lg "
        />
      </div>
      <div className="pl-4 py-4 ">
        <div className=" flex justify-between items-center">
          <h2 className=" font-bold text-[32px]">{transport.name.slice(0,12)}</h2>

          <div
            className="flex justify-center items-center bg-[#df3c20] text-white font-bold px-5 py-1 text-lg"
            style={{
              clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%, 28% 50%)",
            }}
          >
            ${transport.pricePerHour}
          </div>
        </div>
      </div>
      <div className="pl-4 pt-2 ">
        <h3 className="py-2">
          <span className="text-[#df3c20]  pr-2 font-bold">DESCRIPTION:</span>
          {transport.description.slice(0,70)}
        </h3>
        <p className="font-semibold pb-2">
          <span className="text-[#df3c20] pr-2 font-bold">CAPACITY: </span>
          {transport.capacity} Persons
        </p>
        <p className="font-semibold pb-2">
          <span className="text-[#df3c20] pr-3 font-bold">QUANTITY: </span>
          {transport.capacity}{" "}
        </p>
        <button className=" absolute py-3 flex justify-start items-center gap-5">
          {" "}
          <div className="w-7 h-7  bg-[#df3c20] font-bold text-white rounded-full flex justify-center items-center">
            <ArrowForwardIcon />
          </div>
          <p className=" uppercase underline text-[#df3c20] font-bold">book now</p>
        </button>
      </div>
    </div>
  );
}
