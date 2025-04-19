    "use client";
    import React, { useEffect } from 'react';
    import { FcGoogle } from "react-icons/fc";
    import { signIn, useSession } from "next-auth/react";

    export default function SignInGoogle() {
      const { data: session } = useSession();

      // إرسال بيانات المستخدم للـAPI بعد تسجيل الدخول
      useEffect(() => {
        if (session) {
          const sendUserData = async () => {
            const userData = {
              email: session.user.email,
              name: session.user.name,
              image: session.user.image, 
            };

            try {
              const response = await fetch('', {// الايرور اللي بيظهر هنا علشان مفيشAPI
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
              });

              const data = await response.json();
      
              if (data.token) {
                localStorage.setItem('token', data.token);
              }
            } catch (error) {
              console.error('Failed to send Google data to API:', error);
            }
          };

          sendUserData();
        }
      }, [session]);

      return (
        <div className="w-full max-w-[90%] sm:max-w-[364px] m-auto my-5 border border-[#9CA3AF] hover:bg-[#ffffff7f] rounded-[8px]">
          <button
            onClick={() => signIn("google", { redirect: true, callbackUrl: "/profile" })}
            className="bg-transparent h-[50px] sm:h-[56px] w-full text-[#111827] rounded text-[14px] sm:text-[16px]"
          >
            <div className="m-auto flex justify-between items-center w-[150px] sm:w-[180px]">
              <FcGoogle className="h-7 w-7 sm:h-8 sm:w-8" />
              Login with Google
            </div>
          </button>
        </div>
      );
      
    }
