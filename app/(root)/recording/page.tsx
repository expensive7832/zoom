// @ts-nocheck
"use client"


import React, { useEffect, useState } from 'react'
import getAllCalls from '@/lib/hooks/GetAllCalls';
import Loader from '@/components/Loader';

import NavBar from '@/components/NavBar';
import LeftSideBar from '@/components/LeftSideBar';

import MeetingCard from '@/components/MeetingCard';
import { Call } from '@stream-io/video-react-sdk';

function Recording() {

 const { loading, recordings } = getAllCalls()
 
 const [allrecords, setallrecords] = useState(null)


 
 
 useEffect(() =>{

  try{
    if(loading) return <Loader/>

    const fetchAllRecordings = async() =>{
      
      if(recordings === undefined){
        return;
      }else{
        let fetchRecordings =  await Promise.all(recordings?.map((each) => each.queryRecordings()))

        setallrecords(fetchRecordings);
    
      }
  }

  fetchAllRecordings()
    
  }catch(e){
    alert(e.message)
  }


 
 }, [recordings, loading])

 
  
  return (
    <div className="bg-dark-1 flex-1 min-h-screen">
    <NavBar/>
    <main className="flex">
       <aside className="hidden md:block ">
         <LeftSideBar/>
       </aside>
      <section className="p-6 w-full">

        <article className="w-full min-h-screen">
         
         <h2 className='text-white text-3xl mt-3 mb-5 font-bold'>Recordings</h2>

         {/* record  card*/}

        <div className="grid grid-cols-2 gap-3 ">
        {
          allrecords && allrecords?.length > 0 ?

         allrecords?.map((each) =>(
          <MeetingCard
          type='recording'
          key={each?.id}
          duration={each?.duration}
          filename={each?.recordings[0]?.filename}
          title={each?.state?.custom?.description}
          start_time={each?.recordings[0]?.start_time}
          end_time={each?.recordings[0]?.end_time}
          date={each?.state?.startsAt?.toLocaleString() || ""}
          participant={each?.state?.participants}
          url={each?.recordings[0]?.url}
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

export default Recording