"use client"

import StreamContext from "@/StreamContext";
import {  useSelector } from "@/lib/redux/store";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

const authuser = useSelector((state: any) => state.user.info)

return (
   
     <StreamContext authuser={authuser}>
        {children}
     </StreamContext>
  
  );
}
