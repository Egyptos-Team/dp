"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { UserIcon, LockClosedIcon, EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import SignInGoogle from "./SignInGoogle";
import Link from "next/link";
import { signIn } from "next-auth/react";

export default function SignInPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [successMessage, setSuccessMessage] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  // localStorage.setItem("User", JSON.stringify(response));
  window.dispatchEvent(new Event("userLoggedIn")); // 👈 هنستخدمه في الهيدر

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("https://egyptos.runasp.net/api/Auth/Login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      let data;
      try {
        data = await response.json();
        console.log(data)
      } catch {
        setError("❌ فشل في معالجة الاستجابة من السيرفر!");
        return;
      }

      if (response.ok && data.token) {
        // حفظ التوكن في الكوكيز
        Cookies.set("auth-token",data.token, {
          expires: 30, 
          path: "/",
          secure: process.env.NODE_ENV === "production",
        });

        // حفظ البيانات المطلوبة فقط في localStorage
        if (typeof window !== "undefined") {
          const userData = {
            tokens:data.token,
            firstName: data.firstName,
            lastName:data.lastName,
            email: data.email,
            avatar: data.avatar || "/default-avatar.png", // تجنب القيم الفارغة
          };
          localStorage.setItem("User", JSON.stringify(userData));
        }

        // تسجيل الدخول عبر NextAuth
        const res = await signIn("credentials", {
          redirect: false,
          email: formData.email,
          password: formData.password,
        });
        
             console.log("📩 Full Response:", response);
        if (res?.error) {
          setError("❌ خطأ في تسجيل الدخول، تأكد من البيانات!");
          return;
        }

        setSuccessMessage("✅ تسجيل الدخول ناجح! سيتم تحويلك...");
        router.push("/profile");

      } else {
        setError(data.message || "❌ فشل التسجيل، راجع البيانات!");
      }
    } catch (error) {
      setError("❌ حصل خطأ أثناء تسجيل الدخول");
      console.error("🚨 Login error:", error);
    }
  };

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen bg-slate-700 px-4"
      style={{
        backgroundImage: "url('/images/background_signUp.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        fontFamily: "Poppins, sans-serif",
      }}
    >
      <div className="bg-[#FFFFFFB8] bg-opacity-75 p-4 sm:p-6 rounded-xl shadow-xl w-full max-w-[90%] sm:max-w-[453px]">
        <h2 className="text-xl text-shadow drop-shadow-md py-5 rounded-[8px] text-[28px] sm:text-[32px] text-[#111827] mb-4 text-center">
          Login
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-[320px] sm:max-w-[389px] mx-auto">
          <div className="w-full mt-3 relative">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full h-[48px] sm:h-[51px] placeholder-gray-900 pl-[65px] sm:pl-[75px] pr-6 rounded-[8px] outline-none text-[14px] sm:text-[16px]"
            />
            <UserIcon className="absolute border-2 p-2 bg-white text-gray-800 rounded-full left-3 sm:left-5 top-[25px] transform -translate-y-1/2 h-10 w-10 shadow-md" />
          </div>

          <div className="w-full relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full h-[48px] sm:h-[51px] rounded-[8px] placeholder-gray-900 pr-12 pl-[65px] sm:pl-[75px] outline-none border shadow-sm text-[14px] sm:text-[16px]"
            />
            <LockClosedIcon className="absolute border-2 p-2 bg-white text-gray-800 rounded-full left-3 sm:left-5 top-[25px] transform -translate-y-1/2 h-9 sm:h-10 w-9 sm:w-10 shadow-md" />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 sm:right-4 top-[25px] transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              {showPassword ? <EyeSlashIcon className="h-5 sm:h-6 w-5 sm:w-6" /> : <EyeIcon className="h-5 sm:h-6 w-5 sm:w-6" />}
            </button>
          </div>

          <div className="w-full mt-2 text-center">
            <Link href="/auth/Reset-your-password" className="text-[#111827] hover:underline hover:text-[#000080] font-medium text-[14px] sm:text-[16px]">
              Forgot your password?
            </Link>
          </div>

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          {successMessage && <p className="text-green-500 text-center">{successMessage}</p>}

          <div className="w-full max-w-[200px] sm:max-w-[227px] m-auto">
            <button type="submit" className="w-full bg-[#FFFFFF] text-[#111827] h-[44px] sm:h-[48px] font-medium py-2 rounded hover:bg-[#ffffff7f] transition text-[14px] sm:text-[16px]">
              Log in
            </button>
          </div>
        </form>

        <SignInGoogle />

        <div className="flex justify-center mt-4 text-[14px] sm:text-[16px]">
          <p>Don’t have an account?</p>
          <Link href="/auth/create-acount" className="pl-2 text-[#000080] hover:underline font-semibold">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}