"use client";
import validator from "validator";
import { useState } from "react"; 
import { ChevronDownIcon   } from "@heroicons/react/24/solid";
import { PhoneIcon, EyeIcon ,EyeSlashIcon ,ArrowPathIcon    } from "@heroicons/react/24/outline";


import Swal from "sweetalert2";
import { getNames, getCode } from "country-list";

export default function CreateAccount() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const initialState = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    nationalId: "",
    nationality: "EG",
    gender: "male",
    phone: "",
  };
  const [errors, setErrors] = useState({});
  const validateField = (name, value) => {
    let error = "";
  
    if (name === "firstName" || name === "lastName") {
      const nameRegex = /^[\p{L}\s-]{2,25}$/u; 
      if (!nameRegex.test(value)) {
        error = "⚠️ Name must contain (2-25 characters).";
      }
    }
  
    if (name === "email" && !validator.isEmail(value)) {
      error = "⚠️ Invalid email!";
    }
  
    if (name === "nationalId" && (!validator.isNumeric(value) || value.length !== 14)) {
      error = "⚠️ The national number must be 14 digits.";
    }
  
    if (name === "phone" && !validator.isMobilePhone(value, "ar-EG")) {
      error = "⚠️ The phone number must be 11 digits long and start with 01.";
    }
  
    if (name === "password" && !validator.isStrongPassword(value, { minLength: 8, minUppercase: 1, minNumbers: 1, minSymbols: 1 })) {
      error = "⚠️Password must contain at least 8 characters, including an uppercase letter, a lowercase letter, a number, and a special character.";
    }
  
    if (name === "confirmPassword" && value !== formData.password) {
      error = "⚠️ Passwords do not match!";
    }
  
    // امسح الخطأ لو القيمة صحيحة
    setErrors((prevErrors) => {
      const newErrors = { ...prevErrors };
      if (error) {
        newErrors[name] = error;
      } else {
        delete newErrors[name]; 
      }
      return newErrors;
    });
  };
  
  

  const [formData, setFormData] = useState(initialState);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    validateField(name, value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
        Swal.fire({
            icon: "error",
            title: "❌ error!",
            text: "Passwords do not match, please consider this before continuing.",
            confirmButtonText: "Okay, I'll try again.",
            confirmButtonColor: "#d33",
        });
        return;
    }

    setLoading(true);

    try {
        const formDataToSend = new FormData();
        formDataToSend.append("FirstName", formData.firstName);
        formDataToSend.append("LastName", formData.lastName);
        formDataToSend.append("email", formData.email);
        formDataToSend.append("nationalId", formData.nationalId);
        formDataToSend.append("nationality", formData.nationality);
        formDataToSend.append("PhoneNumber", formData.phone);
        formDataToSend.append("sex", formData.gender);
        formDataToSend.append("password", formData.password);
        formDataToSend.append("ConfirmPassword", formData.confirmPassword);
        
        console.log(formData.nationality);

        const res = await fetch("https://egyptos.runasp.net/api/Auth/Register", {
            method: "POST",
            body: formDataToSend, // No need for Content-Type when using FormData
        });

        // const data = await res.text();
        // console.log("📥 Response Data:", data);

        if (!res.ok) {
            throw new Error(res?.message || "❌ An unexpected error occurred!");
        }
        
        const responseData = await res.text(); 
        const partialResponse = responseData.substring(29 ) ;

        Swal.fire({
            icon: "success",
            title: "🎉 Registration completed successfully!",
            text: partialResponse,
            confirmButtonText: "Start now",
            confirmButtonColor: "#28a745",
        })

        setFormData(initialState);
    } catch (error) {
        console.error("❌ Error:", error);
        Swal.fire({
            icon: "error",
            title: "❌ error!",
            text: responseData || "An error occurred while processing your request, please try again later.",
            confirmButtonText: "Good",
            confirmButtonColor: "#d33",
        });
    } finally {
        setLoading(false);
    }
};

  return (
    <div style={{ fontFamily: "Inter, sans-serif" , 
          backgroundImage: "url('/images/Group 47.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          }} className="flex justify-center  items-center bg-stone-700  text-[#FFFFFF] min-h-screen w-full ">
          <form 
            onSubmit={handleSubmit} 
            className=" p-6 rounded-2xl max-w-[500px] min-w-[320px] bg-transparent shadow-xl  max-w-lg transition-all duration-300 hover:shadow-2xl"
          >
                <h2 style={{ fontFamily: "Cairo, sans-serif" }} className="text-[#FFFFFF] mb-6 text-center text-[36px] leading-9 "> Create a free account  </h2>
                <div className="grid grid-cols-1 gap-4">
                    <div className="w-full ">
                      <div className="flex flex-col md:flex-row justify-between gap-4">
                            
                        <div className="w-full md:w-1/2">
                              <input
                                type="text"
                                name="firstName"
                                required
                                placeholder=" First Name"
                                onChange={handleChange}
                                value={formData.firstName}
                                className=" input-style pl-4"
                              />
                              
                        </div>
                      
                        
                        <div className="w-full md:w-1/2">
                              <input
                                type="text"
                                required
                                name="lastName"
                                placeholder=" last name"
                                onChange={handleChange}
                                value={formData.lastName}
                                className="input-style pl-4 "
                              />
                        </div>
                      </div>
                        {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName}</p> }
                         {/* {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName}</p>} */}
                    </div>
          
                  
                    <div>
                            <input type="email" name="email" placeholder="E-mail  " autoComplete="off" onChange={handleChange} value={formData.email} className=" pl-6 input-style  " />
                            {errors.email && <p className="text-red-500 autofill:!bg-transparent focus:bg-transparent text-sm">{errors.email}</p>}
                    </div>
                    
                    
                    <div className="flex items-center justify-between p-3 px-6 bg-transparent border mt-3  rounded-lg">
                        <h2>Gender</h2>
                        <label className="flex items-center gap-2">
                              <input 
                                type="radio" 
                                name="gender" 
                                value="Male" 
                                checked={formData.gender === "Male"} 
                                onChange={handleChange} 
                                className="w-5 h-5 accent-[#020032] focus:ring focus:ring-[#020032] "
                              />
                              <span className="text-[#FFFFFF]"> Male</span>
                        </label>
                        <label className="flex items-center gap-2">
                              <input 
                                type="radio" 
                                name="gender" 
                                value="Female" 
                                checked={formData.gender === "Female"} 
                                onChange={handleChange} 
                                className=" w-5 h-5 accent-[#020032] focus:ring focus:ring-[#020032]"
                              />
                              <span className="text-[#FFFFFF]">Female</span>
                        </label>
                    </div>
          
                  
                    <div>
                          <input type="tel" name="nationalId" placeholder=" National ID  " onChange={handleChange} value={formData.nationalId} className=" pl-6 input-style" />
                          {errors.nationalId && <p className="text-red-500 text-sm">{errors.nationalId}</p>}
                    </div>
                    <div className="relative w-full">
                            <select 
                                  name="nationality" 
                                  value={formData.nationality} 
                                  onChange={handleChange} 
                                  className="input-style px-6 appearance-none    group"
                                >
                                  {getNames().map((country) => {
                                    const countryCode = getCode(country);
                                    const flagEmoji = countryCode
                                      ? String.fromCodePoint(...[...countryCode.toUpperCase()].map(c => 127397 + c.charCodeAt(0)))
                                      : "🏳";
                                    return (
                                      <option className="group-[.group]:bg-[#020032] group-[.group]:text[#FFFFFF]" key={country} value={countryCode}>
                                        {country}
                                      </option>
                                    );
                                  })}
                            </select>
                            {/* <KeyboardArrowDownIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" /> */}
                            <ChevronDownIcon className="absolute w-10 h-6 right-3 pr-2 top-[37px] transform -translate-y-1/2 text-[#FFFFFF]" />
                    </div>
                    <div className="grid grid-cols-1 ">
                        <div className="relative">
                              <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                autoComplete="off"
                                required
                                placeholder="Password"
                                onChange={handleChange}
                                value={formData.password}
                                className="pl-6 input-style autofill:!bg-transparent"
                                
                              />
                              <span
                                className="absolute right-3 top-[36px] transform -translate-y-1/2 cursor-pointer"
                                onClick={() => setShowPassword(!showPassword)}
                              >
                                {showPassword ? <EyeSlashIcon className="w-10 h-4 text-[#FFFFFF]" /> : <EyeIcon className="w-10 h-4 text-[#FFFFFF]" />}
                              </span>
                              {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                        </div>
                        <div className="relative mt-3">
                              <input
                                type={showConfirmPassword ? "text" : "password"}
                                name="confirmPassword"
                                required
                                placeholder="Confirm password"
                                onChange={handleChange}
                                value={formData.confirmPassword}
                                className="pl-6 input-style"
                              />
                              <span
                                className="absolute right-3 top-[36px] transform -translate-y-1/2 cursor-pointer"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                              >
                              {showConfirmPassword ? <EyeSlashIcon className="w-10 h-4 text-[#FFFFFF]" /> : <EyeIcon className="w-10 h-4 text-[#FFFFFF]" />}
                              </span>
                              {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}
                        </div>
                    </div>
                    
                    <div className="relative">
                          <div className="absolute left-[1px] rounded-[8px] w-[50px] top-[37px] transform -translate-y-1/2 h-[48px] bg-[#020032] flex items-center justify-center">
                                <PhoneIcon  className="text-[#FFFFFF] w-5 h-5" />
                          </div>  
                          <input
                            type="tel"
                            name="phone"
                            required
                            placeholder=" Phone Number"
                            onChange={handleChange}
                            value={formData.phone}
                            className="pl-[60px] input-style"
                          />
                          {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
                    </div>
                </div>
                <div className="w-[250px] m-auto">
                    <button 
                      type="submit" 
                      disabled={loading} 
                      className=" bg-[#020032] w-full text-center m-auto text-white p-3 rounded-[24px] mt-6 text-lg font-semibold transition-transform transform hover:scale-105 hover:bg-[#020032c5] focus:ring focus:ring-blue-300 disabled:bg-gray-400"
                    >
                      {loading ? <ArrowPathIcon className="w-6 h-6 m-auto text-white animate-spin" />: "Sign up"}
                    </button>
                </div>
          </form>
      </div>
  
  );
}
