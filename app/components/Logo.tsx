import { BadgeDollarSign } from "lucide-react";
import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/" className="flex gap-2 items-center">
      <BadgeDollarSign className=" stroke stroke-[1.2] stroke-emerald-800 h-10 w-10 opacity-90" />
      <p className="uppercase text-2xl bg-gradient-to-r from-emerald-800 to-rose-800 bg-clip-text text-transparent">
        budget tracker
      </p>
    </Link>
  );
}
