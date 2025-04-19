"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { FunnelIcon, MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { motion } from "framer-motion";
import Image from "next/image";
import { StarIcon } from "@heroicons/react/24/solid";
export default function Home() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(12);
  const [filters, setFilters] = useState({
    price: "",
    experience: "",
    rating: "",
    name: "",
  });
  const [topThree, setTopThree] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          "https://egyptos.runasp.net/api/TourGuide/GetAll"
        );
        const result = await res.json();
        const topThree = result.sort((a, b) => b.rate - a.rate).slice(0, 4);
        console.log("Fetched Data:", result);
        setData(result || []);
        setTopThree(topThree);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const loadMore = () => {
    setVisibleCount((prev) => prev + 4);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value } || "not"));
  };

  const filteredData = data.filter((item) => {
    return (
      (!filters.price || item?.salaryPerHour <= filters.price) &&
      (!filters.experience || item?.yearsOfExperience >= filters.experience) &&
      (!filters.rating || item?.rate >= filters.rating) &&
      (!filters.name ||
        item?.user?.firstName
          ?.toLowerCase()
          .includes(filters.name.toLowerCase()))
    );
  });

  if (loading) return <p>Loading...</p>;

  return (
    <div className="p-5">
      <div className="flex flex-col w-[97%] m-auto  my-6 mb-8 md:flex-row justify-between items-center p-4 gap-3">
        <div className="relative w-[90%] m-auto  ">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 bg-[#020032] text-white px-4 py-2 rounded-lg shadow-md hover:bg-[#020032ba] transition"
          >
            <FunnelIcon className="w-5 h-5" />
            <span>Filters</span>
          </button>
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="absolute left-0 md:left-[110px] -top-6 mt-2 p-3 bg-white shadow-lg rounded-lg grid grid-cols-1 md:grid-cols-3 gap-3 border z-10 w-full md:w-auto max-w-md lg:max-w-none"
            >
              <input
                type="number"
                name="price"
                placeholder="Max Price"
                onChange={handleFilterChange}
                className="border p-2 rounded-md w-full"
              />
              <input
                type="number"
                name="experience"
                placeholder="Min Experience"
                onChange={handleFilterChange}
                className="border p-2 rounded-md w-full"
              />
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
        <div className="relative w-full sm:w-auto max-w-md lg:max-w-none">
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            name="name"
            placeholder="Search for Guide"
            onChange={handleFilterChange}
            className="border border-black p-2 pl-10 rounded-md w-full outline-none"
          />
        </div>
      </div>

      <div className="grid w-[95%] pb-3 m-auto grid-cols-1 sm:grid-cols-2 sm:gap-3 md:grid-cols-3 gap-y-8 lg:grid-cols-4 md:gap-5">
        {filteredData.slice(0, visibleCount).map((item) => (
          <motion.div
            key={item?.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            viewport={{ once: true }}
          >
            <Link
              href={`/services/tour-guide/${item?.id || "#"}`}
              className="border cursor-pointer block rounded-t-2xl shadow-lg hover:shadow-xl transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105"
            >
              <div className="w-full h-[260px] p-0 overflow-hidden">
                <Image
                  src={
                    `https://egyptos.runasp.net/${item?.user?.imageUrl}` ||
                    "/default-image.jpg"
                  }
                  width={200}
                  height={300}
                  unoptimized
                  alt="User Image"
                  className="w-full h-[260px] bg-cover rounded-t-2xl hover:scale-110 overflow-hidden  duration-300"
                />
              </div>
              <div className="px-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-[20px] py-2 font-bold">
                    {`${item?.user?.firstName} ${item?.user?.lastName} `}
                  </h3>
                  <p className="flex font-extrabold w-[50px] justify-between items-center">
                    {item.rate.toFixed(1)}
                    < StarIcon className="h-5 w-5 text-yellow-300 " />
                  </p>
                </div>
                <p className="h-[40px] overflow-clip text-[14px] mb-1 max-w-[280px]">
                  {item?.description ?? "N/A"}
                </p>
                <p className="text-[14px]">
                  Years of experience{" "}
                  <span className="text-[#00de7afb] ">
                    {item?.yearsOfExperience ?? "N/A"}
                  </span>
                </p>
                <p className="text-[14px] pb-3  ">
                  Salary:{" "}
                  <span className="text-[#00de7afb] pr-1">
                    {item.salaryPerHour}
                  </span>{" "}
                  PH
                </p>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {filteredData.length === 0 && (
        <p className="mt-4 text-gray-500 text-center">
          The search results did not appear
        </p>
      )}
      <div className="w-[130px] m-auto my-5">
        {visibleCount < filteredData.length && (
          <button
            onClick={loadMore}
            className="mt-4     px-5 p-2 bg-[#020032] text-center m-auto text-white"
          >
            View more
          </button>
        )}
      </div>

      <div className="grid my-20 mb-24 relative w-[95%] pb-3 m-auto grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 md:gap-4">
        {topThree.map((item, index) => (
          <motion.div
            key={item?.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            viewport={{ once: true }} 
          >
            <Link
              href={`/tour-guide/${item?.id || "#"}`}
              className={`border   cursor-pointer block  rounded-t-2xl shadow-lg hover:shadow-xl transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 
                ${
                  index % 2 == 0
                    ? " relative top-0 my-7 md:top-12 "
                    : "bg-white"
                }`}
            >
              <div className="w-full h-[260px] p-0 overflow-hidden">
                <Image
                  src={
                    `https://egyptos.runasp.net/${item?.user?.imageUrl}` ||
                    "/default-image.jpg"
                  }
                  width={200}
                  height={300}
                  unoptimized
                  alt="User Image"
                  className="w-full h-[260px] bg-cover rounded-t-2xl hover:scale-110 overflow-hidden  duration-300"
                />
              </div>
              <div className="px-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-[20px] py-2 font-bold">
                    {`${item?.user?.firstName} ${item?.user?.lastName} `}
                  </h3>
                  <p className="flex font-extrabold w-[50px] justify-between items-center">
                    {item.rate.toFixed(1)}
                    < StarIcon className="h-5 w-5 text-yellow-300 " />
                  </p>
                </div>
                <p className="h-[40px] overflow-clip text-[14px] mb-1 max-w-[280px]">
                  {item?.description ?? "N/A"}
                </p>
                <p className="text-[14px]">
                  Years of experience{" "}
                  <span className="text-[#00de7afb] ">
                    {item?.yearsOfExperience ?? "N/A"}
                  </span>
                </p>
                <p className="text-[14px] pb-3  ">
                  Salary:{" "}
                  <span className="text-[#00de7afb] pr-1">
                    {item.salaryPerHour}
                  </span>{" "}
                  PH
                </p>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
