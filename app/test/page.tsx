"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ImageSlider() {
  const [images, setImages] = useState([]); // تخزين الصور القادمة من الـ API
  const [currentImage, setCurrentImage] = useState(""); // الصورة الخلفية
  const [showFullSlider, setShowFullSlider] = useState(false); // فتح/إغلاق السلايدر الكبير

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await fetch("https://picsum.photos/v2/list?page=1&limit=10"); // جلب الصور من API
        const data = await res.json();
        setImages(data);
        setCurrentImage(data[0]?.download_url || ""); // تأكد أن الصورة الأولى لها URL
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };
    fetchImages();
  }, []);

  return (
    <div className="relative w-full h-screen">
      {/* الخلفية الكبيرة */}
      <motion.div
        key={currentImage}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${currentImage})` }}
      ></motion.div>

      {/* السلايدر الصغير */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex gap-2 flex-wrap justify-center max-w-[90%]">
        {images.slice(0, 3).map((img, index) => (
          <motion.img
            key={index}
            src={img.download_url}
            alt={`Image ${index}`}
            className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg cursor-pointer hover:scale-110 transition"
            onClick={() => setCurrentImage(img.download_url)}
            whileHover={{ scale: 1.1 }}
          />
        ))}

        {/* الصورة الرابعة مع زر "شاهد المزيد" فوقها */}
        {images[3] && (
          <div className="relative w-16 h-16 sm:w-20 sm:h-20">
            <motion.img
              src={images[3].download_url}
              alt="Image 4"
              className="w-full h-full rounded-lg cursor-pointer hover:scale-110 transition"
              onClick={() => setCurrentImage(images[3].download_url)}
              whileHover={{ scale: 1.1 }}
            />
            {/* زر "شاهد المزيد" فوق الصورة الرابعة */}
            <motion.button
              onClick={() => setShowFullSlider(true)}
              className="absolute inset-0 bg-black bg-opacity-60 text-white text-xs sm:text-sm font-semibold flex items-center justify-center rounded-lg hover:bg-opacity-80 transition"
              whileHover={{ scale: 1.05 }}
            >
              + شاهد المزيد
            </motion.button>
          </div>
        )}
      </div>

      {/* السلايدر الكبير لما تضغط على "شاهد المزيد" */}
      <AnimatePresence>
        {showFullSlider && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="absolute inset-0 bg-black bg-opacity-90 flex flex-col justify-center items-center p-4"
          >
            <button
              className="absolute top-5 right-5 text-white text-2xl"
              onClick={() => setShowFullSlider(false)}
            >
              ✖
            </button>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 max-w-4xl p-4">
              {images.map((img, index) => (
                <motion.img
                  key={index}
                  src={img.download_url}
                  alt={`Image ${index}`}
                  className="w-28 h-28 sm:w-36 sm:h-36 md:w-40 md:h-40 rounded-lg cursor-pointer hover:scale-110 transition"
                  whileHover={{ scale: 1.1 }}
                  onClick={() => {
                    setCurrentImage(img.download_url);
                    setShowFullSlider(false);
                  }}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
