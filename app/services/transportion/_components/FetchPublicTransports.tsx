import Image from "next/image";
import Link from "next/link";

export default async function FetchPublicTransports() {
    const fetchTransportions= await fetch(
        `https://egyptos.runasp.net/api/TransportTypes/GetAll`
      );
      const data = await fetchTransportions.json();
      console.log(data);
      
  return (
    <>
      {data.map((transport:any) => (
              <div key={transport.id}>
                <Link href={`/services/transportion/${transport.id}`}>
                  <div className=" relative  h-[265px] w-[100%] overflow-hidden">
                    <h2 className=" absolute z-10 bottom-0 pl-4 text-white font-bold  text-[48px]">
                      {transport.name}
                    </h2>
                    <Image
                      height={200}
                      width={300}
                      src={`https://egyptos.runasp.net/${transport.imageUrl}`}
                      alt={`${transport.name}`}
                      className="h-full w-full "
                      unoptimized
                    ></Image>
                  </div>
                </Link>
              </div>
            ))}
    </>
  )
}
