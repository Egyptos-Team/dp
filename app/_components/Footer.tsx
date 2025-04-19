"use client";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import YouTubeIcon from '@mui/icons-material/YouTube';
import Image from "next/image";
import Link from "next/link";

function Footer() {
  return (
    <div className="  bg-bgBlueColor text-white ">
      <div className="   px-10 py-5 ">
        {/* section one */}
        <div className=" flex items-center justify-between flex-col md:flex-row gap-4 pb-5">
          {/* logo */}
          <div className="sm:hidden">
            <Link
              href="/"
              className="relative block h-[50px] w-[160px] overflow-hidden rounded-tr-[57px] rounded-bl-[57px] border border-golden"
            >
              <Image src="/logo.png" alt="Logo" fill className="object-cover" />
            </Link>
          </div>

          <div className="flex  items-center">
            <EmailIcon style={{ color: "#B3B3B3", fontSize: 80 }} />
            <div className="px-3">
              {" "}
              <p className=" text-[24px]  ">Get the latest news and offers</p>
              <p className="text-[16px]">Subscribe to our newsletter</p>
            </div>
          </div>
          {/* search------------- */}
          <div>
            <form className=" gap-5 flex items-center justify-center flex-col md:flex-row">
              <input
                type="email"
                placeholder="you@example.com"
                className="h-[40px] w-[320px] sm:w-[400px] md:w-[220px] lg:w-[320px] rounded-lg text-black ps-4  outline-none"
              />
              <button
                type="submit"
                className="h-[40px]  w-[320px] sm:w-[400px]  md:w-[70px] bg-[#8080808C]   tracking-wider font-normal  rounded-lg hover:bg-white hover:text-bgBlueColor"
              >
                submit
              </button>
            </form>
          </div>
        </div>
        {/* section two */}
        <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 sm:ml-[100px] md:ml-0 py-6 gap-x-12">
          <div className="font-normal text-[24px ] flex flex-col gap-y-6">
            {/* logo */}
            <div className="hidden sm:block">
              <Link
                href="/"
                className="relative block h-[68px] w-[191px] overflow-hidden rounded-tr-[57px] rounded-bl-[57px] border border-[#eada79]"
              >
                <Image
                  src="/logo.png"
                  alt="Logo"
                  fill
                  className="object-cover"
                />
              </Link>
            </div>
            <Link href="/faq" className="hover:text-golden">
              FAQ
            </Link>
            <Link href="" className="hover:text-golden">
              Contact us
            </Link>
          </div>
          <div className="font-normal text-[24px ] flex flex-col gap-y-6 pt-6 md:pt-12">
            <Link href="/about-us" className="hover:text-golden">
              About us
            </Link>
            <Link href="/our-store" className="hover:text-golden">
              Our store
            </Link>
            <Link href="/customer" className="hover:text-golden">
              For Customer
            </Link>
          </div>
          <div className="font-normal text-[24px ] flex flex-col gap-y-6 pt-6 md:pt-12">
            <div className="flex  items-center justify-start hover:text-golden ">
              <PhoneIcon style={{ fontSize: 25 }} />
              <div className="px-3">
                {" "}
                <p>01114169496</p>
              </div>
            </div>
            <div className="flex  items-center justify-start hover:text-golden">
              <EmailIcon style={{ fontSize: 25 }} />
              <div className="px-3">
                {" "}
                <p>Example@company.com</p>
              </div>
            </div>
            <div className="flex  items-center justify-start gap-3 ">
              <Link href="" className="hover:text-golden">
                {" "}
                <FacebookIcon style={{ fontSize: 25 }} />
              </Link>
              <Link href="" className="hover:text-golden">
                {" "}
                <TwitterIcon style={{ fontSize: 25 }} />
              </Link>
              <Link href="" className="hover:text-golden">
                {" "}
                <InstagramIcon style={{ fontSize: 25 }} />
              </Link>
              <Link href="" className="hover:text-golden">
                {" "}
                <LinkedInIcon style={{ fontSize: 25 }} />
              </Link>
              <Link href="" className="hover:text-golden">
                {" "}
                <YouTubeIcon style={{ fontSize: 25 }} />
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className=" text-center text-[14px] border-t-[1px] py-2">
        <p>All Rights RESERVED© 2025</p>
      </div>
    </div>
  );
}

export default Footer;