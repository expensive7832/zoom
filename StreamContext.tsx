"use client";

import { ReactNode, useEffect, useState } from "react";
import { StreamVideo, StreamVideoClient } from "@stream-io/video-react-sdk";
import { firebaseapp } from "@/lib/firebase";
import Loader from "./components/Loader";
import type { User } from "@stream-io/video-react-sdk";
import tokenProvider from "./lib/actions/tokenProvider";
import { useRouter } from "next/navigation";
import { useSelector } from "./lib/redux/store";
import { useToast } from "@/components/ui/use-toast";

export const StreamContext = ({
  children,
  authuser,
}: {
  children: ReactNode;
  authuser: any;
}) => {
  const [videoClient, setVideoClient] = useState<StreamVideoClient>();

  const router = useRouter();

  const { toast } = useToast();

  const [user, setuser] = useState<any>();

  const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;

  
  try {
    useEffect(() => {

     
        const initiateClient = async () => {

          if (authuser?.uid === "") {
            alert("authentication failed")
            router.push("/auth");
          } else if (!apiKey) {
            alert("api key must be provided")
          }else{

            const user: User = {
              id: authuser?.uid ,
              name: authuser?.displayName || authuser?.uid,
              image:
                authuser?.photoURL || require("./public/userplaceholder.png"),
            };
  
            let token: any = await tokenProvider(authuser?.uid);
  
            if (token === undefined) {
              toast({
                title:"token failed, please try again later"
              })
            }
  
            const client = new StreamVideoClient({
              apiKey,
              user,
              tokenProvider: token,
            });
  
            setVideoClient(client);

          }
        };

        initiateClient();
     
    }, [authuser]);
  } catch (error: any) {
    toast({
      title: "error",
      description: error?.message,
    });
  }

  if (!videoClient) return <Loader />;

  return <StreamVideo client={videoClient}>{children}</StreamVideo>;
};

export default StreamContext;
