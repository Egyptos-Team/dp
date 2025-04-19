
"use client";
import { signOut } from "next-auth/react";

export default function LogOut() {  // بدل Siginin
     return (
       <div>
         <button type="button" onClick={() => signOut()}>log out</button>
       </div>
     );
   }
   