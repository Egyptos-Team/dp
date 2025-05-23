"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import "swiper/css";
import "swiper/css/grid";
import { PhotoIcon } from "@heroicons/react/24/outline";
import SearchIcon from "@mui/icons-material/Search";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import CategoryFilter from "../explore/CategoryFilter";
import ProductSlider from "../explore/ProductSlider";

const Historic = () => {
  const [historicalData, setHistoricalData] = useState([]);
  const [search, setSearch] = useState("");
  const [count, setCount] = useState(8);
  const [selectedTitle, setSelectedTitle] = useState("");
  useEffect(() => {
    async function fetchData() {
      try {
        const req = await fetch("https://egyptos.runasp.net/api/Historical/GetAll");
        const data = await req.json();
        setHistoricalData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, []);

  const filteredData = historicalData.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      {/* Search Section */}
      <h2 className="text-black/90 flex justify-center items-center font-bold mt-5 mb-4 text-xl sm:text-2xl">
        Discover Our Story
      </h2>
      <div className="relative w-full max-w-xs sm:max-w-md mx-auto">
        <SearchIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-blue-500" />
        <input
          type="text"
          placeholder="Search for Historic area"
          className="border pl-12 pr-4 py-2 w-full rounded-full border-gray-300 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-center py-5">
        <div className="text-center sm:text-left">
          <h1 className="text-3xl sm:text-5xl font-semibold text-black tracking-wide">
            Historic Area
          </h1>
          <span className="text-sm sm:text-xl text-gray-400 mt-2">
            Welcome to traps <strong className="text-black">Historic area</strong>
          </span>
        </div>
        <p className="text-gray-400 mt-4 sm:mt-0 text-sm sm:text-base">
          Total num: {historicalData.length}
        </p>
      </div>

      {/* Historic Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  container mx-auto auto-rows-[1fr]">
        {filteredData.slice(0, count).map((item) => (
          <div key={item.id} className="p-4 shadow  rounded-lg relative cursor-pointer flex flex-col items-center">
            <div className="w-full h-[170px]  sm:h-[200px] md:h-[250px] flex items-center justify-center overflow-hidden rounded-lg">
              <Image
                src={`https://egyptos.runasp.net/${item.imageUrl}`}
                alt={item.title}
                width={1}
                height={150}
                unoptimized={true}
                className="w-full h-full object-fill rounded-xl"
              />
            </div>
            <div className="absolute inset-0  flex flex-col justify-end items-start text-white py-6 px-11 rounded-2xl">
              <h2 className="text-sm sm:text-lg font-extrabold">{item.title}</h2>
              <h6 className="text-gray-300 mt-1 text-xs sm:text-sm">{item.date}</h6>
              <div className="flex justify-between items-center w-full mt-3">
                <Link href={`/explore/historic/${item.id}`} className="flex items-center">
                  <button className="bg-white/35 text-white text-xs sm:text-sm px-4 py-2 hover:bg-black/60 rounded w-[99.5px] h-[47px]">
                    View
                    <ArrowOutwardIcon className="ml-1 mt-[-5px] text-xs sm:text-base" />
                  </button>
                </Link>
                <PhotoIcon className="w-6 h-6 text-white font-bold hover:text-black/60" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Load More Button */}
      {count < historicalData.length && (
        <button
          className="mt-8 p-[10px] text-white bg-[#0C0A42] font-medium mx-auto flex items-center justify-center rounded w-[319px] sm:w-80 h-[50px] sm:h-12 hover:bg-black/70 hover:text-white transition text-sm sm:text-base"
          onClick={() => setCount((prev) => prev + 8)}
        >
          Explore more
        </button>
      )}

      {/* Gallery Section */}
      <div className=" w-[100%] md:w-[95%] m-auto mt-10 ">
        <div className="flex flex-col sm:flex-row justify-between items-center">
          <div className="text-center sm:text-left">
            <h1 className="text-xl sm:text-3xl font-semibold text-black">Our Gallery</h1>
            <span className="text-sm sm:text-lg text-gray-400">
              Welcome to traps For Our Gallery
            </span>
          </div>
          <CategoryFilter  onSelectTitle={setSelectedTitle} />
        </div>
        <ProductSlider selectedTitle={selectedTitle} />
      </div>
    </div>
  );
};

export default Historic;
