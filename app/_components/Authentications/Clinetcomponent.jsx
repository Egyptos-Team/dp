"use client";
import { useEffect, useState } from "react";
import LogOut from "./logOut";

const ClientComponent = () => {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                setLoading(true);
                
                // ✅ جلب بيانات المستخدم من LocalStorage
                const storedUser = localStorage.getItem("User");
                if (!storedUser) {
                    throw new Error("There is no user data stored in LocalStorage");
                }

                const parsedUser = JSON.parse(storedUser);
                const token = parsedUser.tokens;

                if (!token) {
                    throw new Error("There is no authentication token, please log in again.");
                }

                // ✅ استدعاء API لجلب بيانات المستخدم
                const response = await fetch("https://egyptos.runasp.net/api/Account/Profile", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    }
                });

                // ✅ التحقق من حالة الاستجابة
                const text = await response.text();
                console.log("🔍 API Response:", text);

                if (!response.ok) {
                    throw new Error(`Server response error: ${text}`);
                }

                let data;
                try {
                    data = JSON.parse(text);
                } catch (jsonError) {
                    throw new Error("The retrieved data is not in a valid JSON format.");
                }

                setUserData(data);
            } catch (err) {
                console.error(err.message);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

    if (loading) return <p>Loading data...</p>;
    if (error) return <p> {error}</p>;

    return (
        <div>
            {userData ? (
                <div>
                    <h1>مرحبًا {userData.firstName} {userData.lastName}</h1>
                    <p>الجنس: {userData.sex}</p>
                    <p>رقم الهاتف: {userData.phoneNumber}</p>
                    <p>الرقم القومي: {userData.nationalId}</p>
                    <LogOut />
                </div>
            ) : (
                <p> لم يتم العثور على بيانات المستخدم.</p>
            )}
        </div>
    );
};

export default ClientComponent;
