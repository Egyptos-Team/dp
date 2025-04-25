"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRightIcon, TicketIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { motion, useInView } from "framer-motion";

export default function Content() {
  const [products, setProducts] = useState([]);
  const [visibleCount, setVisibleCount] = useState(5);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true });

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await fetch("https://egyptos.runasp.net/api/AreaTypes/Get/8");
        const data = await res.json();
        setProducts(data.areas);
      } catch (error) {
        console.error("❌ Fetch Error:", error);
      }
      setLoading(false);
    };

    fetchProducts();
  }, []);

  return (
    <div ref={sectionRef} className="max-w-[1380px] w-full mx-auto p-6 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={isInView ? { opacity: 1, y: 0, transition: { duration: 1, delay: 0.2 } } : {}}
        className="max-w-[530px] m-auto flex justify-between relative items-center"
      >
        <div className="relative w-[150px] hidden md:block h-[75px]">
          <Image
            src="/images/9a3710a583a98b769bb05e0b007deed4.png"
            alt="Before"
            fill
            className="object-cover"
          />
        </div>

        <h1 className="text-[20px] text-[#020032] md:left-[87px] left-0 mb-3 md:text-[35px] bg-[#EBD778] rounded-b-3xl px-5 max-w-[400px] absolute text-center">
          Egyptian Museums
        </h1>

        <div className="relative w-[150px] hidden md:block h-[75px]">
          <Image
            src="/images/9a3710a583a98b769bb05e0b007deed4.png"
            alt="Before"
            fill
            className="object-cover"
          />
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={isInView ? { opacity: 1, scale: 1, transition: { duration: 0.5, delay: 0.2 } } : {}}
        className="relative flex justify-start w-full my-11 max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl"
      >
        <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search for Museums"
          className="w-full p-2 py-3 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </motion.div>

      {loading && <p>⏳ Loading...</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
        {products
          .filter((product) =>
            product.name.toLowerCase().includes(searchTerm.toLowerCase())
          )
          .slice(0, visibleCount)
          .map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0, transition: { duration: 0.6, delay: index * 0.2 } } : {}}
              className="w-full my-6 hover:bg-[#EBD778]/40 duration-300"
            >
              <div className="w-full flex p-4 border-l-[5px] border-[#EBD778] relative shadow cursor-pointer transition">
                <div className="w-[380px] h-[320px]">
                  <img
                    src={`https://egyptos.runasp.net/${product.imageUrl}`}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute right-0 left-auto translate-y-[55px] flex-row">
                  <div>
                    <Link className="absolute top-[-48px] right-0 left-auto" href={`/explore/museum/${product.id}`}>
                      <div className="w-[120px] flex justify-evenly items-center py-3 text-center hover:bg-[#ebd878b1] bg-[#EBD778]">
                        View <ArrowRightIcon className="h-5 w-5" />
                      </div>
                    </Link>
                  </div>
                  <div className="w-[280px] h-[220px] bg-[#020032] items-center flex">
                    <p className="text-[16px] text-[#EBD778E5] overflow-hidden p-3">
                      {product.name}
                    </p>
                    <Link href="/booking" className="flex items-center gap-2 text-[#EBD778E5] absolute bottom-1 right-0 hover:text-[#ebd878b1] transition">
                      <TicketIcon className="h-10 w-10" />
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
      </div>

      {visibleCount < products.length && (
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.5 } } : {}}
          onClick={() => setVisibleCount(visibleCount + 5)}
          className="font-poppins text-[#020032] bg-[#EBD778] py-3 px-8 font-medium rounded-md mt-6 hover:bg-[#ebd878a5] block mx-auto"
        >
          Expand more
        </motion.button>
      )}
    </div>
  );
}
