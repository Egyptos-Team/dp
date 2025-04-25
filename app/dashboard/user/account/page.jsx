"use client";

import React, { useState, useEffect } from "react";
import ProfileImage from "../__components/profile/ProfileImage";
import PersonalInfo from "../__components/profile/PersonalInfo";
import AccountSecurity from "../__components/profile/AccountSecurity";
import useToken from "../__components/useToken";

export default function Page() {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = useToken();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://egyptos.runasp.net/api/Account/Profile", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch profile data");
        }

        const result = await response.json();
        setProfileData(result);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchData();
    }
  }, [token]);

  if (loading) return <div className="text-white p-6">Loading profile...</div>;

  if (error) return <div className="text-red-400 p-6">Error: {error}</div>;

  return (
    <div className="w-full bg-black py-6 px-6">
      <h1 className="text-white text-[22px] font-extrabold mb-6">Account Settings</h1>

      <div className="bg-[#40434878] rounded-md p-4 space-y-8">
        <ProfileImage imageUrl={`https://egyptos.runasp.net/${profileData?.imageUrl}`} />
        <PersonalInfo fetchEndpoint="https://egyptos.runasp.net/api/Account/Profile" />
        <AccountSecurity />
      </div>
    </div>
  );
}
