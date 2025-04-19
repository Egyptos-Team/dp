import React from 'react'
import Tours from '../../_components/tour-guide/Tourguide'
import Image from 'next/image'
export default function page() {
  return (
    <div>
        <div className='w-full h-[400px]  relative '> 
          <Image
            src="/images/Placeholder Image.svg"
            fill
            
            alt='slide-image'
            className='h-full w-full blur-[10px] bg-contain object-cover'
          />  
          <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-center'>
            <h1 className='md:text-[45px] font-poppins text-[25px]'>Explore Egypt with the Best Tour Guides!</h1>
          </div>
        </div>
        <Tours/>
    </div>
  )
}
