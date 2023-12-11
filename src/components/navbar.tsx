import React from "react";
import { CustomConnectWallet } from "./custom-connect-wallet";
import Logo from "./logo";
import { ModeToggle } from "./theme-toggle";
import UserProfileButton from "./user-profile-button";
import SigninButton from "./signin-button";
import { getRequireNextAuthSession } from "@/lib/utils";


export const Navbar = async () => {
 const session = await getRequireNextAuthSession();

 return (
  <header className="w-full h-14 fixed top-0 shadow-lg backdrop-blur-md bg-transparent z-30">
   <nav className="w-full h-full flex items-center justify-between md:container my-auto mx-auto">
    <div className="flex items-center">
     <Logo session={session} />
    </div>
    <ul className="flex items-center gap-x-3">
     <li>
      <ModeToggle />
     </li>
     <li className="flex items-center gap-x-3">
      {session && session.user ?
       <>
        <CustomConnectWallet />
        <UserProfileButton session={session} />
       </>
       :
       <>
        <SigninButton />
       </>
      }
     </li>
    </ul>
   </nav>
  </header>
 );
};