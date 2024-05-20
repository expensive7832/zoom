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
import Loader from "./Loader";

const MeetingModal = ({
  open,
  close,
}: {
  open: boolean;
  close: () => void;
}) => {
  const router = useRouter();

  const user = useSelector((state: any) => state?.user?.info);

  const client = useStreamVideoClient();

  const [meetinginfo, setmeetinginfo] = useState({
    starts_at: new Date().toISOString(),
    description: "",
    host: user?.uid,
  });

  const [callDetails, setcallDetails] = useState<Call>();
  const [loading, setLoading] = useState<boolean>();

  const createMeeting = async () => {
    
    setLoading(true)

    try {

    

      if (user == undefined || !client) throw new Error("authentication failed, please try again");

      let callID = crypto.randomUUID();

      const call = client.call("default", callID);

      if(!call) throw new Error("please try again ")

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

      if (meetinginfo?.description == "") {
        setLoading(false)
        router.push("/meeting/" + call?.id);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>

{/* schedule meeting */}
    {
      !callDetails ?

      <Dialog open={open} onOpenChange={close}>
        <DialogContent>
       
          <DialogDescription>
            <Button onClick={createMeeting} variant={"bluebg"}>
              {
                loading ?

                <Loader/>

                :

                "Schedule Meeting"
              }
            </Button>
          </DialogDescription>
        </DialogContent>
      </Dialog>
      

      :

      ""
    }

      <Dialog open={open} onOpenChange={close}>
        <DialogContent>
       
          <DialogDescription>
            <Button onClick={createMeeting} variant={"bluebg"}>
              {
                loading ?

                <Loader/>

                :

                "Create Instant Meeting"
              }
            </Button>
          </DialogDescription>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MeetingModal;
