"use client";
import React from 'react';
import style from "./page.module.css";
import Image from 'next/image';
import Link from 'next/link';
import {Swiper , SwiperSlide} from "swiper/react";
import { Pagination , Autoplay} from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const News = () => {
    return (
    <div className="">

    
        <div className={`${style.bgImg} w-[100%] h-[627px]`}>
            <Image className='w-[100%] object-cover' fill src={"/news/70f29567132e2647274017b675efd252.jpeg"} alt='bg img'/>
        </div>

        {/* first con */}
<div className={`${style.all} px-16`}>
        <div className='relative'>
            <div className={`${style.sec1} grid lg:grid-cols-4 md:grid-cols-1 gap-8 transform translate-y-[-170px]`}>
            <div className={`${style.col1} relative`}></div>
            <div className=' bg-[#020032] col-span-3 rounded-[29px] pt-10 pb-16 px-7'>
                <div className={`${style.textPara} bg-[#EBD778] rounded-[10px] w-[70%] p-3`}>
                    <h3 className={`text-[#020032] lg:text-[24px] font-400 font-[Inika] leading-[100%]`}>Opening Hours for Museums and Archaeological
                <br />
                Sites During Ramadan 2025</h3>
                </div>
                <div className={`${style.listSec2} pt-7 font-[Poppins] text-[#EBD778] font-400 lg:text-[20px] sm:text-[15px]`}>
                    <p className={` pb-4`}>-All Museums: 9:00 AM – 3:00 PM</p>
                    <p className={` pb-5`}>-The Egyptian Museum in Tahrir and the Graeco-Roman Museum: 9:00 AM – 4:00 PM</p>
                    <p className={` pb-5`}>-Hurghada and Sharm El-Sheikh Museums: Two shifts — Morning: 10:00 AM – 2:00 PM, Evening: 8:00 PM – 11:00 PM</p>
                    <p>-All Archaeological Sites: 9:00 AM – 4:00 PM</p>
                </div>
                
            </div>
            {/* ********* */}
            <div className={`${style.col2} relative`}></div>
            <div className={`${style.res} text-[#020032] font-400 text-[24px] bg-[#020032] lg:col-span-1 sm:col-span-3 rounded-[50px] pt-6 pb-16 pl-4 pr-5 `}>
                <div className='flex mb-7'>
                    <Image className='h-[128px] rounded-[15px]' src={"/news/221451b7765274bba75cb78a23dafe41.jpeg"} alt='om kalthom img' width={100} height={100}/>
                    <div className='pl-3'>
                        <div className='py-1 mb-2 bg-[#EBD778] rounded-[5px] text-center'>
                        <h4 className=" text-[#020032] text-[10px] font-[400] font-[Inika]">Umm Kulthum Museum</h4>
                        </div>
                        <p className={`${style.text10} font-[Poppins]`}>To celebrate 2025 as the &quot;Year of Umm Kulthum,&quot; the museum will be open to the public free of charge all year round, featuring exhibitions and events highlighting the life and works of the legendary singer.</p>
                    </div>
                </div>

                {/* ********* */}

                <div className='flex'>
                    <Image className='h-[128px] object-cover rounded-[15px]' src={"/news/45242b8cef69aa625b95c6ce72d29090.jpeg"} alt='om kalthom img' width={100} height={100}/>
                    <div className='pl-3'>
                        <div className={`${style.egyMus} py-1 mb-2 w-[100%] bg-[#EBD778] rounded-[5px] text-center`}>
                        <h4 className=" text-[#020032] text-[10px] font-[400] font-[Inika]">The Grand Egyptian Museum</h4>
                        </div>
                        <p className={`${style.text10} font-[Poppins]`}>The official opening is expected in the summer of 2025, marking a significant global cultural event.</p>
                    </div>
                </div>
                
            </div>
        </div>
        </div>

        {/* offer sec */}





        <Swiper className='mb-10' modules={[ Pagination , Autoplay]}
        spaceBetween={50} slidesPerView={1}  pagination={{clickable:true}}
        autoplay={{ delay: 3000}} speed={1000}>
            <SwiperSlide className='text-[#D9D9D9]'>

<div className={`${style.sec2}`}></div>
        <div className={` w-[100%] bg-[#020032] pt-12 pl-12 pb-10 mb-10`}>
            <div>
                <div className={`${style.secOffer} grid lg:grid-cols-[1fr_1fr_0.1fr_1fr] md:grid-cols-1 gap-5 sm:grid-cols-1 `}>
                <div className='flex relative '>
                    <Image className={`${style.imgTrip} h-[252px]`} src={"/news/cd1c890a6330c4eff07d3f483def5c84.jpeg"} alt='ticket img' width={200} height={100}/>
                    <h1 className={`${style.textsec2} text-[#EBD778] transform translate-y-32 translate-x-[-20px] font-[400] font-[Inika] sm:text-[45px] lg:text-[64px]`}>Special </h1>
                    <h1 className={`${style.textsec2} text-[#EBD778] absolute top-48 left-36 font-[400] font-[Inika] sm:text-[45px] lg:text-[64px]`}>offer</h1>
                </div>
                <div className='text-right text-[#EBD778] font-[poppins] pr-12  font-[400]'>
                    <h2 className={`${style.texttSec2} text-[40px] pb-16 pr-4 `}>November <br />
                    28-11</h2>
                    <p className={`${style.paraSec2} text-[18px] leading-[117%] pr-4`}>Discover the magic of Aswan with a unique trip that combines history and natural beauty. Enjoy a Nile cruise, explore ancient landmarks, and wander through stunning landscapes. Book your spot now and embark on an unforgettable adventure.
                    4o</p>
                </div>
                
<div className={`${style.line} `}></div>
                <div className=' font-[poppins] font-[400]'>
                    <div className={`${style.aswanBtn} bg-[#EBD778] py-2 mb-8 px-1 w-[50%] m-auto`}>
                        <h3 className={`${style.textAswanBtn} text-[#020032] text-center`}>Aswan Trip Program</h3>
                    </div>
                    <div className={`${style.text10} px-2 font-[poppins]`}>
                        <p className='pb-3'>Day 1:</p>
                        <ul className={`${style.list1} list-disc ml-6 mb-5`}>
                            <li>Gathering and departure from 10AM-2PM</li>
                            <li>Arrival in Aswan and hotel check-in.</li>
                            <li>Nile cruise to enjoy the sunset.</li>
                            <li>Group dinner at the hotel.</li>
                            <li>Free evening to explore the city at night.</li>
                        </ul>
                    </div>
                    <hr className='text-[#EBD778] mb-4'/>
                    <div className={`${style.text10} font-[poppins]`}>
                        <p className='pb-3'>Day 2:</p>
                        <ul className={`${style.list2} list-disc  ml-6 mb-5`}>
                            <li>Breakfast at the hotel.</li>
                            <li>Tour of Aswan&apos;s historical landmarks: Philae Temple, the High Dam, and the Unfinished Obelisk.</li>
                            <li>Free time for souvenir shopping and photos.</li>
                            <li>Lunch at a local Nubian restaurant.</li>
                            <li>Return to the hotel for rest.</li>
                            <li>Nubian night with traditional music and dance.</li>
                        </ul>
                    </div>
                    <div className={`${style.thirdCircle} `}></div>
                </div>   

            </div>
            
            </div>
</div> 
    </SwiperSlide>

    <SwiperSlide className='text-[#D9D9D9]'>

<div className={`${style.sec2}`}></div>
        <div className=' w-[100%] bg-[#020032] pt-12 pl-12 pb-10 mb-10'>
            <div>
                <div className={`${style.secOffer} grid lg:grid-cols-[1fr_1fr_0.1fr_1fr] md:grid-cols-1 gap-5 sm:grid-cols-1 `}>
                <div className='flex relative '>
                <Image className={`${style.imgTrip} h-[252px]`} src={"/news/cd1c890a6330c4eff07d3f483def5c84.jpeg"} alt='ticket img' width={200} height={100}/>
                <h1 className={`${style.textsec2} text-[#EBD778] transform translate-y-32 translate-x-[-20px] font-[400] font-[Inika] sm:text-[45px] lg:text-[64px]`}>Special </h1>
                    <h1 className={`${style.textsec2} text-[#EBD778] absolute top-48 left-36 font-[400] font-[Inika] sm:text-[45px] lg:text-[64px]`}>offer</h1>
                </div>
                <div className=' text-right text-[#EBD778] font-[poppins]  pr-12  font-[400]'>
                    <h2 className={`${style.texttSec2} text-[40px] pb-16 pr-4`}>November <br />
                    28-11</h2>
                    <p className={`${style.paraSec2} text-[18px] leading-[117%] pr-4`}>Discover the magic of Aswan with a unique trip that combines history and natural beauty. Enjoy a Nile cruise, explore ancient landmarks, and wander through stunning landscapes. Book your spot now and embark on an unforgettable adventure.
                    4o</p>
                </div>
                
<div className={`${style.line} `}></div>
                <div className=' font-[poppins] font-[400]'>
                <div className={`${style.aswanBtn} bg-[#EBD778] py-2 mb-8 px-1 w-[50%] m-auto`}>
                        <h3 className={`${style.textAswanBtn} text-[#020032] text-center`}>Aswan Trip Program</h3>
                    </div>
                    <div className={`${style.text10} font-[poppins]`}>
                        <p className='pb-3'>Day 1:</p>
                        <ul className={`${style.list1} list-disc ml-6 mb-5`}>
                            <li>Gathering and departure from 10AM-2PM</li>
                            <li>Arrival in Aswan and hotel check-in.</li>
                            <li>Nile cruise to enjoy the sunset.</li>
                            <li>Group dinner at the hotel.</li>
                            <li>Free evening to explore the city at night.</li>
                        </ul>
                    </div>
                    <hr className='text-[#EBD778] mb-4'/>
                    <div className={`${style.text10} font-[poppins]`}>
                        <p className='pb-3'>Day 2:</p>
                        <ul className={`${style.list2} list-disc ml-6 mb-5`}>
                            <li>Breakfast at the hotel.</li>
                            <li>Tour of Aswan&apos;s historical landmarks: Philae Temple, the High Dam, and the Unfinished Obelisk.</li>
                            <li>Free time for souvenir shopping and photos.</li>
                            <li>Lunch at a local Nubian restaurant.</li>
                            <li>Return to the hotel for rest.</li>
                            <li>Nubian night with traditional music and dance.</li>
                        </ul>
                    </div>
                    <div className={`${style.thirdCircle} `}></div>
                </div>   

            </div>
            
            </div>
</div> 
    </SwiperSlide>
    <SwiperSlide className='text-[#D9D9D9]'>

<div className={`${style.sec2}`}></div>
        <div className=' w-[100%] bg-[#020032] pt-12 pl-12 pb-10 mb-10'>
            <div>
                <div className={`${style.secOffer} grid lg:grid-cols-[1fr_1fr_0.1fr_1fr] md:grid-cols-1 gap-5 sm:grid-cols-1 `}>
                <div className='flex relative '>
                <Image className={`${style.imgTrip} h-[252px]`} src={"/news/cd1c890a6330c4eff07d3f483def5c84.jpeg"} alt='ticket img' width={200} height={100}/>
                <h1 className={`${style.textsec2} text-[#EBD778] transform translate-y-32 translate-x-[-20px] font-[400] font-[Inika] sm:text-[45px] lg:text-[64px]`}>Special </h1>
                    <h1 className={`${style.textsec2} text-[#EBD778] absolute top-48 left-36 font-[400] font-[Inika] sm:text-[45px] lg:text-[64px]`}>offer</h1>
                </div>
                <div className=' text-right text-[#EBD778] font-[poppins] pr-12  font-[400]'>
                    <h2 className={`${style.texttSec2} text-[40px] pb-16 pr-4`}>November <br />
                    28-11</h2>
                    <p className={`${style.paraSec2} text-[18px] leading-[117%] pr-4`}>Discover the magic of Aswan with a unique trip that combines history and natural beauty. Enjoy a Nile cruise, explore ancient landmarks, and wander through stunning landscapes. Book your spot now and embark on an unforgettable adventure.
                    4o</p>
                </div>
                
<div className={`${style.line} `}></div>
                <div className=' font-[poppins] font-[400]'>
                <div className={`${style.aswanBtn} bg-[#EBD778] py-2 mb-8 px-1 w-[50%] m-auto`}>
                        <h3 className={`${style.textAswanBtn} text-[#020032] text-center`}>Aswan Trip Program</h3>
                    </div>
                    <div className={`${style.text10} font-[poppins]`}>
                        <p className='pb-3'>Day 1:</p>
                        <ul className={`${style.list1} list-disc ml-6 mb-5`}>
                            <li>Gathering and departure from 10AM-2PM</li>
                            <li>Arrival in Aswan and hotel check-in.</li>
                            <li>Nile cruise to enjoy the sunset.</li>
                            <li>Group dinner at the hotel.</li>
                            <li>Free evening to explore the city at night.</li>
                        </ul>
                    </div>
                    <hr className='text-[#EBD778] mb-4'/>
                    <div className={`${style.text10} font-[poppins]`}>
                        <p className='pb-3'>Day 2:</p>
                        <ul className={`${style.list2} list-disc ml-6 mb-5`}>
                            <li>Breakfast at the hotel.</li>
                            <li>Tour of Aswan&apos;s historical landmarks: Philae Temple, the High Dam, and the Unfinished Obelisk.</li>
                            <li>Free time for souvenir shopping and photos.</li>
                            <li>Lunch at a local Nubian restaurant.</li>
                            <li>Return to the hotel for rest.</li>
                            <li>Nubian night with traditional music and dance.</li>
                        </ul>
                    </div>
                    <div className={`${style.thirdCircle} `}></div>
                </div>   

            </div>
            
            </div>
</div> 
    </SwiperSlide>
    <SwiperSlide className='text-[#D9D9D9]'>

<div className={`${style.sec2}`}></div>
        <div className=' w-[100%] bg-[#020032] pt-12 pl-12 pb-10 mb-10'>
            <div>
                <div className={`${style.secOffer} grid lg:grid-cols-[1fr_1fr_0.1fr_1fr] md:grid-cols-1 gap-5 sm:grid-cols-1 `}>
                <div className='flex relative '>
                <Image className={`${style.imgTrip} h-[252px]`} src={"/news/cd1c890a6330c4eff07d3f483def5c84.jpeg"} alt='ticket img' width={200} height={100}/>
                <h1 className={`${style.textsec2} text-[#EBD778] transform translate-y-32 translate-x-[-20px] font-[400] font-[Inika] sm:text-[45px] lg:text-[64px]`}>Special </h1>
                    <h1 className={`${style.textsec2} text-[#EBD778] absolute top-48 left-36 font-[400] font-[Inika] sm:text-[45px] lg:text-[64px]`}>offer</h1>
                </div>
                <div className=' text-right text-[#EBD778] font-[poppins]  pr-12  font-[400]'>
                    <h2 className={`${style.texttSec2} text-[40px] pb-16 pr-4`}>November <br />
                    28-11</h2>
                    <p className={`${style.paraSec2} text-[18px] leading-[117%] pr-4`}>Discover the magic of Aswan with a unique trip that combines history and natural beauty. Enjoy a Nile cruise, explore ancient landmarks, and wander through stunning landscapes. Book your spot now and embark on an unforgettable adventure.
                    4o</p>
                </div>
                
<div className={`${style.line} `}></div>
                <div className=' font-[poppins] font-[400]'>
                <div className={`${style.aswanBtn} bg-[#EBD778] py-2 mb-8 px-1 w-[50%] m-auto`}>
                        <h3 className={`${style.textAswanBtn} text-[#020032] text-center`}>Aswan Trip Program</h3>
                    </div>
                    <div className={`${style.text10} font-[poppins]`}>
                        <p className='pb-3'>Day 1:</p>
                        <ul className={`${style.list1} list-disc ml-6 mb-5`}>
                            <li>Gathering and departure from 10AM-2PM</li>
                            <li>Arrival in Aswan and hotel check-in.</li>
                            <li>Nile cruise to enjoy the sunset.</li>
                            <li>Group dinner at the hotel.</li>
                            <li>Free evening to explore the city at night.</li>
                        </ul>
                    </div>
                    <hr className='text-[#EBD778] mb-4'/>
                    <div className={`${style.text10} font-[poppins]`}>
                        <p className='pb-3'>Day 2:</p>
                        <ul className={`${style.list2} list-disc ml-6 mb-5`}>
                            <li>Breakfast at the hotel.</li>
                            <li>Tour of Aswan&apos;s historical landmarks: Philae Temple, the High Dam, and the Unfinished Obelisk.</li>
                            <li>Free time for souvenir shopping and photos.</li>
                            <li>Lunch at a local Nubian restaurant.</li>
                            <li>Return to the hotel for rest.</li>
                            <li>Nubian night with traditional music and dance.</li>
                        </ul>
                    </div>
                    <div className={`${style.thirdCircle} `}></div>
                </div>   

            </div>
            
            </div>
</div> 
    </SwiperSlide>

</Swiper>
        {/* third sec */}
        <div>
            <div className='relative'>
    <h1 className={`${style.sec3} text-[#020032] pb-14 font-[Inika] font-bold text-[40px]`}>Some upcoming tourism-related events in Egypt for 2025.</h1>
</div>
<div className='grid lg:grid-cols-4 sm:grid-cols-2 justify-center gap-5 pb-12'>
    <div>
        <div className='w-[100%]'>
            <Image className='w-[100%] h-[254px]' src={"/news/72b99bf5027cdfd42067c4adffba54f6.png"} alt='img' width={250} height={300}/>
        </div>
        <h3 className={`${style.text15} font-[Inika] pt-5`}>Grand Egyptian Museum Opening</h3>
        <p className={`text-[#020032] pt-2 font-[400] text-[10px] font-[poppins]`}>from the Grand Egyptian Museum opening to exciting new tourist experiences.
        </p>
    </div>
    <div>
        <div className='w-[100%]'>
            <Image className='w-[100%] h-[254px]' src={"/news/dc864d3ea4357050453651dbf94ac32f.jpeg"} alt='img' width={250} height={300}/>
        </div>
        <h3 className={`${style.text15} font-[Inika] pt-5`}>Giza Pyramids Development </h3>
        <p className={`text-[#020032] pt-2 font-[400] text-[10px] font-[poppins]`}>The Egyptian government is developing the Giza Pyramids area to enhance infrastructure and visitor services, making it a top global tourist destination.
        </p>
    </div>
    <div>
        <div className='w-[100%]'>
            <Image className='w-[100%] h-[254px]' src={"/news/a3eaa0dccd576fe44e11ed4a75457707.jpeg"} alt='img' width={250} height={300}/>
        </div>
        <h3 className={`${style.text15} font-[Inika] pt-5`}>Hotel Capacity Expansion</h3>
        <p className={`text-[#020032] pt-2 font-[400] text-[10px] font-[poppins]`}>Egypt plans to add 15,000 new hotel rooms in 2025 to accommodate more tourists and enhance their experience.
        </p>
    </div>
    <div>
        <div className='w-[100%]'>
            <Image className='w-[100%] h-[254px]' src={"/news/a6d3e2c99114f33ae3c5fed9bfe40e17.jpeg"} alt='img' width={250} height={300}/>
        </div>
        <h3 className={`${style.text15} font-[Inika] pt-5`}>Hosting International Exhibitions and Conferences</h3>
        <p className={`text-[#020032] pt-2 font-[400] text-[10px] font-[poppins]`}>Egypt will host various tourism and cultural events in 2025, strengthening its position as a unique travel destination and boosting its tourism sector.
        </p>
    </div>

</div>
        </div>

        {/* last sec */}

        <div>
        <div className={`${style.gapBtn} relative flex gap-24 w-100%`}>
    <h1 className={`${style.sec3} text-[#020032] pb-14 font-[Inika] font-bold lg:text-[40px]`}>What’s new?</h1>
<div className="">
    <button className={`${style.btn} bg-[#020032] text-[#EBD778]  rounded-[5px] py-[10px] px-5 mr-5`}><Link href={"/"} className='font-[poppins] font-[400] text-[14px] '/>Discoveries</button>
    <button className={`${style.btn2} bg-[#EBD778] text-[#020032]  rounded-[5px] py-[10px] px-10`}><Link href={"/"} className='font-[poppins] font-[400] text-[14px] '/>Travel</button>

</div>
</div>

<div>
    
    <div className='grid lg:grid-cols-2 sm:grid-cols-1 gap-[180px] mb-16'>
        {/* first col */}
        <div>
            <div className='w-[100%] '>
            <Image className='w-[591px] h-[434px]' src={"/news/e0f0c61480c69544c3f0cf31c1e88c8c.jpeg"} alt='img' width={300} height={300}/>
        </div>
        <h3 className={`${style.headVall}  text-[30px] font-[700] font-[Inika]  text-[#020032] pt-5`}>Discovery of Pharaoh Thutmose II&apos;s Tomb</h3>
        <p className={`${style.textVall} text-[20px] font-[400]  text-[#020032] pt-3 font-[poppins]`}>In the Valley of the Kings near Luxor, a joint British-Egyptian archaeological team discovered the tomb of Pharaoh Thutmose II, who ruled Egypt from 1493 to 1479 BC. This marks the first discovery of a pharaoh&apos;s tomb since King Tutankhamun’s tomb was found in 1922
</p>
        </div>
    {/* sec col */}

    <div className="">

    <div className={`${style.lastSec} flex gap-3`}>
            <div>
        <h3 className='text-[12px] font-bold font-[Inika]  text-[#020032]'>New Discoveries in Saqqara</h3>
        <p className='text-[13px] font-[400] font-[poppins]  text-[#020032] pt-2'>In Saqqara, the Egyptian-Japanese archaeological mission uncovered tombs, mastabas, and burials, shedding new light on the area&apos;s rich history.</p>
            </div>
        <div className='w-[100%]'>
            <Image className={`${style.imgLast} w-[100%] h-[114px] ml-auto`} src={"/news/aedc13983eb359e13749165c62c8f3e0.jpeg"} alt='img' width={200} height={200}/>
        </div>
        </div>

        <div className={`${style.lastSec} flex gap-3 pt-5`}>
            <div>
        <h3 className='text-[12px] font-bold font-[Inika]  text-[#020032]'>Roman-Era Tombs in El-Bahnasa:</h3>
        <p className='text-[13px] font-[400] font-[poppins]  text-[#020032] pt-2'>In El-Bahnasa, Minya Governorate, tombs from the Roman era were found containing terracotta statues of the goddess Isis-Aphrodite wearing a plant crown topped with a diadem</p>
            </div>
        <div className='w-[125%]'>
            <Image className={`${style.imgLast2} w-[650px] h-[114px] ml-auto `} src={"/news/f1e8a889a28d0dcc617a44bc24b0cea7.jpeg"} alt='img' width={200} height={200}/>
        </div>
        </div>

        <div className={`${style.lastSec} flex gap-3 pt-5`}>
            <div>
        <h3 className='text-[12px] font-bold font-[Inika]  text-[#020032]'>63 Tombs Discovered in Tell El-Deir, Damietta</h3>
        <p className='text-[13px] font-[400] font-[poppins]  text-[#020032] pt-2'>An Egyptian archaeological team found 63 mud-brick tombs in the Tell El-Deir cemetery in New Damietta City. These tombs date back to the 26th Dynasty of the Late Period and contained gold foil fragments and bronze coins from the Ptolemaic era, highlighting the wealth and cultural diversity of that period.</p>
            </div>
        <div className='w-[210%]'>
            <Image className={`${style.imgLast3} w-[750px] h-[114px]`} src={"/news/9d8fa738235d09d3904e6a3b9e2cdd2d.jpeg"} alt='img' width={200} height={200}/>
        </div>
        </div>

    </div>

    
    </div>
    
</div>
        </div>

    </div></div>
  )
}

export default News;