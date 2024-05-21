//@ts-nocheck
import Image from "next/image";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { LogOutIcon, Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import links from "./SidebarLink";
import { usePathname, useRouter } from "next/navigation";
import { useSelector } from "@/lib/redux/store";
import { firebaseapp } from "@/lib/firebase";

const NavBar = () => {

  const user: any = useSelector((state) => state?.user?.info)

  const login: any = useSelector((state) => state?.user?.login) 

  
  

  const [closesheet, setclosesheet] = useState<boolean>(false)

  window.onresize = function(){
    let screen = window.matchMedia("(max-width: 768px)").matches

    if(screen){
      setclosesheet(true)
    }
  }

  const router = useRouter()

  const pathname = usePathname();

  return (
    <div className="flex justify-between items-center bg-dark-2 p-5">
      <div className="flex gap-3 items-center">
      
        <Image
          src={require("@/public/logo.png")}
          alt="logo"
          width={50}
          height={50}
        />

        <h5 className="text-white font-bold text-2xl">YOOM</h5>
      </div>

      <div>
       {
        login === false ?

        <button onClick={() => router.push("/auth")} className="bg-white p-3 rounded font-bold">Login</button>
        :

        <Image
        src={user?.photoURL}
        alt="user image"
        width={100}
        height={100}
        className="w-16 h-16 object-cover "
        style={{ borderRadius: "50%" }}
      />
       }
      </div>

      <Sheet >
          <SheetTrigger asChild>
          <Button
          className="md:hidden block"
        >
          <Menu />
        </Button>
          </SheetTrigger>
          <SheetContent
          side={"left"}
          
          
          >
            <SheetHeader>
              
              <SheetDescription>
              <div className=' min-h-screen relative'>
        {
            links?.map((each) =>(
                <div key={each?.id} className={`flex gap-5 my-10 items-center p-3 cursor-pointer rounded-sm ${pathname == each?.url && "bg-blue-600 text-white"}`}>
                    <Image
                    src={each.img}
                    alt='links icon'
                    height={30}
                    width={30}
                    />

                    <h6 className='text-lg'>{each?.title}</h6>
                </div>
            ))
        }

        <div className="absolute bottom-0">

            
            <LogOutIcon color='red'/>
          
        </div>
    </div>
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
    </div>
  );
};

export default NavBar;
