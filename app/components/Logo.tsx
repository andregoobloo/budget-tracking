import { BadgeDollarSign } from "lucide-react";
import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/" className="flex gap-2 items-center">
      <BadgeDollarSign className=" stroke stroke-[1.2] stroke-green-500 h-10 w-10" />
      <p className="uppercase text-2xl bg-gradient-to-r from-green-400 to-green-800 bg-clip-text text-transparent">
        budget tracker
      </p>
    </Link>
  );
}
