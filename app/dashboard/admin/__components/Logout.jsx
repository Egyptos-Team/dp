
"use client";
import { signOut } from "next-auth/react";

export default function Logout() {  // بدل Siginin
     return (
       <div>
         <button type="button" onClick={() => signOut()}>log out</button>
         {localStorage.removeItem("User")}

       </div>
     );
   }
   