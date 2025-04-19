import React from "react";
import TransportType from "./_components/transportTypes/TransportType";
import GetAll from "./_components/privateTransport/GetAll";
import GetAllBooking from "./_components/bookingTransport/GetAllBooking";

function Page() {
  return (
    <div className="w-full bg-black">
      <TransportType />
      <GetAll />
      <GetAllBooking />
    </div>
  );
}

export default Page;
