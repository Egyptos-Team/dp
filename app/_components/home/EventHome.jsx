import Image from 'next/image';
import Link from 'next/link';
import style from "./page.module.css";

export default function Page() {
  return (
    < div className='w-[95%] m-auto'>
    <div className='bg-white'>

          <div className="relative w-full h-[627px] overflow-hidden flex justify-center items-center min-h-screen">
              {/* Background Image */}
              <div className="">
              <Image
                  src="/home/ef214d175b3c4a8240a966b88aa777f4a54f563e.jpg"
                  alt="Pyramids Background"
                  fill
                  objectFit="cover"
                  className="object-center w-full"
                  quality={100} />
          </div>


          {/* Overlay */}
          <div className="absolute inset-0 bg-[#00000033]" />

          {/* Content Over Image */}
          <div className="relative  text-center  pb-[10%]">
              <h2 className={`${style.textMd} text-[#FFCD00] text-[30px] font-normal pl-10 font-[Palanquin Dark]`}>Happens In Egypt</h2>
              <h1 className={`${style.textXl} text-white text-[65px] font-[500] mt-8 w-[100px] leading-[60px] `}>POPULAR <span className='pl-8'>EVENTS</span> </h1>
          </div>
      </div>
      <section className=" py-12 px-4 sm:px-8 md:px-16 lg:px-32 relative transform translate-y-[-200px] overflow-hidden">

              {/* Cards Container */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  z-100  gap-10">
                  {[
                      {
                          text: 'luxor',
                          title: 'Fashion Show Of International Fashion',
                          location: 'Luxor - The Temple Of Hatshepsut',
                          rating: 4.5,
                          image: '/home/50bef2d3cd7e895627c4fb3e6a8d65389a3999c1.jpg',
                      },
                      {
                          text: 'the National Museum of Egyptian Civilization',
                          title: 'Procession Of Royal Mummies',
                          location: 'Cairo - The National Museum Of Egyptian Civilization',
                          rating: 4.7,
                          image: '/home/93007f087f81fd8809ec824e14df2c17c45e9868.jpg',
                      },
                      {
                          text: 'Abu Simble',
                          title: 'Sunlight Crosses The Face Of Ramses',
                          location: 'Aswan - Abu Simbel',
                          rating: 4.5,
                          image: '/home/119211d2a03017d7c2d45b860e21265987215228.jpg',
                      },
                  ].map((event, idx) => (
                      <div
                          key={idx}
                          className=" bg-white  rounded-xl overflow-hidden shadow-2xl "  style={{ boxShadow: '8px 10px 4px 0px #00000040' }}
                      >
                          <div className=''>
                              <div className="relative overflow-hidden transition-transform duration-1000 hover:scale-105">
                                  <Image
                                      src={event.image}
                                      alt={event.title}
                                      width={400}
                                      height={250}
                                      className="w-full h-[554px] object-cover shadow-2xl"/>
                                  <div className='absolute inset-0 bg-[#02020280]'></div>
                                  <span className={`${style.textSm} absolute top-6 left-6 text-[#383838] bg-[#FFCD00] text-[15px] font-[500] px-3 py-1 rounded-[4px]`}>
                                      POPULAR
                                  </span>

                                  <div className=" absolute bottom-[5%] p-4 space-y-2">
                                      <p className={`${style.sec1} font-[Marmelad] font-normal text-[14px] text-[#FFFFFF]`}>{event.text}</p>
                                      <h4 className={`${style.textMd} font-normal text-[30px] text-[#FFFFFF] leading-[40px] font-[Palanquin Dark]`}>{event.title}</h4>
                                      <p className={`${style.textSm} font-normal pl-10 text-[18px] text-[#FFFFFF] font-[Palanquin Dark]`}>{event.location}</p>
                                      <div className="flex items-center text-yellow-500 text-sm">
                                          {'★'.repeat(5)}
                                           <span className={`${style.sec1} ml-2 font-normal text-[15px] text-[#FFFFFF] font-[Palanquin Dark]`}>{event.rating}/5</span>
                                      </div>
                                      <div className='text-center '>
                                          <Link href={"/ser"} className='' >
                                              <button className={`${style.sec1} hover:underline m-auto text-center mt-6 px-4 py-2 border-[#FFCD00] border-3  text-white text-[15px] font-normal rounded cursor-pointer transition`}>
                                                  More information
                                              </button> </Link>
                                      </div>


                                  </div>
                              </div>
                          </div>

                      </div>
                  ))}
              </div>
              {/* </div> */}
          </section>
          </div>
          </ div>
  );
}