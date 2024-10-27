import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import prisma from "./lib/prisma";
import Navbar from "./components/Navbar";
import { Button } from "./components/ui/button";
import TransactionDialog from "./components/TransactionDialog";
import Overview from "./components/Overview";
import History from "./components/History";

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
      <main>
        <div className="flex h-screen w-full flex-col">
          <div className="border-b bg-card">
            <div className="flex flex-wrap items-center justify-between gap-6 py-8">
              <p className="text-2xl font-bold">Hello, {user.firstName}!</p>
              <div className="flex items-center gap-3">
                <TransactionDialog
                  trigger={
                    <Button
                      variant={"outline"}
                      className="border-emerald-500 bg-emerald-950 text-white hover:bg-emerald-800 transition-all duration-300"
                    >
                      New income
                    </Button>
                  }
                  type="income"
                />
                <TransactionDialog
                  trigger={
                    <Button
                      variant={"outline"}
                      className="border-rose-500 bg-rose-950 text-white hover:bg-rose-800 transition-all duration-300"
                    >
                      New expense
                    </Button>
                  }
                  type="expense"
                />
              </div>
            </div>
          </div>
          <Overview userSettings={userSettings} />
          <History userSettings={userSettings} />
        </div>
      </main>
      ;
    </>
  );
}
