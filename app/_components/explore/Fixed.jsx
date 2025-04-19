"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import SearchIcon from "@mui/icons-material/Search";
import TuneIcon from "@mui/icons-material/Tune";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import { MapPinIcon, XMarkIcon } from "@heroicons/react/24/solid"; 
import { PhotoIcon } from "@heroicons/react/24/outline";

const MapModal = ({ location, onClose }) => (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
    <div className="relative bg-white rounded-lg shadow-lg w-[90%] max-w-2xl">
      <button className="absolute top-3 right-3 text-gray-700 hover:text-black" onClick={onClose}>
        <XMarkIcon className="w-6 h-6" />
      </button>
      <iframe
        src={location}
        width="100%"
        height="400"
        style={{ border: 0 }}
        allowFullScreen=""
        loading="lazy"
      ></iframe>
    </div>
  </div>
);
const Fixed = () => {
  const [search, setSearch] = useState("");
  const [count, setCount] = useState(16);
  const [products, setProducts] = useState([]);
  const [selectedName, setSelectedName] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [hovered, setHovered] = useState(null);
  const [isMapOpen, setIsMapOpen] = useState(false);
  const [mapLocation, setMapLocation] = useState("");
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          "https://egyptos.runasp.net/api/AreaTypes/Get/1"
        );
        const areas = response.data.areas.map((area) => ({
          id: area.id,
          title: area.name,
          description: area.description,
          location:area.location,
          image: `https://egyptos.runasp.net/${area.areaImages[0]?.imageUrl}`,
        }));
        setProducts(areas);
        setFilteredData(areas);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, []);

  const uniqueNames = [...new Set(products.map((item) => item.title))];

  useEffect(() => {
    let filtered = products.filter((item) =>
      item.title.toLowerCase().includes(search.toLowerCase())
    );
    if (selectedName) {
      filtered = filtered.filter((item) => item.title === selectedName);
    }
    setFilteredData(filtered);
  }, [search, selectedName, products]);

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-black/90 text-center font-bold mt-7 mb-4 text-2xl">
        Discover Our Artifacts
      </h2>

      <div className="relative max-w-md mx-auto">
        <SearchIcon className="absolute left-3 top-4 text-gray-500 hover:text-blue-500" />
        <input
          type="text"
          placeholder="Search for fixed artifacts"
          className="border px-10 w-full h-[50px] rounded-full border-gray-300 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => setSearch(e.target.value)}
        />
        <TuneIcon className="absolute right-3 top-4 text-gray-500 hover:text-blue-500" />
      </div>

      <div className="flex flex-col lg:flex-row justify-between items-center py-7">
        <div>
          <h1 className="text-3xl lg:text-5xl font-semibold tracking-wide">
            Fixed Artifacts
          </h1>
          <span className="text-xl text-gray-400">Welcome to Artifacts</span>
        </div>
        <div>
          <select
            className="cursor-pointer border w-60 py-2 px-4 rounded-md shadow-md"
            value={selectedName}
            onChange={(e) => setSelectedName(e.target.value)}
          >
            <option value="">All Fixed Artifacts</option>
            {uniqueNames.map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 container mx-auto auto-rows-[1fr]">
        {filteredData.slice(0, count).map((item) => (
          <div
            key={item.id}
            className="p-4 shadow rounded-lg relative cursor-pointer flex flex-col items-center"
          >
            <div className="w-full h-[160px]  md:h-[250px]  flex items-center justify-center overflow-hidden rounded-lg">
              <Image
                src={item.image}
                alt={item.title}
                fill
                unoptimized
                className="w-full h-[160px] rounded-lg object-cover"
              />
            </div>
            <div className="absolute inset-0   flex flex-col justify-end items-start text-white py-6 px-3 rounded-2xl">
              <h2 className="text-sm sm:text-lg font-bold">{item.title}</h2>
              {/* <h6 className="text-white mt-2 text-xs sm:text-sm">{item.description.slice(0, 60)}...</h6> */}
              <div className="flex justify-between items-center w-full mt-3">
                <Link href={`/explore/fixed-area/${item.id}`} className="flex items-center">
                  <button className="bg-white/35 text-white text-xs sm:text-sm px-4 py-2 hover:bg-black/60 rounded w-[99.5px] h-[47px]">
                    View
                    <ArrowOutwardIcon className="ml-1 mt-[-5px] text-xs sm:text-base" />
                  </button>
                </Link>
                {item.location && (
                  <button onClick={() => { setMapLocation(item.location); setIsMapOpen(true); }}>
                    <MapPinIcon className="w-6 h-6 text-white hover:text-gray-500" />
                  </button>
                )}
              </div>
            </div>
            {isMapOpen && <MapModal location={mapLocation} onClose={() => setIsMapOpen(false)} />}
          </div>
        ))}
      </div>

      {count < filteredData.length && (
        <button
          className="mt-8 p-[10px] text-white bg-[#0C0A42] font-medium mx-auto flex items-center justify-center rounded w-[319px] sm:w-80 h-[50px] sm:h-12 hover:bg-black/70 hover:text-white transition text-sm sm:text-base"
          onClick={() => setCount((prev) => prev + 16)}
        >
          Explore more
        </button>
      )}

      <div className="container mx-auto px-4 py-10">
        <h2 className="text-center text-3xl font-bold mb-6">Did you know?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {products.slice(0, 3).map((product) => (
            <div
              key={product.id}
              className="relative w-full h-[400px] overflow-hidden cursor-pointer transition-transform duration-300 hover:scale-105"
              onMouseEnter={() => setHovered(product.id)}
              onMouseLeave={() => setHovered(null)}
            >
              <Image
                src={product.image}
                alt={product.title}
                layout="fill"
                objectFit="fill"
                unoptimized
                className="rounded-lg transition-opacity duration-500"
              />
              <div
                className={`absolute inset-0 bg-black transition-opacity duration-500 flex items-end text-white px-6 rounded-lg ${
                  hovered === product.id ? "opacity-50" : "opacity-0"
                }`}
              />
              <div
                className={`absolute bottom-0 left-0 w-full px-6 py-4 text-lg font-semibold text-white transition-transform duration-700 ${
                  hovered === product.id ? "translate-y-0" : "translate-y-full"
                }`}
              >
                <div className="flex items-center gap-4">
                  <p className="text-lg font-semibold text-white">
                    {product.description.slice(0, 170)}
                  </p>
                  <PhotoIcon className="w-[150px] h-[150px] text-white" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Fixed;
