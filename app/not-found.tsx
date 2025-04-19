import Image from "next/image";
import Link from "next/link";

function NotFound() {
  return (
    <div className=" flex flex-wrap items-center justify-center min-h-[400px] gap-x-4">
      <div >
        <Link
          href="/"
          className="relative block h-[68px] w-[191px] overflow-hidden rounded-tr-[57px] rounded-bl-[57px] border border-[#eada79]"
        >
          <Image src="/logo.png" alt="Logo" fill className="object-cover" />
        </Link>
      </div>
      <div><p className="text-[38px]">  | oops ,Page not found</p></div>
    </div>
  );
}

export default NotFound;
