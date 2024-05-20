"use client"

import React, { useEffect, useState } from 'react'
import GetAllCalls from '@/lib/hooks/GetAllCalls';
import Loader from '@/components/Loader';

import NavBar from '@/components/NavBar';
import LeftSideBar from '@/components/LeftSideBar';

import MeetingCard from '@/components/MeetingCard';

function Upcoming() {

 const { loading, upcomingMeeting } = GetAllCalls()

  if(loading) return <Loader/>
  
  return (
    <div className="bg-dark-1 flex-1 min-h-screen">
    <NavBar/>
    <main className="flex">
       <aside className="hidden md:block ">
         <LeftSideBar/>
       </aside>
      <section className="p-6 w-full">

        <article className="w-full min-h-screen">
         
         <h2 className='text-white text-3xl mt-3 mb-5 font-bold'>Upcoming Meeting</h2>

         {/* meeting list  card*/}

        <div className="grid grid-cols-2 gap-3 ">
        {
         upcomingMeeting && upcomingMeeting?.length > 0 ?

         upcomingMeeting?.map((each) =>(
          <MeetingCard
          type='upcoming'
          key={each?.id}
          title={each?.state?.custom?.description}
          date={each?.state?.startsAt?.toLocaleString() || ""}
          participant={each?.state?.participants}
          url={`${process.env.NEXT_PUBLIC_SITE_URL}/${each?.id}`}
          id={each?.id}
          />
        ))

        :

        "No Data"
        }
        </div>

        

        

        </article >

      </section>
    </main>
   </div>
  )
}

export default Upcoming