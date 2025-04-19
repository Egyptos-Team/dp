// useToken.js
"use client";
import { useEffect, useState } from "react";

export default function useToken() {
  const [token, setToken] = useState("");

  useEffect(() => {
    const savedToken = JSON.parse(localStorage.getItem("User") || "{}");
    setToken(savedToken.tokens || "");
  }, []);

  return token;
}
