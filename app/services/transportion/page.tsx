import Image from "next/image";
import Link from "next/link";
import RideForm from "./_components/FormTest";
import Card_feedback from "./_components/Card_feedback";
import FetchPublicTransports from "./_components/FetchPublicTransports";

export default function TransportionPage() {
 
  
  const feedback = [
    {
      id: 1,
      text: "I recently used Egyptus for my trip, and it was a fantastic experience! The booking process was seamless, the cab was clean and comfortable, and the driver was professional and friendly.",
      name: "Elisa Parcel",
      address: "Étudiante INSEEC, Lyon",
      imagePath: "/transportion/feedback_1.png",
    },
    {
      id: 2,
      text: "I recently used Egyptus for my trip, and it was a fantastic experience! The booking process was seamless, the cab was clean and comfortable, and the driver was professional and friendly.",
      name: "Vincent Farre",
      address: "Étudiant CFA CODIS, Paris",
      imagePath: "/transportion/feedback_2.png",
    },
    {
      id: 3,
      text: "I recently used Egyptus for my trip, and it was a fantastic experience! The booking process was seamless, the cab was clean and comfortable, and the driver was professional and friendly.",
      name: "Vanessa Hufe",
      address: "Étudiante Epitech, Bordeaux",
      imagePath: "/transportion/feedback_3.png",
    },
    {
      id: 4,
      text: "I recently used Egyptus for my trip, and it was a fantastic experience! The booking process was seamless, the cab was clean and comfortable, and the driver was professional and friendly.",
      name: "Paul Novana",
      address: "Étudiante YNOV Campus, Rennes",
      imagePath: "/transportion/feedback_4.png",
    },
    {
      id: 5,
      text: "Jaltup est mon compagnon de route tout au long de mon alternance. Super intuitif, des conseils personnalisés, et une gestion facilitée sur tous les points administratifs.",
      name: "Claire Mazonnet",
      address: "Étudiante IAE, Grenoble",
      imagePath: "/transportion/feedback_5.png",
    },
    {
      id: 6,
      text: "I recently used Egyptus for my trip, and it was a fantastic experience! The booking process was seamless, the cab was clean and comfortable, and the driver was professional and friendly.",
      name: "Jules Rivot",
      address: "Étudiant IDRAC, Toulouse",
      imagePath: "/transportion/feedback_6.png",
    },
    {
      id: 7,
      text: "I recently used Egyptus for my trip, and it was a fantastic experience! The booking process was seamless, the cab was clean and comfortable, and the driver was professional and friendly.",
      name: "Vincent Farre",
      address: "Étudiant CFA CODIS, Paris",
      imagePath: "/transportion/feedback_2.png",
    },
    {
      id: 8,
      text: "I recently used Egyptus for my trip, and it was a fantastic experience! The booking process was seamless, the cab was clean and comfortable, and the driver was professional and friendly.",
      name: "Vanessa Hufe",
      address: "Étudiante Epitech, Bordeaux",
      imagePath: "/transportion/feedback_6.png",
    },
  ];

  return (
    <>
      <div className=" mt-[5px]">
        <section className="lg:min-h-screen">
          <div className=" relative min-h-[400px] sm:min-h-[500px]">
            <div className=" absolute right-0 top-0 w-[45%] min-h-[250px] sm:h-[300px] md:h-[400px] bg-bgBlueColor "></div>
            <div className="absolute right-[5%] sm:right-[10%] top-0  w-[80%] sm:w-[60%] lg:w-[60%] h-[250px] sm:h-[300] md:h-[400px] bg-bgBlueColor  rounded-full">
              {" "}
              <div className=" absolute left-[30%] lg:left-[20%] mt-5 sm:py-2">
                <h2 className=" font-bold text-[20px] sm:text-[28px] md:text-[32px] text-white">
                  Empowering Your <br /> Travel Experience <br /> with Us
                </h2>
              </div>
            </div>
            <div className=" z-10  w-[58%] md:w-[486px]  lg:w-[58%] absolute right-0 bottom-[100px] md:bottom-[50px] lg:bottom-[-50px] xl:bottom-[-120px] ">
              <Image
                height={600}
                width={973}
                src="/transportion/transportion_bus 1.png"
                alt="transportion_bus"
                className="h-full w-full "
                unoptimized
              ></Image>
            </div>
          </div>
        </section>
        <section className=" container mx-auto px-5 ">
          <div
            className="flex items-center justify-center text-[35px] md:text-[50px] text-red-600 font-bold pb-5"
            style={{ textShadow: "-15px -25px 1px rgba(0, 0, 0, 0.1)" }}
          >
            Transportion
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <FetchPublicTransports />

          </div>
        </section>
        <section className="container mx-auto p-5">
          <div className=" w-full flex">
            <RideForm />
          </div>
        </section>
        <section className=" container mx-auto px-5 ">
          <div className="text-center mb-10 w-full">
            <h2 className="text-[32px] md:text-[42px] text-[#DF3C20] font-bold">
              Let’s see what people say
            </h2>
          </div>
          <div className="flex flex-row flex-wrap gap-6 items-center justify-center">
            {feedback.map((obj) => (
              <Card_feedback key={obj.id} data={obj} />
            ))}
          </div>
        </section>
        <section className=" relative w-full pt-[200px]">
          <div className=" absolute bottom-[29%] w-[100%] flex justify-center items-center">
            <Image unoptimized className="w-[80%]" height={360} width={930} src={`/transportion/Layanan_rental_mobil_di_cirebon___Tomio_Rent_adalah_pilihan_yang_tepat_untuk_perjalanan_bersama_keluarga__teman__atau_rekan_kerja____rentalmobil___sewamobil-removebg-preview (1) 1.png`} alt="carsBG"/> 
          </div>
          <div className="w-full">
            <Image unoptimized className="w-full" height={360} width={930} src={`/transportion/Download Roadmap Location Map for free 1.png`} alt="carsBG"/> 
          </div>
        </section>
      </div>
    </>
  );
}
