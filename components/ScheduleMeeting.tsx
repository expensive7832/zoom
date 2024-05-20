import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useSelector } from "@/lib/redux/store";
import { useRouter } from "next/navigation";
import Image from "next/image";
import DatePicker from "react-datepicker";
import { Textarea } from "@/components/ui/textarea"
import Loader from "./Loader";
import { BadgeCheck, Copy } from "lucide-react";


const ScheduleModal = ({
  open,
  close,
}: {
  open: boolean;
  close: () => void;
}) => {
  const router = useRouter();

  const [startDate, setStartDate] = useState(new Date());

  const user = useSelector((state: any) => state?.user?.info);

  const client = useStreamVideoClient();

  const [meetinginfo, setmeetinginfo] = useState<any>({
    starts_at: new Date().toISOString(),
    description: "",
    host: user?.uid,
  });

  const [callDetails, setcallDetails] = useState<Call>();
  const [loading, setLoading] = useState<boolean>();
  const [copy, setCopy] = useState<boolean>(false);

  const scheduleMeeting = async () => {
    
    setLoading(true)

    try {

     

      if (user == undefined || !client) throw new Error("try again");

      let callID = crypto.randomUUID();

      const call = client.call("default", callID);

      if(!call ) throw new Error("call create failed, please try again")

      if(meetinginfo?.starts_at === "" || meetinginfo?.description === "") throw new Error(" field cannot be empty ")

      await call.getOrCreate({
        data: {
          starts_at: meetinginfo?.starts_at,
          custom: {
            description: meetinginfo?.description,
            host: meetinginfo?.host,
          },
        },
      });

      setcallDetails(call);
      setLoading(false)

      if (meetinginfo?.description == "") {
        setLoading(false)
        router.push("/meeting/" + call?.id);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const copyMeetingCode = () => {

    setCopy(true)

    let url = `${process.env.NEXT_PUBLIC_SITE_URL}/${callDetails?.id}`
    navigator.clipboard.writeText(url);

    setTimeout(() =>{
      setCopy(false)
    }, 1000)
  }


  return (
    <div className="">
      {!callDetails ?
    
      <Dialog open={open} onOpenChange={close}>
        <DialogContent>
       <DialogHeader>Create Meeting</DialogHeader>
          <DialogDescription>

            <form >

            <Textarea className="resize-none w-full  outline-0  focus:ring-0  "
            onChange={(e) => setmeetinginfo({...meetinginfo, description: e.target.value})}
            />

            <div className="my-4">
            <label htmlFor="" className="block ">Pick Date and Time</label> <br />
            <DatePicker 
            selected={startDate}
             onChange={(date: Date) => setmeetinginfo({...meetinginfo, starts_at: new Date(date).toISOString() })} 
             dateFormat="dd/mm/yyyyy h:m:sa"
             
             className="cursor-pointer w-full"
             />
            </div>


            </form>

            <div className="m-auto">
            <Button onClick={scheduleMeeting} variant={"bluebg"}>
              {
                loading ?

               <Loader/>

                :

                "Schedule Meeting"
              }
            </Button>
            </div>
          </DialogDescription>
        </DialogContent>
      </Dialog>

      :

      <Dialog open={open} onOpenChange={close}>
        <DialogContent>
       
          <DialogDescription className="flex items-center justify-center flex-col">

          <BadgeCheck color="blue" size={32} />

            {
              copy ? 
             
              <h1 className="bg-dark-2 my-4 p-2 rounded-md text-white">Link copied</h1>
              
              :
              <>
              <h4 className="font-bold my-2 text-center">Meeting Created</h4>
              <Button className="mt-4" onClick={copyMeetingCode} variant={"bluebg"}> 
              <Copy/> Copy Invitation</Button>
              </>
            }

              <Button className="mt-4" w-full onClick={() =>{
                setcallDetails(undefined)
                close()
                 router.push("/")
              }}  variant={"default"}> 
              Close </Button>
          </DialogDescription>
        </DialogContent>
      </Dialog>
    
    }
    </div>
  );
};

export default ScheduleModal;
