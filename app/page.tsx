import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import prisma from "./lib/prisma";
import Navbar from "./components/Navbar";

export default async function Home() {
  const user = await currentUser();
  if (!user) redirect("/sign-in");

  const userSettings = await prisma.userSettings.findUnique({
    where: {
      userId: user.id,
    },
  });

  if (!userSettings) redirect("/wizard");
  return (
    <>
      <header>
        <Navbar />
      </header>
      <div className="relative flex h-screen w-fill flex-col">Home</div>;
    </>
  );
}
