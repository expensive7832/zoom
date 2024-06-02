"use client"


import { usePathname, useRouter } from 'next/navigation';
import React from 'react'
import links from './SidebarLink';
import Image from 'next/image';
import { LogOutIcon } from 'lucide-react';
import { Button } from './ui/button';
import Link from 'next/link';

function LeftSideBar() {

    const router = useRouter();

    const pathname = usePathname();

    
  


  return (
    <div className='bg-dark-2 p-5 relative h-full  '>
        {
            links?.map((each) =>(
                <Link  href={`${each?.url}`} key={each?.id} className={`flex gap-5 my-10 items-center p-3 cursor-pointer rounded-sm ${pathname == each?.url && "bg-blue-600"}`}>
                    <Image
                    src={each.img}
                    alt='links icon'
                    height={30}
                    width={30}
                    />

                    <h6 className='text-white text-lg'>{each?.title}</h6>
                </Link>
            ))
        }

        <div className="absolute bottom-10">

            
            <LogOutIcon color='white'/>
          
        </div>
    </div>
  )
}

export default LeftSideBar