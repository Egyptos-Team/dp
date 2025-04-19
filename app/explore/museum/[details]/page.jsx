import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import DetailsContent from "../../../_components/museum/DetailsContent";
import { MapPinIcon, ClockIcon, MapIcon } from "@heroicons/react/24/outline";
import "../../../../style/Museum.module.css";

export default async function ProductPage({ params }) {
  const id = params?.details;
  if (!id) return notFound();

  try {
    const res = await fetch(`https://egyptos.runasp.net/api/Areas/Get/${id}`);
    if (!res.ok) return notFound();
    const product = await res.json();

    return (
      <div className="bg-[#020032] relative">
        <div
          className="h-[600px] w-full relative bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/images/bac.png')" }}
        >
          <div className="m-auto w-[90%] md:w-[70%] h-[600px] absolute top-[150px] left-[calc(50%-45%)] md:left-[calc(50%-35%)] flex items-center justify-center text-white">
            <Image
              src={`https://egyptos.runasp.net/${product.imageUrl}`}
              alt={product.name}
              fill
              className="rounded-3xl brightness-75 object-cover"
              unoptimized
            />
            <div className="absolute p-14 w-full h-full flex flex-col justify-center">
              <h2 className="text-[30px] sm:text-[40px] md:text-[50px] lg:text-[60px] border-l-[7px] pl-6 border-[#EBD778] font-poppins font-bold">
                {product.name}
              </h2>
              <Link href="" className="absolute bottom-[-25px] right-2">
                <div className="bg-[#020032] hover:bg-[#020032c6] rounded-2xl py-4 px-10 font-poppins text-[30px]">
                  Book now
                </div>
              </Link>
            </div>
          </div>
        </div>

        <div className="w-full max-h-[600px] overflow-x-auto bg-[#EBD778] font-inknut text-lg sm:text-xl md:text-2xl lg:text-3xl px-6 sm:px-12 md:px-20 pb-16 sm:pb-24 md:pb-28 font-medium pt-[200px]">
          {product.description}
        </div>

        <div className="flex flex-wrap bg-[#020032] relative m-auto justify-center w-[80%] sm:justify-between p-10 md:p-[100px]">
          <div className="border-2 border-[#EBD778] my-5 rounded-2xl h-[220px] w-[300px] py-2">
            <p className="flex items-center border-b-2 border-[#EBD778] px-5 pb-2 text-[#EBD778]">
              <MapPinIcon className="w-6 h-6 text-[#EBD778] mr-2" />
              Address
            </p>
            <p className="overflow-hidden text-[#EBD778] p-5 line-clamp-5">
              {product.address}
            </p>
          </div>

          <div className="border-2 border-[#EBD778] my-5 rounded-2xl h-[220px] w-[300px] py-2">
            <p className="flex items-center border-b-2 border-[#EBD778] px-5 pb-2 text-[#EBD778]">
              <ClockIcon className="w-6 h-6 text-[#EBD778] mr-2" />
              Working Hours
            </p>
            <p className="overflow-hidden text-[#EBD778] p-5 line-clamp-5">
              {product.working}
              {}
              Not available
            </p>
          </div>

          <div className="border-2 border-[#EBD778] my-5 rounded-2xl h-[220px] w-[300px] py-2">
            <p className="flex items-center border-b-2 border-[#EBD778] px-5 pb-2 text-[#EBD778]">
              <MapIcon className="w-6 h-6 text-[#EBD778] mr-2" />
              Location Map
            </p>
            <div className="overflow-hidden p-2 rounded-xl">
              <iframe
                src={product.location}
                width="100%"
                height="150"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </div>

        <DetailsContent apiUrl={`https://egyptos.runasp.net/api/Items/GetAreaItems/${id}`} />
      </div>
    );
  } catch (error) {
    console.error("❌ Fetch Error:", error);
    return notFound();
  }
}
