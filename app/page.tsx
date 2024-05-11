"use client";
import HomeCard from "@/components/HomeCard";
import LeftSideBar from "@/components/LeftSideBar";
import NavBar from "@/components/NavBar";
import React, { useEffect, useState } from "react";


interface cardDataProps{
  id: number;
  title: string;
  desc: string;
  img: string;
}


function Home() {

  let cardData: cardDataProps[] = [
    {
      id: 1,
      title: "New Meeting",
      desc: "Setup a new recording",
      img: require("./../public/content.png")

    },
    {
      id: 2,
      title: "Join Meeting",
      desc: "via invitation link",
      img: require("./../public/upcoing.png")
    },
    {
      id: 3,
      title: "Schedule Meeting",
      desc: "Plan your meeting",
      img: require("./../public/card-add.png")
    },
    {
      id: 4,
      title: "Record Meeting",
      desc: "Record your meeting",
      img: require("./../public/Video.png")
    },

  ]
 


  return (
   <div className="bg-dark-1 flex-1 min-h-screen">
    <NavBar/>
    <main className="flex">
       <aside className="hidden md:block">
         <LeftSideBar/>
       </aside>
      <section className="p-5 w-full">

        <article className="w-full min-h-screen">
          {/* banner */}
         <div className="bg-hero bg-cover bg-center p-4  ">
          <small className="bg-gray-500  text-white rounded shadow-md p-2">
            Upcoming Event at 12:20pm
          </small>

          <div className="mt-14">
            <h2 className="text-white text-4xl font-bold">12:06 <small className="text-[10px]">PM</small></h2>
            <p className="text-gray-300">Friday, 29 March 2024</p>
          </div>
         </div>

         {/* meeting list  card*/}

        <div className="grid grid-cols-1">
        {
          cardData?.map((each) =>(
            <HomeCard
           
            />
          ))
        }
        </div>

        </article >

      </section>
    </main>
   </div>
  );
}

export default Home;
