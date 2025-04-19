"use client";
import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import Booking from "./Booking";
import { motion } from "framer-motion";
import Link from "next/link";
import StarRating from "../StarRating";
import { StarIcon } from "@heroicons/react/24/solid";
import GuideReviews from "./GuideReviews";

const GuideDetails = () => {
  const router = useRouter();
  const pathname = usePathname();
  const id = pathname.split("/").pop();

  const [state, setState] = useState({
    guide: null,
    guides: [],
    loading: true,
  });
  useEffect(() => {
    if (!id) return;

    const fetchGuide = async () => {
      try {
        const res = await fetch(
          `https://egyptos.runasp.net/api/TourGuide/Get/${id}`
        );
        if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
        const data = await res.json();
        setState((prevState) => ({ ...prevState, guide: data, loading: false }));
      } catch (error) {
        console.error("Error fetching guide details:", error);
        setState((prevState) => ({ ...prevState, loading: false }));
      }
    };

    const fetchGuides = async () => {
      try {
        const res = await fetch(
          `https://egyptos.runasp.net/api/TourGuide/GetAll`
        );
        if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
        const data = await res.json();
        setState((prevState) => ({ ...prevState, guides: data.slice(0, 4) }));
      } catch (error) {
        console.error("Error fetching guides:", error);
      }
    };

    fetchGuide();
    fetchGuides();
  }, [id]);

  if (state.loading) return <p>Loading...</p>;
  if (!state.guide) return <p>Guide not found.</p>;

  return (
    <div className="max-w-[1350px]  mx-auto">
      <div className="p-5 flex flex-col md:flex-row items-center gap-6 my-10 bg-white shadow-sm rounded-lg w-full">
        <Image
          src={`https://egyptos.runasp.net/${state.guide.user?.imageUrl}`}
          width={450}
          height={100}
          alt={`${state.guide.user?.firstName} ${state.guide.user?.lastName}`}
          unoptimized
          className="object-cover rounded-tr-3xl rounded-bl-3xl h-[250px] w-[250px] md:h-[400px] md:w-[450px]"
        />
        <div className="w-full max-w-[900px] text-center md:text-left">
          <div className="flex flex-col md:flex-row justify-between items-center w-full">
            <h2 className="text-xl font-bold">
              {state.guide.user?.firstName} {state.guide.user?.lastName}
            </h2>
            <div className="flex flex-col items-center">
              <div className="flex items-center gap-2">
                <span className="font-extrabold"> {state.guide.rate.toFixed(1)}</span>
                <StarRating rating={state.guide.rate} />
              </div>
              <p
                className={`${
                  state.guide.isAvailable
                    ? "text-[#009255] bg-[#00de7a44]"
                    : "text-[#7E0303] bg-[#de000054]"
                } px-2 py-1 rounded mt-2 text-sm`}
              >
                {state.guide.isAvailable ? "Available" : "Not Available"}
              </p>
            </div>
          </div>

          <div className="w-full flex flex-col max-w-[700px] md:flex-row justify-between mt-3 text-sm">
            <div>
              <p className="font-bold">Email</p>
              <p>{state.guide?.user.email}</p>
            </div>
            <div>
              <p className="font-bold">Gender</p>
              <p>{state.guide?.user.sex}</p>
            </div>
          </div>
          <div className="my-2">
            <p className="font-bold">Experience</p>
            <p>{state.guide.yearsOfExperience} years</p>
          </div>
          <div className="my-2 w-full lg:w-[60%]">
            <p className="font-bold">Description</p>
            <p className="text-sm">{state.guide.description}</p>
          </div>
          <div className="flex my-2">
            <p>{state.guide.salaryPerHour}$ /hr inc Vat</p>
          </div>

          <button
            onClick={() => router.back()}
            className="mt-4 p-2 px-5 bg-[#020032] text-white rounded hover:bg-[#020032b5] transition w-full sm:w-auto"
          >
            Go Back
          </button>
        </div>
      </div>
      <div className="flex mb-8  justify-center w-[95%] min-h-[400px] flex-wrap lg:mb-0 lg:justify-between items-start m-auto ">
        <div>
          <GuideReviews id={id} guide={state.guide} />
        </div>
        <div>
          <Booking />
        </div>
      </div>
      <div>
        <h2 className="text-2xl text-center font-semibold mb-5">Similar Guide</h2>
        <div className="grid my-7 mb-24 relative w-[95%] pb-3 m-auto grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 md:gap-4">
          {state.guides.map((item, index) => (
            <motion.div
              key={item?.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              viewport={{ once: true }}
            >
              <Link
                href={`/tour-guide/${item?.id || "#"}`}
                className="border cursor-pointer block rounded-t-2xl shadow-lg hover:shadow-xl transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105"
              >
                <div className="w-full h-[260px] p-0 overflow-hidden">
                  <Image
                    src={`https://egyptos.runasp.net/${item?.user?.imageUrl}` || "/default-image.jpg"}
                    width={200}
                    height={300}
                    unoptimized
                    alt="User Image"
                    className="w-full h-[260px] bg-cover rounded-t-2xl hover:scale-110 overflow-hidden duration-300"
                  />
                </div>
                <div className="px-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-[20px] py-2 font-bold">
                      {`${item?.user?.firstName} ${item?.user?.lastName} `}
                    </h3>
                    <p className="flex font-extrabold w-[50px] justify-between items-center">
                      {item.rate.toFixed(1)}
                      <StarIcon className="h-5 w-5 text-yellow-300 " />
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
    </div>
  );
};

export default GuideDetails;