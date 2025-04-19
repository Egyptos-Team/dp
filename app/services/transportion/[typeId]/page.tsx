import React from "react";
import SliderTransportion from "../_components/slider";
import Card from "../_components/Card";

export default async function page({
  params,
}: {
  params: Promise<{ typeId: string }>;
}) {
  const { typeId } = await params;
  const res = await fetch(
    `https://egyptos.runasp.net/api/TransportTypes/Get/${typeId}`
  );
  const data = await res.json();
  console.log(data);

  return (
    <div>
      <SliderTransportion typeId={typeId} />
      <section id="next-section" className="mb-10">
        <div className="h-[50px] bg-bgBlueColor"></div>
        <div
          className=" relative left-[-150px] top-10 w-[300px] h-[100px] bg-[#DF3C20] z-[-1] "
          style={{ transform: "rotate(115deg)" }}
        ></div>
        <div className="container mx-auto md:p-10">
          <h2 className="flex justify-center items-center pb-5 md:pb-10 text-[32px] md:text-[45px] text-[#DF3C20] font-bold">
            Related {data.name}
          </h2>
          <div className="  grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3  2xl:grid-cols-4 gap-10">
            {data.privateTransports.map((transport:any) =>
              transport.isAvailable ? (
                <Card transport={transport} key={transport.id} data={data.name} />
              ) : null
            )}
          </div>
        </div>
       
      </section>
    </div>
  );
}
