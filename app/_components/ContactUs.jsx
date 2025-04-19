"use client";
import Image from "next/image";
import Link from "next/link";
import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { useState, useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
const ContactUs = () => {
  const [ImageUrl, setImageUrl] = useState(null);
  const [errors, setErrors] = useState({
    ImageUrl: "",
    Title: "",
    Description: "",
  });

  const [formdata, setformdata] = useState({
    ImageUrl: "",
    Title: "",
    Description: "",
  });

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImageUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*",
    multiple: false,
  });

  const handleChange = (e) => {
    setformdata({ ...formdata, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let tempErrors = { ImageUrl: "", Title: "", Description: "" };
    if (!ImageUrl) tempErrors.ImageUrl = "Required *";
    if (!formdata.Title) tempErrors.Title = "Required *";
    if (!formdata.Description) tempErrors.Description = "Required *";
    setErrors(tempErrors);
    if (tempErrors.ImageUrl || tempErrors.Title || tempErrors.Description)
      return;

    const payload = {
      Title: formdata.Title,
      Description: formdata.Description,
      ImageUrl: ImageUrl,
    };

    try {
      const res = await fetch(
        "https://egyptus-node.up.railway.app/api/user/report",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJmMGNlOTZlMC0wMjA5LTQ5YWMtOWI2My1lYjc1YTUwYTFlMmIiLCJlbWFpbCI6InlvdXNlZi5tMjAwMjIwMDJAZ21haWwuY29tIiwiZ2l2ZW5fbmFtZSI6InlvdXNlZiIsImZhbWlseV9uYW1lIjoibW9oYW1lZCIsImp0aSI6IjAxOTYyZmUwLTcxNzItNzFmMS04NThjLThkZDZiODk3NzA2NCIsInJvbGVzIjpbIlVzZXIiXSwiZXhwIjoxNzc2MDk1OTYwLCJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjUxNzAiLCJhdWQiOiJodHRwOi8vbG9jYWxob3N0OjUxNzAifQ.T774X1cbjn4n4lA5i6wTmy4LXOUY2LGmQnlcsJ2aonk`,
          },
          body: JSON.stringify(payload),
        }
      );

      const result = await res.json();
      console.log("result",result);
      alert(result.message || "Submitted successfully");
    } catch (error) {
      alert("Submission failed");
    }
  };
  const [bgcolor, setbgcolor] = useState("17rem");
  useEffect(() => {
    const handleresize = () => {
      if (window.innerWidth >= 350 && window.innerWidth <= 768) {
        setbgcolor("17rem");
      } else {
        setbgcolor("1rem");
      }
    };
    window.addEventListener("resize", handleresize);
    handleresize();
    return () => window.removeEventListener("resize", handleresize);
  }, []);

  return (
    <div className="relative min-h-screen flex justify-center items-center  bg-black  md:px-11">
      <div className="absolute w-[100%] inset-0 z-10 ">
        <Image
          src="/1f469e9a0c1720cce134e5ace9c07c0a.jpg"
          alt="cover"
          layout="fill"
          objectFit="cover"
        />
      </div>

      <div className="container relative flex flex-col justify-center items-center rounded-2xl py-5 max-w-[500px] shadow-[0_0_50px_10px_black] border border-white/20 z-10">
        <div className="taitle">
          <h2 className="text-white sm:text-[65px] font-extrabold text-center tracking-widest font-[caveat] text-[35px] ">
            Contact Us
          </h2>
          <p className="text-center text-white mb-4  lg:text-2xl  font-thin  tracking-tight  ">
            “We look forward to hearing from you”
          </p>
        </div>
        <div className="formAndContact flex ">
          <div className="text-white w-full ">
            <div className="flex flex-col max-[1150px]:hidden gap-y-5 mt-4 mb-10 ml-20 ">
              <div className="flex items-center ">
                <PhoneIcon
                  className="cursor-pointer "
                  style={{
                    width: "61.45px",
                    height: "65px",
                    stroke: "black",
                    fill: "none",
                    strokeWidth: "0.6px",
                  }}
                />
                <div className="flex flex-col ">
                  <p className="flex flex-col text-sm font-thin ml-1 ">
                    <span className=" opacity-0 lg:opacity-100">Phone</span>
                    <span className="underline cursor-pointer">
                      +020-324-556
                    </span>
                  </p>
                </div>
              </div>

              <div className="flex items-center  ">
                <EmailIcon
                  className="cursor-pointer"
                  style={{
                    width: "64px",
                    height: "64px",
                    stroke: "black",
                    fill: "none",
                    strokeWidth: "0.6px",
                  }}
                />
                <div className="flex flex-col   ">
                  <p className=" flex flex-col text-sm font-thin ml-1 ">
                    <span className=" opacity-0 lg:opacity-100">Email</span>
                    <span className="underline cursor-pointer ">
                      egyptus98@gmail.com
                    </span>
                  </p>
                </div>
              </div>

              <div className="flex items-center ">
                <LocationOnIcon
                  className="cursor-pointer"
                  style={{
                    width: "64px",
                    height: "64px",
                    stroke: "black",
                    fill: "none",
                    strokeWidth: "0.6px",
                  }}
                />
                <div className="flex flex-col  ">
                  <p className=" flex flex-col  text-sm font-thin ml-1">
                    <span className=" opacity-0 lg:opacity-100">Location</span>
                    <span className="underline cursor-pointer">
                      23 Nasr city,cairo
                    </span>
                  </p>{" "}
                </div>
              </div>
            </div>
          </div>

          <div className="lg:bg-white/10 relative right-[-50px] max-[1150px]:right-[0] w-[320px] mb-5 rounded-2xl shadow-[0_0_50px_10px_black] border border-white/20 ">
            <form
              action=""
              className="xl:space-y-1 w-[320px] px-8 py-3 "
              onSubmit={handleSubmit}
            >
              <div className="flex flex-col items-center justify-center  bg-white/50">
                <div
                  {...getRootProps()}
                  className="w-full max-w-lg p-6 border-2 border-dashed border-white rounded-lg bg-white-90 transition-all cursor-pointer relative"
                >
                  <input {...getInputProps()} />
                  {ImageUrl ? (
                    <div className="relative w-full h-32 overflow-hidden">
                      <Image
                        src={ImageUrl}
                        alt="Uploaded Image"
                        layout="fill"
                        objectFit="cover"
                        className="rounded-lg h-full"
                      />
                    </div>
                  ) : (
                    <div className="flex flex-col items-center text-center">
                      <p className="text-white font-bold text-xl">
                        Upload an Image
                      </p>
                      <span className="text-black/60 text-sm">
                        png,jpg,jpeg
                      </span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="mx-auto w-12 h-12 text-white my-2"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 16V6m0 0l-4 4m4-4l4 4"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 23h14"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 25v-4m14 4v-4"
                        />
                      </svg>
                      <p className="text-sm text-white">
                        Drag and Drop or{" "}
                        <span className="text-[#020032] underline">Browse</span>
                      </p>
                    </div>
                  )}
                </div>
              </div>
              {errors.ImageUrl && (
                <p className="text-red-600 ">{errors.ImageUrl}</p>
              )}

              <label className="opacity-0 lg:opacity-100 text-white font-extralight text-md">
                Event Type
              </label>
              <select
                name="Title"
                value={formdata.Title}
                onChange={handleChange}
                className="w-full p-1 rounded-md placeholder-white/50 font-extralight text-sm tracking-widest bg-white/50 text-white focus:outline-none border border-white/30 focus:ring-2 focus:ring-yellow-500"
              >
                <option value="" className="bg-[#020032] text-white">
                  Select Type
                </option>
                <option value="Touride" className="bg-[#020032] text-white">
                  Tourgide
                </option>
                <option value="Events" className="bg-[#020032] text-white">
                  Events
                </option>
                <option value="Trips" className="bg-[#020032] text-white">
                  Trips
                </option>
              </select>
              {errors.Title && <p className="text-red-600">{errors.Title}</p>}

              <label className="opacity-0 lg:opacity-100 text-white font-extralight text-md">
                Message
              </label>
              <textarea
                name="Description"
                value={formdata.Description}
                onChange={handleChange}
                className="w-full p-2 rounded-md bg-white/50 text-white focus:outline-none border border-white/30 focus:ring-2 focus:ring-yellow-500"
              />
              {errors.Description && (
                <p className="text-red-600">{errors.Description}</p>
              )}

              <button
                type="submit"
                className="w-full p-3 rounded-md bg-[#020032] focus:outline-none text-white font-bold hover:bg-white/50 hover:text-[--blue]"
              >
                Submit
              </button>
            </form>
          </div>
        </div>

        <div className="flex space-x-2 absolute bottom-8 max-[1150px]:relative max-[1150px]:bottom-2 left-3 mt-5 ml-5 ">
          <Link
            href="/facebook"
            className="hover:text-[--blue] hover:scale-150"
          >
            <FacebookRoundedIcon className="text-white" />
          </Link>
          <Link href="/insta" className="hover:text-[--blue] hover:scale-150">
            <InstagramIcon className="text-white" />
          </Link>
          <Link href="/twiter" className="hover:text-[--blue] hover:scale-150">
            <TwitterIcon className="text-white" />
          </Link>
          <Link
            href="/linkedin"
            className="hover:text-[--blue] hover:scale-150"
          >
            <LinkedInIcon className="text-white" />
          </Link>
          <Link href="/github" className="hover:text-[--blue]  hover:scale-150">
            <GitHubIcon className="text-white" />
          </Link>
        </div>
      </div>
    </div>
  );
};
export default ContactUs;
