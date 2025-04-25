"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import LogOut from "../Authentications/logOut";

const ProfileClient = () => {
    const { data: session, status } = useSession();
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        if (status === "loading") return; 


        let user = null;

        if (session?.user) {
          

            user = {
                name: `${session.user.firstName || ""} ${session.user.lastName || ""}`.trim(),
                email: session.user.email || "unknown",
            };
        } else if (typeof window !== "undefined") {
            const storedUser = localStorage.getItem("User");
           

            if (storedUser) {
                const parsedUser = JSON.parse(storedUser);
                

                user = {
                    name: `${parsedUser.firstName || ""} ${parsedUser.lastName || ""}`.trim(),
                    email: parsedUser.email || "unknown",
                };
            }
        }

        if (user) {
            setUserData(user);
            
        }
    }, [session, status]);

    if (status === "loading") return <p>Loading data...</p>;

    return (
        <div>
            {userData ? (
                <div>
                    <h1>مرحبًا {userData.name}</h1>
                    <p>البريد الإلكتروني: {userData.email}</p>
                    <LogOut />
                </div>
            ) : (
                <p>لم يتم العثور على بيانات المستخدم.</p>
            )}
        </div>
    );
};

export default ProfileClient;
