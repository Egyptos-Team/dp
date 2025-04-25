 "use client"
 import useToken from "../__components/useToken"
 // import GetAll from "../__components/bookins/GetAll";
import GetAllTransport from "../__components/bookins/GetAllTransport";
import GetAllTourGuideBookings from "../__components/bookins/GetAllGuide";
import GetAllEventBookings from "../__components/bookins/GetAllEvent";
function Page() {
    const token =useToken();
  return (
    <div className="w-full bg-black">
     
      {/* <GetAll /> */}
      <GetAllTransport token={token} />
      <GetAllTourGuideBookings token={token} />
      <GetAllEventBookings token={token} />
      
    </div>
  );
}

export default Page;
