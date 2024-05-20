"use client";
import HomeCard from "@/components/HomeCard";
import LeftSideBar from "@/components/LeftSideBar";
import MeetingModal from "@/components/MeetingModal";
import NavBar from "@/components/NavBar";
import ScheduleModal from "@/components/ScheduleMeeting";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";


export interface cardDataProps{
  id: number;
  title: string;
  desc: string;
  img: string;
  bodycolor: string,
  handleClick: () => void
}


function Home() {

  


  const router = useRouter()

  let cardData: cardDataProps[] = [
    {
      id: 1,
      title: "New Meeting",
      desc: "Setup a new recording",
      img: require("./../../public/content.png"),
      bodycolor: "bg-[#FF742E]",
      handleClick: () => setCardClick("isInstantMeeting")
    },
    {
      id: 2,
      title: "Schedule Meeting",
      desc: "Plan your meeting",
      img: require("./../../public/card-add.png"),
      bodycolor: "bg-[#830EF9]",
      handleClick: () => setCardClick("scheduleMeeting")
    },
    {
      id: 3,
      title: "Join Meeting",
      desc: "via invitation link",
      img: require("./../../public/upcoing.png"),
      bodycolor: "bg-[#0E78F9]",
      handleClick: () => setCardClick("joinMeeting")
    },
    {
      id: 4,
      title: "Record Meeting",
      desc: "Record your meeting",
      img: require("./../../public/Video.png"),
      bodycolor: "bg-[#F9A90E]",
      handleClick:() => router.push("/recording")
    },

  ]
 
  const [cardClick, setCardClick] = useState<"isInstantMeeting" | "scheduleMeeting" | "joinMeeting" | "recordMeeting " | undefined >()


 
  return (
   <div className="bg-dark-1 ">
    <NavBar/>
    <main className="flex">
       <aside className="hidden md:block  ">
         <LeftSideBar/>
       </aside>
      <section className="p-6 w-full">

        <article className="w-full min-h-screen">
          {/* banner */}
         <div className="bg-hero bg-cover bg-center p-4  my-5 ">
          <small className="bg-gray-500  text-white rounded shadow-md p-2">
            Upcoming Event at 12:20pm
          </small>

          <div className="mt-14">
            <h2 className="text-white text-4xl font-bold">12:06 <small className="text-[10px]">PM</small></h2>
            <p className="text-gray-300">Friday, 29 March 2024</p>
          </div>
         </div>

         {/* meeting list  card*/}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 max-md:gap-3 md:space-x-5">
        {
          cardData?.map((each) =>(
            <HomeCard
            key={each?.id}
            data={each}
           
            />
          ))
        }
        </div>

        {/* meeting modal */}

        <MeetingModal
        open={cardClick === "isInstantMeeting"}
        close={() => setCardClick(undefined)}
        />

        {/* schedule meeting */}
        <ScheduleModal
        open={cardClick === "scheduleMeeting"}
        close={() => setCardClick(undefined)}
        />



        {/* today upcoming meeting */}

        <div className="flex justify-between text-white my-8 items-center">
          <h3 className="text-[1.4rem]">Today’s Upcoming Meetings</h3>
          <Link href={"/seeall"}>see all</Link>
        </div>

        </article >

      </section>
    </main>
   </div>
  );
}

export default Home;
