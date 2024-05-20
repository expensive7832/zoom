import { cardDataProps } from '@/app/(root)/page'
import Image from 'next/image'
import React from 'react'

function HomeCard(
    {data}:{data: cardDataProps})
  {
  return (
    <div onClick={data?.handleClick} className={`${data?.bodycolor} flex flex-col justify-between p-4 min-h-60 rounded-md`}>
        <Image
        src={data?.img}
        alt='meeting image'
        width={10}
        height={10}
        objectFit='contain'
        className='w-10 h-10 object-contain'
        />

        <div className='mb-2'>
            <h4 className="font-bold text-lg text-white">{data?.title}</h4>
            <p className="text-white text-md ">{data?.desc}</p>
        </div>
    </div>
  )
}

export default HomeCard