import Image from 'next/image'
import React from 'react'

function Loader() {
  return (
    <div className='min-h-screen items-center justify-center flex'>
        <h1 className='text-white'>
          <Image
          src={require("./../public/load.gif")}
          alt='loader img'
          width={15}
          height={15}
          className='w-16 h-16 object-contain'
          />
        </h1>
    </div>
  )
}

export default Loader