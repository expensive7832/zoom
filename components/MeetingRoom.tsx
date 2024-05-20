import { CallControls, CallParticipantsList, CallStatsButton, CallingState, PaginatedGridLayout, ParticipantView, SpeakerLayout, useCall, useCallStateHooks } from '@stream-io/video-react-sdk'
import React, { useEffect, useState } from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { LayoutList, User, Users } from 'lucide-react';
import { Button } from './ui/button';
import { useRouter } from 'next/navigation';
import Loader from './Loader';

type LayoutMap = "grid" | "Speaker-right" | "Speaker-left" 

function MeetingRoom() {

  const router = useRouter()

  const call = useCall()

  const [showParticipant, setShowParticipant] = useState(false)

  const [selectedLayout, setSelectedLayout] =
  useState<LayoutMap>('grid');

  const HandleLayoutChange = () => {
    switch(selectedLayout){

      case "grid":
       return <PaginatedGridLayout/>

      case "Speaker-left":
        return <SpeakerLayout participantsBarPosition={"right"} />
      
      default:
        return <SpeakerLayout participantsBarPosition={"left"} />

      
    }
  }

  const { useLocalParticipant, useCallCallingState } = useCallStateHooks();
  
  const localparticipant = useLocalParticipant()

const meetingOwner =  localparticipant && String(call?.state?.createdBy?.id) === localparticipant?.userId
  
const callingState = useCallCallingState()


async function EndCall(){
  await call?.endCall()

  router.push("/")
}

if(callingState !== CallingState?.JOINED){
  return <Loader/>
}


  return(
   <div className='flex items-center relative gap-20 justify-center flex-col min-h-screen'>
    <div className='size-full  items-center'>
      <HandleLayoutChange />
      <div className={`${showParticipant ? "absolute top-10 p-10 h-full right-4 textwhite shadow-md bg-gray-300 rounded-md " : "hidden"}`}>

      <CallParticipantsList onClose={() => setShowParticipant(false) }/>
      </div>
    </div>
    <div className="flex gap-3 items-center justify-center flex-wrap ">
    <CallControls/>
    <CallStatsButton/>
   <DropdownMenu>
     <DropdownMenuTrigger className='ring-1 ring-dark-2 p-1 rounded-circle'>
      <LayoutList color='#fff' />
     </DropdownMenuTrigger>
     <DropdownMenuContent>
       <DropdownMenuLabel>Swtich Layout</DropdownMenuLabel>
    
       {
            ["grid", "Speaker-right", "Speaker-left"]?.map((item: any) =>(
              <DropdownMenuItem className='my-4 cursor-pointer' onClick={() =>{
                setSelectedLayout(item)
              
              }}>
                {item}
                <DropdownMenuSeparator />
              </DropdownMenuItem>
            ))
           }
     </DropdownMenuContent>
   </DropdownMenu>
   <Button className='ring-0' onClick={() => setShowParticipant((prev) => !prev)}>
    <Users color='#fff'/>
   </Button>

   {
    meetingOwner === true && 
    <button onClick={EndCall} className="bg-red-500 text-white rounded-md p-2">End Call</button>
   }


    </div>
   </div>
  )
}




export default MeetingRoom