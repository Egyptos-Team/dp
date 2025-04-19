import Image from 'next/image'
import React from 'react'

export default function Card_feedback({data}:{data:any}) {
  return (
    <div className='relative w-[349px] h-[379px] border-[1px] bg-slate-200 rounded-lg shadow-lg '>
<div className='p-5'>
    <div className='text-[18px]'>{data.text}</div>
    <div className=' absolute bottom-5'>
    <div className=' w-[50px] h-[50px] rounded-full'>
            <Image unoptimized src={data.imagePath} alt={data.name} height={50} width={50} className=' object-fill' />
        </div>
        <h2 className='text-[20px] font-bold my-1'>{data.name}</h2>
        <p className='text-[16px] mb-3'>{data.address}</p>
        
    </div>
</div>
    </div>
  )
}
