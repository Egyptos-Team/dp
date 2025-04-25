"use client";
import { useEffect, useState } from "react";

const images = [
  "/home/slid1.jpg",
  "/home/slid2.jpg",
  "/home/slid3.jpg",
  "/home/slid4.jpg",
  "/home/slid5.jpg",
];

export default function MainSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

 
  const [heights, setHeights] = useState({
    left0: 0,
    left50: 0,
    left75: 0,
  });
  const [durations, setDurations] = useState({
    left0: "1s",
    left50: "1s",
    left75: "1s",
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setHeights({ left0: 0, left50: 0, left75: 0 });
    setDurations({ left0: "1s", left50: "1s", left75: "1s" });

    const upTimeout = setTimeout(() => {
      setHeights({ left0: 200, left50: 200, left75: 200 });
    }, 100);

    const downTimeout = setTimeout(() => {
      setHeights({ left0: 0, left50: 0, left75: 0 });
      setDurations({ left0: "0.05s", left50: "0.05s", left75: "0.05s" });
    }, 2950);

    return () => {
      clearTimeout(upTimeout);
      clearTimeout(downTimeout);
    };
  }, [currentIndex]);

  return (
   <div  className="w-[95%] m-auto">
        <h2 className=" text-[20px] font-poppins font-semibold mt-5 md:text-[30px] ">Inspiring. Adventurous. Explorative</h2>
        <p className="text-[10px] text-[#767789] mb-12  ">An inspiring platform to explore the rich culture, ancient wonders, and adventurous spirit of Egypt</p>
     <div className="mt-5 h-[500px] overflow-hidden relative">
      <img
        src={images[currentIndex]}
        alt={`Slide ${currentIndex + 1}`}
        className="w-full h-full object-bottom transition-all duration-1000"
      />

      <div>
        <div className="h-[500px] absolute w-2 bg-white z-40 left-[25%] top-0"></div>
        <div className="h-[500px] absolute w-2 bg-white z-40 left-[50%] top-0"></div>
        <div className="h-[500px] absolute w-2 bg-white z-40 left-[75%] top-0"></div>

        
        <div
          className="absolute w-[25%] bg-white z-10 left-[0] bottom-0 transition-all ease-in-out"
          style={{
            height: `${heights.left0}px`,
            transitionDuration: durations.left0,
          }}
        ></div>

       
        <div
          className="absolute w-[25%] bg-white z-10 left-[50%] top-0 transition-all ease-in-out"
          style={{
            height: `${heights.left50}px`,
            transitionDuration: durations.left50,
          }}
        ></div>

      
        <div
          className="absolute w-[25%] bg-white z-10 left-[75%] top-[30%] transition-all ease-in-out"
          style={{
            height: `${heights.left75}px`,
            transitionDuration: durations.left75,
          }}
        ></div>
      </div>
    </div>
   </div>
  );
}
