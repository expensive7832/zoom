"use client";
import MeetingRoom from "@/components/MeetingRoom";
import SetVideo from "@/components/SetVideo";
import GetCallDetails from "@/lib/hooks/GetCallDetails";
import { Call, StreamCall, StreamTheme } from "@stream-io/video-react-sdk";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const Meeting =({ params:{id} }: { params: { id: string } }) => {
  const [setupiscomplete, setsetupiscomplete] = useState<boolean>(false);
  const [loading, setloading] = useState<boolean>(true);
  const [call, setcall] = useState<Call>();

  GetCallDetails(id)
  .then((res) =>{
    setloading(res?.isLoading);
    setcall(res?.call);
    
  })
  .catch((err) => console.log(err))



 if(loading) return(
   <Image src={require("./../../../../public/load.gif")} alt="loader" />
  )

  return (
    <div>
      <StreamCall call={call} >
        <StreamTheme>
          <div className="h-screen w-screen bg-dark-1">
          {
            setupiscomplete ?
            <MeetingRoom/>

            :

            <SetVideo setsetupiscomplete={setsetupiscomplete} />
          }
          </div>
        </StreamTheme>
      </StreamCall>
    </div>
  );
};

export default Meeting;
