import React from "react";
import Image from "next/image";
import Legends from "../../_components/Legends";
import { ChatBubbleLeftIcon } from "@heroicons/react/24/outline";
export default function page() {
  return (
    <div
      className="py-[130px]  font-poppins "
      style={{
        backgroundImage: "url( '/images/legends/background.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        width: "100%",
      }}
    >
      <div className="flex flex-col items-center justify-center">
        <div className="flex  lg:w-[90%] items-center justify-center">
          <div className=" bg-[#020032] mx-4 max-w-[650px] relative text-white lg:px-10 pr-20  text-[10px] md:text-[16px]  px-2 py-8 rounded-tl-[50px]  ">
            <div className="absolute right-[-260px] top-[-110px] max-[1180px]:hidden">
              <ChatBubbleLeftIcon className="w-[150px] h-[150px]   text-white " />
              <p className=" absolute text-[8px] px-5 left-1 top-[40px] ">"I am the Egyptian writer, and now I will tell you historical stories and legends."</p>
            </div>
            <Image
              src="/images/legends/1f.png"
              alt="وصف الصورة"
              width={300}
              height={400}
              className="   absolute lg:right-[95%] overflow-hidden right-[0px] bottom-1 0 w-[100px] h-[100px] lg:w-[300px] lg:h-[300px]"
            />
            "In the land of the pharaohs, where walls whisper stories carved
            thousands of years ago, life was more than just reality—it was a
            world filled with magic, gods, and mysterious curses. In Ancient
            Egypt, everything had a story, and every phenomenon had a mythical
            explanation—from the sun rising in Ra’s celestial boat to Horus
            avenging his father against Set, and the deadly curses inscribed on
            the tombs of kings. Among the secrets of temples and the corridors
            of pyramids, the Egyptians lived in a world where life revolved
            around pleasing the gods, seeking immortality, and the eternal
            battle between good and evil. What secrets do these myths hold? And
            which mysteries are still waiting to be uncovered?"
            <Image
              src="/images/legends/2.png"
              alt="وصف الصورة"
              width={300}
              height={300}
              className="  absolute lg:right-[-250px] bottom-6 overflow-hidden z-10 right-[0px] top-1  w-[100px] h-[100px] lg:w-[300px] lg:h-[300px] "
            />
          </div>
        </div>

        <Image
          src="/images/legends/arrow.png"
          alt="وصف الصورة"
          width={100}
          height={400}
          className=" text-center -rotate-12 md:w-[500px] w-[300px] "
        />
      </div>
      <Legends />

      <div className="mt-[150px] ">
        <h3 className="pl-16 py-6 text-[#FFFFFF] font-bold m-auto">"The characters of Legend"</h3>
        <div className="flex justify-between items-center flex-col  lg:flex-row">
          <div className="w-[280px] m-auto text-[#757575] bg-[#020032] rounded-xl border  p-5">
            <Image
              src="/images/legends/card1.jpeg"
              alt="وصف الصورة"
              width={100}
              height={400}
              className=" text-center md:w-[280px] w-[280px] "
            />
            <h3 className="text-[25px] text-[#E19F26] py-2 font-semibold ">
              Goddess Isis
            </h3>
            <p>
              was one of the most important deities in Ancient Egyptian
              mythology. She was the goddess of magic, healing, motherhood, and
              protection.
            </p>
          </div>
          <Image
            src="/images/legends/key.png"
            alt="وصف الصورة"
            width={100}
            height={200}
            className=" text-center h-[200px] md:w-[150px] w-[150px] p-2  "
          />
          <div className="w-[280px] m-auto text-[#757575] bg-[#020032] rounded-xl border  p-5">
            <Image
              src="/images/legends/card2.png"
              alt="وصف الصورة"
              width={100}
              height={200}
              className=" text-center h-[200px] md:w-[280px] w-[280px] "
            />
            <h3 className="text-[25px] text-[#E19F26] py-2 font-semibold ">
              God Osiris
            </h3>
            <p>
              was one of the most significant deities in Ancient Egyptian mythology, known as the god of the afterlife, resurrection, and fertility.
            </p>
          </div>
          <Image
            src="/images/legends/key.png"
            alt="وصف الصورة"
            width={100}
            height={200}
            className=" text-center h-[200px] md:w-[150px] w-[150px] p-2  "
          />
          <div className="w-[280px] m-auto text-[#757575] bg-[#020032] rounded-xl border  p-5">
            <Image
              src="/images/legends/card3.png"
              alt="وصف الصورة"
              width={100}
              height={200}
              className=" text-center h-[200px] md:w-[280px] w-[280px] "
            />
            <h3 className="text-[25px] text-[#E19F26] py-2 font-semibold ">
              God Set
            </h3>
            <p>
              was the Ancient Egyptian god of chaos, storms, war, and disorder. He played both villainous and protective roles in Egyptian mythology.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
