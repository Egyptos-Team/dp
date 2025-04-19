"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { MapPinIcon, ClockIcon } from "@heroicons/react/24/outline";
import { useParams } from "next/navigation";

export default function SunkenInfo() {
  const params = useParams();
  const [data, setData] = useState(null);
  const [mainImage, setMainImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedRadio, setSelectedRadio] = useState(0);
  const [visibleImages, setVisibleImages] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const response = await fetch("https://egyptos.runasp.net/api/AreaTypes/Get/3");
        const result = await response.json();
        const area = result.areas.find(area => area.id === parseInt(params.id));
        if (area) {
          setData(area);
          setMainImage(area.imageUrl || "/fallback-image.jpg"); // الصورة الكبيرة
          setVisibleImages(area.areaImages); // جلب جميع الصور هنا
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [params.id]);

  const handleRadioChange = (index) => {
    setSelectedRadio(index);
    const selectedImage = visibleImages[index]; // نحدد الصورة التي تم اختيارها
    setMainImage(selectedImage?.imageUrl || "/fallback-image.jpg"); // نحدد الصورة الكبيرة بناءً على الصورة المختارة
  };

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col mx-auto container p-4 md:p-6">
      <div className="flex flex-col md:flex-row justify-between items-center mb-7">
        <h1 className="text-2xl font-bold text-gray-800">
          <span className="text-black">{data?.name}</span>
          <span className="text-gray-500"> Sunken Artifacts</span>
        </h1>
        <button className="bg-[#020032] px-6 py-2 text-white rounded-md md:mt-0 mt-4">Book Now</button>
      </div>

      {/* الصورة الكبيرة */}
      <div className="relative w-full h-64 md:h-96 rounded-xl overflow-hidden bg-black">
        {mainImage && (
          <Image 
            src={`https://egyptos.runasp.net/${mainImage}`} 
            unoptimized
            alt="Artifact"
            fill
            className="object-fill opacity-50"
          />
        )}
        <div className="absolute bottom-4 left-4 text-white bg-opacity-60 p-2 rounded">
          <strong className="block">{data?.name}</strong>
          {mainImage && (
            <p className="flex items-center gap-2 text-sm mt-2">
              <MapPinIcon className="w-5 h-5 text-white" />
              {data?.address}
            </p>
          )}
        </div>
      </div>

      {/* النقاط للتبديل */}
      <div className="flex gap-2 my-4 justify-center">
        {visibleImages.map((img, index) => (
          <div
            key={index}
            className={`w-3 h-3 md:w-4 md:h-4 rounded-full bg-gray-500 cursor-pointer transition-opacity duration-300 ${
              selectedRadio === index ? "opacity-50" : "opacity-100"
            }`}
            onClick={() => handleRadioChange(index)}
          ></div>
        ))}
      </div>

      {/* الأربع صور تحت */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 my-6">
        {visibleImages.map((img, index) => (
          <div
            key={index}
            className="relative w-full h-32 sm:h-40 md:h-48 bg-black overflow-hidden rounded-xl cursor-pointer"
          >
            {img?.imageUrl && (
              <Image 
                src={`https://egyptos.runasp.net/${img.imageUrl}`} 
                unoptimized 
                alt={`Thumbnail ${index + 1}`} 
                fill 
                className="object-fill opacity-90"
              />
            )}
          </div>
        ))}
      </div>

      <h2 className="my-5 font-bold text-2xl md:text-4xl">Description :</h2>
      <p className="text-gray-700 leading-relaxed mb-6">{data?.description}</p>

      {/* Location & Working Hours */}
      <div className="flex flex-col md:flex-row gap-6">
        <div className="p-6 flex-1">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <MapPinIcon className="h-6 w-6 text-gray-700" /> Location
          </h2>
          <p className="text-gray-600 mt-2">{data?.address}</p>
        </div>

        <div className="p-6 flex-1">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <ClockIcon className="h-6 w-6 text-gray-700" /> Working Hours
          </h2>
          <ul className="text-gray-600 mt-2">
            <li>Sat: 2:45 PM - 2:45 PM</li>
            <li>Mon: 2:45 PM - 2:45 PM</li>
            <li>Tue: 2:45 PM - 2:45 PM</li>
            <li className="text-red-500">Fri: Closed</li>
          </ul>
        </div>
      </div>

      {/* Google Map Section */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold text-center">Find Location in Google Maps</h2>
        <p className="text-gray-600 text-center mt-2">
          We'd love to hear from you! Please fill out the form below and we'll get in touch with you shortly.
        </p>
        <div className="mt-4">
          <iframe
            src={data?.location}
            allowFullScreen={true}
            loading="lazy"
            className="w-full h-96 rounded-lg"
          ></iframe>
        </div>
      </div>
    </div>
  );
}
