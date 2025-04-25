
"use client";
import { signOut } from "next-auth/react";

export default function LogOut() {  
     return (
       <div>
         <button className="text-white ml-2" type="button" onClick={() => signOut()}>log out</button>
       </div>
     );
   }
   