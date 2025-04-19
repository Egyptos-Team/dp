"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";


export default function DetailsContent({ apiUrl }) {
  const [products, setProducts] = useState([]);
  const [visibleCount, setVisibleCount] = useState(5);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true });
 

  useEffect(() => {
    async function fetchData() {
      if (!apiUrl) return;
  
      try {
        const res = await fetch(apiUrl);
        const data = await res.json();
        console.log("data", data);
        setProducts(data); 
      } catch (error) {
        console.error("❌ Fetch Error:", error);
      }
    }
    fetchData();
  }, [apiUrl]);
  

  return (
    <div
      ref={sectionRef}
      className="items w-[95%] m-auto flex flex-col border-t border-[#EBD778] justify-between py-10"
    >
      <h1 className="lg:text-[35px] text-[25px] lg:w-[85%] w-[100%] text-[#EBD778] font-inknut font-normal">
        Museum collections
      </h1>

      <div className="relative flex-col lg:w-[85%] w-[100%] mt-5 mb-9 justify-between ml-auto before:absolute before:top-0 before:left-4 before:w-[1px] before:h-full before:bg-[#EBD778] before:hidden lg:before:block">
        {products.slice(0, visibleCount).map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="flex w-full items-center justify-between mb-10"
          >
            <div className="flex w-full lg:flex-row flex-col-reverse items-center justify-between mb-10">
              <div className="w-8 h-8 hidden lg:block bg-[#EBD778] rotate-45 mr-4"></div>
              <div className="max-w-[399px] text-[#EBD778]">
                <h2 className="py-5 text-center">{product.title}</h2>
                <p>{product.description}</p>
              </div>

              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={isInView ? { scale: 1, opacity: 1 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Image
                  src={`https://egyptos.runasp.net/${product.imageUrl}`}
                  alt={product.title}
                  width={457}
                  height={210}
                  unoptimized
                  className="w-[457px] h-[210px] rounded-lg object-cover"
                />
              </motion.div>
            </div>
          </motion.div>
        ))}
      </div>

      {visibleCount < products.length && (
        <motion.button
          onClick={() => setVisibleCount((prev) => prev + 5)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="mt-5 w-[250px] m-auto px-4 py-2 bg-[#EBD778] text-[#000000bd] rounded-lg hover:bg-[#ebd878e6]"
        >
          See More
        </motion.button>
      )}
    </div>
  );
}
