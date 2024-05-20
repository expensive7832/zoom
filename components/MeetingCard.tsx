import { Call, StreamVideoParticipant } from '@stream-io/video-react-sdk'
import { CalendarClock, Copy, PlayCircle, ToyBrick, Video } from 'lucide-react'
import React from 'react'
import { useToast } from './ui/use-toast';
import { useRouter } from 'next/navigation';

interface props{
    title: string,
    date: string,
    participant: any,
    url:string,
    id: string,
    type: string,
    duration?: string,
    filename?: string,
    start_time?: string,
    end_time?: string,
    
}

function MeetingCard({title, date, participant, url, id, type, duration, filename, end_time, start_time}: props) {

    const { toast } = useToast()

    const router = useRouter()

    console.log(participant);
    
  return (
    <div className='bg-dark-2 p-5 rounded'>

   <div className="my-3"> 
   
   {type === "upcoming" && <CalendarClock color='#fff' />}
   {type === "recording" && <Video color='#fff' />}

   </div>

   {
    type !== "recording" ? 
    <h3 className='text-white my-3 font-monospace text-2xl  font-medium'>{title?.length > 20 ? `${title.slice(0, 20)}...` : title}</h3>
    :
    <div>
      <p className='text-white my-3'>{duration}</p>
      <h3 className='text-white my-3 font-monospace text-2xl  font-medium'>{filename && filename?.length > 20 ? `${filename.slice(0, 20)}...` : filename}</h3>
    </div>
   }

{type === "recording" ? 

<p className="my-3 text-[14px] text-white"> {
  end_time && new Date(end_time)
  .toLocaleString('default', 
  { 
  
   hour:"2-digit",
   minute:"2-digit",
   day:"2-digit",
   month:"2-digit",
   year:"2-digit"   
})
  } 
  </p>

  :


   <div className="flex items-center gap-3">
   <p className="my-3 text-[14px] text-white"> {
   start_time && new Date(date)
   .toLocaleString('default', 
   { 
    month: 'long', 
    year:"numeric",
    day:"2-digit",
    
    
 })
   } 
   </p>

   <p className="text-white text-md font-bold">-</p>
   
   
   <p className="my-3 text-[14px] text-white"> {
    new Date(date)
   .toLocaleString('default', 
   { 
    hour:"2-digit",
    minute:"2-digit",
      
 })
   } 
   </p>

   </div>

}

   <div className="flex flex-row items-center justify-between px-3">


   {/* all participant */}
   <div>No user</div>

   
   {type === "recording" ?
  
  <button className={`${url === "" || url === undefined && "hidden"}`} onClick={() =>{
    router.push(url)
  }}>
    <PlayCircle color='#fff'/>
  </button>
  :
   <div className={`flex items-center ${type === "previous" && "hidden"}`}>
    <button onClick={() =>{
        router.push(`/meeting/${id}`)
    }} className="bg-blue-700 text-white p-2 rounded">Start</button>
    <button onClick={() =>{
         navigator.clipboard.writeText(url)
         toast({
            title:"success",
            description:"link copied"
         })
    }} className="bg-blue-700 text-white p-2 rounded mx-2 flex items-center"> 
    <Copy/>
    <span>Copy Link</span>
     </button>
   </div>

  }
   </div>
   
    </div>
  )
}

export default MeetingCard