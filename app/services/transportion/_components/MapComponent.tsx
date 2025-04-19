"use client";

import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import { useState } from "react";
import "leaflet/dist/leaflet.css";

export default function MapComponent({ setLocation }: { setLocation: (location: string) => void }) {
  const [position, setPosition] = useState<[number, number] | null>(null);

  function LocationMarker() {
    useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng;
        setPosition([lat, lng]);

        // تحويل الإحداثيات إلى اسم المدينة
        fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`)
          .then((res) => res.json())
          .then((data) => {
            const city =
              data.address.city || data.address.town || data.address.village || "Unknown Location";
            setLocation(city);
          })
          .catch((err) => console.error("Error fetching location:", err));
      },
    });

    return position === null ? null : <Marker position={position} />;
  }

  return (
    <MapContainer center={[30.0444, 31.2357]} zoom={6} className="h-[400px] w-full rounded-lg">
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <LocationMarker />
    </MapContainer>
  );
}
