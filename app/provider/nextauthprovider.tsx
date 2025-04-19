'use client';  
import { SessionProvider } from 'next-auth/react'
 const Nextauthprovider=({children}:{children: React.ReactNode}) => {
  return (
    
         <div> <SessionProvider> {children} </SessionProvider></div>
    
  )
}
export default Nextauthprovider