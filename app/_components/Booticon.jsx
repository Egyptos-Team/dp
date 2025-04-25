
import Image from 'next/image'
import Link from 'next/link'
export default function Booticon() {


        
       
  return (
    <Link href="/chat" className={`fixed right-3 bottom-16 z-50 `} >
        <Image 
            src="../../bor.png"
            width={50}
            height={50}
            alt="bot"
            unoptimized
        />
    </Link>
  )
}
