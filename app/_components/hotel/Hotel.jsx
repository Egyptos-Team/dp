"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { FunnelIcon } from "@heroicons/react/24/solid";
import {
  FaSnowflake,
  FaUtensils,
  FaWifi,
  FaFacebookF,
  FaSwimmer,
  FaSearch,
  FaGlobe,
} from "react-icons/fa";
import StarRating from "../StarRating";
import { motion } from "framer-motion";
import Image from "next/image";

export default function Hotel() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(12);
  const [filters, setFilters] = useState({
    price: "",
    experience: "",
    rating: "",
    name: "",
  });
  const [showFilters, setShowFilters] = useState(false);
  const [topThree, setTopThree] = useState([]);

  const governorates = [
    "Cairo",
    "Alexandria",
    "Giza",
    "Port Said",
    "Suez",
    "Ismailia",
    "Luxor",
    "Aswan",
    "Asyut",
    "Mansoura",
    "Tanta",
    "Fayoum",
    "Zagazig",
    "Damietta",
    "Minya",
    "Beni Suef",
    "Qena",
    "Sohag",
    "Hurghada",
    "Sharm El-Sheikh",
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("https://egyptos.runasp.net/api/Hotels/GetAll");
        const result = await res.json();
        const sortedTopThree = result
          .sort((a, b) => b.rate - a.rate)
          .slice(0, 4);
        setData(result || []);
        setTopThree(sortedTopThree);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const loadMore = () => setVisibleCount((prev) => prev + 4);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const filteredData = data.filter(
    (item) =>
      (!filters.price || item?.salaryPerHour <= filters.price) &&
      (!filters.locationName || item?.locationName === filters.locationName) &&
      (!filters.rating || item?.rate >= filters.rating) &&
      (!filters.name ||
        item?.name
          ?.toLowerCase()
          .includes(filters.name.toLowerCase()))
  );

  if (loading) return <p>Loading...</p>;

  return (
    <div className="">
      <div className="flex  relative flex-col w-[100%]  mb-8 md:flex-row justify-between items-center  gap-3">
        <div className="w-full h-[500px] relative">
          <Image
            src="/images/background.png"
            fill
            alt="slide-image"
            className="h-full w-full object-cover"
          />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-center">
            <h1 className="md:text-[45px] text-[25px] font-poppins">
              Explore Egypt with the Best Tour Guides!
            </h1>
          </div>
        </div>

        <div className="flex absolute   z-10 top-0 flex-col-reverse w-[100%] m-auto my-6 mb-8 md:flex-row justify-between  items-end p-4 gap-3">
          <div className="relative w-full min-w-[300px] sm:w-auto max-w-md lg:max-w-none">
            <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              name="name"
              placeholder="Search for Guide"
              onChange={handleFilterChange}
              className="border border-black px-2 py-2 pr-10 pl-4 rounded-3xl w-full outline-none"
            />
          </div>
          <div className="relative flex justify-end w-[70%]">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 ] text-white px-4 py-2 rounded-lg shadow-md hover:bg-[#020032ba] transition"
            >
              <FunnelIcon className="w-5 h-5  " />
            </button>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="absolute right-0 top-12 mt-2 p-3 bg-white shadow-lg rounded-lg grid grid-cols-1 border z-10 w-auto"
              >
                <input
                  type="number"
                  name="price"
                  placeholder="Max Price"
                  onChange={handleFilterChange}
                  className="border p-2 rounded-md w-full"
                />
                <select
                  name="locationName"
                  onChange={handleFilterChange}
                  className="w-full p-3 border rounded"
                >
                  <option value="">Select Governorate</option>
                  {governorates.map((gov) => (
                    <option key={gov} value={gov}>
                      {gov}
                    </option>
                  ))}
                </select>

                <input
                  type="number"
                  name="rating"
                  placeholder="Min Rating"
                  onChange={handleFilterChange}
                  className="border p-2 rounded-md w-full"
                />
              </motion.div>
            )}
          </div>
        </div>
      </div>
      {filteredData.length === 0 && (
        <p className="mt-4 text-gray-500 text-center">
          The search results did not appear
        </p>
      )}
      <div className="grid w-[85%] relative top-[-120px] pb-3 m-auto grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-8 md:gap-5">
        {filteredData.slice(0, visibleCount).map((item) => (
          <motion.div
            key={item?.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            viewport={{ once: true }}
          >
            <div className=" block  shadow-lg hover:shadow-xl transition duration-300 transform hover:-translate-y-1 hover:scale-105">
              <Link href={`/services/hotel/${item?.id || "#"}`}>
                <div className="p-5  bg-[#020032] font-poppins   text-[#EBD778]">
                  <h1 className="h-[55px] flex items-center   text-[17px] overflow-hidden ">
                    {item.name}
                  </h1>
                </div>
                <div className="w-full relative h-[260px] overflow-hidden">
                  <Image
                    src={
                      `https://egyptos.runasp.net/${item?.imageUrl}` ||
                      "/default-image.jpg"
                    }
                    width={200}
                    height={300}
                    unoptimized
                    alt="User Image"
                    className="w-full h-[260px] bg-cover hover:scale-110 duration-300"
                  />
                  <p className="text-[#EBD778] py-1 pr-3  right-0 bg-[#020032]  absolute top-0 z-10   ">
                    {" "}
                    <span className=" border-[#EBD778] border-r-0 border-[1px] py-[6px]  pl-5">
                      EGP
                    </span>{" "}
                    {item.pricePerHour}
                  </p>
                  <p className=" text-[#EBD778] items-center flex absolute bottom-3 left-5">
                    {item.locationName}{" "}
                  </p>
                </div>
              </Link>
              <div className="p-5 pb-8 bg-gradient-to-b from-[#020032] to-[#FFFFFF]">
                <div className="flex items-center ">
                  <span className="flex text-[14px]  items-center">
                    <StarRating rating={item.rate} />
                  </span>
                  <p className="pl-4 text-[#616060] text-[13px]">
                    {item.rate}-Stars hotel
                  </p>
                </div>
                <div className=" flex text-[10px] justify-between items-center ">
                  <div className="flex items-center my-5">
                    <FaSwimmer className="h-4 w-4 mr-1" />
                    <span>Swimming Pool</span>
                  </div>
                  <div className="flex">
                    <FaSnowflake className="h-4 w-4  mr-1" />
                    <span>Air-Conditioned</span>
                  </div>

                  <div className="flex">
                    <FaWifi className="h-4 w-4  mr-1" />
                    <span>Free WiFi</span>
                  </div>
                </div>

                <div>
                  <a
                    href={item.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex  gap-2 text-[#616060] hover:text-[#616060a8] transition"
                  >
                    <FaFacebookF className="h-4 w-4" />
                    <span>Follow us on Facebook</span>
                  </a>
                </div>
                <div>
                  <a
                    href={item.webSite}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center mt-2 gap-2 text-[#616060] hover:text-[#616060a8] transition"
                  >
                    <FaGlobe className="h-4 w-4" />
                    <span>Visit Website</span>
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      <div className="w-[130px] m-auto my-5 relative top-[-120px]">
        {visibleCount < filteredData.length && (
          <button
            onClick={loadMore}
            className="mt-4     px-5 p-2 bg-[#020032] text-center m-auto text-white"
          >
            View more
          </button>
        )}
      </div>
    </div>
  );
}
