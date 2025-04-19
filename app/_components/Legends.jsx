"use client";
import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
export default function Legends() {
  const text11="One of the most famous Egyptian legends, this myth tells the story of betrayal, resurrection, and the eternal battle between good and evil. Osiris, the just ruler of Egypt, was betrayed and murdered by his jealous brother Set, who dismembered his body and scattered the pieces. Isis, Osiris’ devoted wife, searched for his remains, reassembled him, and temporarily revived him with magic. Their son, Horus, later avenged his father by defeating Set and reclaiming the throne. Osiris became the ruler of the afterlife, symbolizing resurrection and eternal life."
  const [content, setContent] = useState(text11);
  const [imagesub, setImageSub] = useState("/images/legends/store1.jpeg");
  const [title, setTitle] = useState("The Myth of Osiris, Isis, and Set");
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };


  const buttonsData = [
    {
      id: 1,
      title:
        "1.The Myth of Osiris, Isis, and Set .........................................................................................................................",
      text: "Show",
      imagesub: "/images/legends/store1.jpeg",
      title1: "The Myth of Osiris, Isis, and Set",
      data: "One of the most famous Egyptian legends, this myth tells the story of betrayal, resurrection, and the eternal battle between good and evil. Osiris, the just ruler of Egypt, was betrayed and murdered by his jealous brother Set, who dismembered his body and scattered the pieces. Isis, Osiris’ devoted wife, searched for his remains, reassembled him, and temporarily revived him with magic. Their son, Horus, later avenged his father by defeating Set and reclaiming the throne. Osiris became the ruler of the afterlife, symbolizing resurrection and eternal life.",
    },
    {
      id: 2,
      title:
        "2.The Journey of Ra Through the Underworld ....................................................................................................................",
      text: "Show",
      imagesub: "/images/legends/store1.jpeg",
      data: "بيانات الزر الثاني",
    },
    {
      id: 3,
      title:
        "3.The Creation Myth ..........................................................................................................................................................",
      text: "Show",
      imagesub: "/images/legends/store1.jpeg",
      data: "بيانات الزر الثالث",
    },
    {
      id: 4,
      title:
        "4.The Myth of Osiris, Isis, and Set, Isis, and Set ...................................................................................................................",
      text: "Show",
      imagesub: "/images/legends/store1.jpeg",
      data: "بيانات الزر الرابع",
    },
    {
      id: 5,
      title:
        "5.The Myth of Osiris, Isis, and Set ................................................................................................................................",
      text: "Show",
      imagesub: "/images/legends/store1.jpeg",
      data: "بيانات الزر الخامس",
    },
    {
      id: 6,
      title:
        "6.The Myth of Osiris, Isis, and Set .................................................................................................................................",
      text: "Show",
      imagesub: "/images/legends/store1.jpeg",
      data: "بيانات الزر السادس",
    },
  ];

  return (
    <div className="font-poppins  ">
      <div
        className="flex justify-center items-center w-[1150px] h-[650px] m-auto mt-6 max-[1100px]:hidden  relative "
        style={{
          backgroundImage: "url( '/images/legends/book.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          width: "1150px",
          height: "650px",
        }}
      >
        <div className="absolute flex justify-center h-[90%] top-[130px]  ">
          <div className="relative w-[35%] px-6 top-[-30px] ">
            <Image
              src="/images/legends/i.png"
              alt="وصف الصورة"
              width={100}
              height={100}
              className="absolute lg:right-[95%] overflow-hidden left-[30px] top-[-110px] w-[100px] h-[150px]"
            />
            <h3
              className="font-bold text-sm"
              style={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)" }}
            >
              Tales carved on temple walls, secrets that have endured for
              millennia… Step into the world of the pharaohs, where gods speak,
              spirits rise, and magic rules the cosmos!
            </h3>
            <div>
              <h4 className="font-semibold my-5">Egyptian Legends</h4>
              <div>
                {buttonsData.map((btn) => (
                  <div
                    key={btn.id}
                    className="flex justify-between items-center mb-2 "
                  >
                    <p className="text-[12px] overflow-hidden w-[305px] text-[#020032] text-nowrap">
                      {btn.title}
                    </p>
                    <button
                      onClick={() => {
                        setContent(btn.data);
                        setImageSub(btn.imagesub);
                        setTitle(btn.title1);
                      }}
                      className="px-2 text-[10px] py-1 bg-[#020032] text-[#C7A552] rounded-3xl hover:bg-[#02003293]"
                    >
                      {btn.text}
                    </button>
                  </div>
                ))}
              </div>
            </div>
            <Image
              src="/images/legends/f.png"
              alt="وصف الصورة"
              width={100}
              height={100}
              className="absolute  overflow-hidden left-[-30px] bottom-[110px] w-[80px] scale-x-[-1] opacity-75 rotate-45 h-[100px]"
            />
          </div>
          <div className="w-[32%] max-w-md pl-4  relative top-[-30px]  text-center h-fit">
            <Image
              src="/images/legends/f.png"
              alt="وصف الصورة"
              width={80}
              height={80}
              className="absolute right-[-30px] overflow-hidden top-[-110px] w-[80px] h-[100px] opacity-75 -rotate-45 "
            />
            <div className="relative h-[100%">
              <div className="flex justify-center items-center">
                <Image
                  src={imagesub}
                  alt="Legend Image"
                  width={200}
                  height={400}
                  className="h-[200px] rounded-md"
                />
                <h1 className="font-bold pl-1 text-[20px] my-2">{title}</h1>
              </div>
              <p className=" py-4 text-left text-[13px]">{content}</p>
              
            </div>
          </div>
        </div>
      </div>
      <div
        className="flex justify-center items-center max-w-[1101px] hidden  mt-[60px] m-auto max-[1100px]:block relative "
        
      >
        <div className=" flex-col justify-center w-[100%] h-[90%] top-[130px]  ">
          <div className="relative w-[60%]  py-5  mx-5 m rounded-[30px] px-6 top-[-30px] "
              style={{
                backgroundImage: "url( '/images/legends/background1.jpg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                width: "80%",
                height: "700px",
                borderRadius:"30px",
                border:"3px black solid"
              }}
          >
            <Image
              src="/images/legends/i.png"
              alt="وصف الصورة"
              width={50}
              height={50}
              className="absolute lg:right-[95%] overflow-hidden left-[5px] top-[-10px] w-[50px] h-[70px]"
            />
            <h3
              className="font-bold  text-[13px] md:text-[18px] pt-[50px]  sm:w-[80%] m-auto w-auto"
              style={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)" }}
            >
              Tales carved on temple walls, secrets that have endured for
              millennia… Step into the world of the pharaohs, where gods speak,
              spirits rise, and magic rules the cosmos!
            </h3>
            <div>
              <h4 className="font-semibold my-5 sm:w-[80%] m-auto w-auto">Egyptian Legends</h4>
              <div>
                {buttonsData.map((btn) => (
                  <div
                    key={btn.id}
                    className="flex justify-between items-center mb-2 w-[100%]  m-auto sm:w-[80%] "
                  >
                    <p className="text-[8px] md:text-[18px] overflow-hidden max-w-[520px] text-[#020032] text-nowrap">
                      {btn.title}
                    </p>
                    <button
                      onClick={() => {
                        setContent(btn.data);
                        setImageSub(btn.imagesub);
                        setTitle(btn.title1);
                      }}
                      className="px-2 text-[8px] sm:text-[15px] py-1 bg-[#020032] text-[#C7A552] rounded-3xl hover:bg-[#02003293]"
                    >
                      {btn.text}
                    </button>
                  </div>
                ))}
              </div>
            </div>
            <Image
              src="/images/legends/f.png"
              alt="وصف الصورة"
              width={100}
              height={100}
              className="absolute  overflow-hidden left-[-0px] z-50 bottom-[10px] w-[80px] scale-x-[-1] opacity-75 rotate-45 h-[100px]"
            />
          </div>
          <div className="w-[60%] pl-1 mr-5 relative top-[-100px] right-[-15%] text-center h-fit" style={{
              backgroundImage: "url( '/images/legends/background1.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              width: "80%",
              height: "650px",
              borderRadius:"30px",
              border:"3px black solid"
            }}>
            {/* <Image
              src="/images/legends/f.png"
              alt="وصف الصورة"
              width={80}
              height={80}
              className="absolute right-[-30px] overflow-hidden top-[-110px] w-[80px] h-[100px] opacity-75 -rotate-45 "
            /> */}
            <div className="relative h-[100%]">
              <div className="flex flex-col justify-center items-center">
                <Image
                  src={imagesub}
                  alt="Legend Image"
                  width={200}
                  height={400}
                  className="h-[200px] rounded-md w-[85%] mt-10"
                />
                <h1 className="font-bold pl-6  text-[15px] text-left sm:text-[25px] my-2">{title}</h1>
              </div>
              <p className=" py-4 sm:px-12 text-left sm:text-[16px] px-4  text-[11px]">{content}</p>
              
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4"></div>
    </div>



  );
}
