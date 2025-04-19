"use client";
import { useState, useEffect } from "react";

export default function CategoryFilter({ onSelectTitle }) {
    const [titles, setTitles] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTitles = async () => {
            try {
                const res = await fetch("https://egyptos.runasp.net/api/Historical/GetAll");
                const products = await res.json();

                if (!Array.isArray(products)) {
                    console.error("Unexpected data format:", products);
                    return;
                }

                const uniqueTitles = Array.from(new Set(products.map((product) => product.title))); // ✅ جلب العناوين فقط
                setTitles(uniqueTitles);
            } catch (error) {
                console.error("Error fetching titles:", error);
            }
            setLoading(false);
        };
        fetchTitles();
    }, []);

    return (
        <div className="w-full max-w-xs ">
            <select
                onChange={(e) => onSelectTitle(e.target.value)}
                className="w-full cursor-pointer rounded-lg py-3 px-5 text-gray-700 bg-white shadow-sm focus:ring-2 focus:ring-blue-500"
            >
                <option value="">All Categories</option>
                {loading ? (
                    <option disabled>Loading titles...</option>
                ) : (
                    titles.map((title) => (
                        <option key={title} value={title}>
                            {title}
                        </option>
                    ))
                )}
            </select>
        </div>
    );
}
