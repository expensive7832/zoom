import GetCallDetails from "@/lib/hooks/GetCallDetails";
import {
  CallControls,
  DeviceSettings,
  StreamCall,
  StreamTheme,
  VideoPreview,
  useCall,
} from "@stream-io/video-react-sdk";
import React, { useEffect, useState } from "react";

function SetVideo({setsetupiscomplete}:{setsetupiscomplete: any}) {
  const [isMicroPhoneToggle, setIsMicroPhoneToggle] = useState<boolean>();

  const call = useCall();

  useEffect(() => {
    if (isMicroPhoneToggle) {
      call?.camera?.disable();
      call?.microphone?.disable();
    } else {
      call?.camera?.enable();
      call?.microphone?.enable();
    }
  }, [isMicroPhoneToggle, call?.camera, call?.microphone]);

  if (!call) {
    alert("call must be present");
  }

  return (
    <div className="w-screen flex-col h-screen flex justify-center items-center">
      <div className="">
        <VideoPreview />
      </div>
      <div className="flex my-2 items-center gap-4 justify-between ">
        <div className="flex items-center justify-center gap-2 my-3">
          <input onChange={() =>setIsMicroPhoneToggle((prev) => !prev)} type="checkbox" id="turnoff" />
          <label htmlFor="turnoff" className="text-white">join by turning mic and camera off</label>
        </div>
         <DeviceSettings />
      </div>

      <button onClick={() => {
        call?.join()
        setsetupiscomplete(true)
      }} className="bg-green-500 rounded p-3 font-bold text-white">Join Meeting</button>
    </div>
  );
}

export default SetVideo;
