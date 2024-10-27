import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Separator } from "../components/ui/separator";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import Link from "next/link";
import Logo from "../components/Logo";
import CurrencySelector from "../components/CurrencySelector";

export default async function WizardPage() {
  const user = await currentUser();
  if (!user) redirect("/sign-in");
  return (
    <div className="flex w-1/2 mx-auto h-screen items-center justify-center">
      <div className="w-full flex flex-col items-center justify-between gap-6">
        <Logo />
        <Separator />
        <h1 className="text-center text-2xl"> Welcome, {user.firstName}</h1>
        <h3 className="text-center text-muted-foreground">
          Let&apos;s pick your currency
        </h3>
        <h5 className="text-center text-muted-foreground">
          You can change these settings at any time
        </h5>
        <Separator />
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Currency</CardTitle>
            <CardDescription>Set your default currency</CardDescription>
            <CardContent>
              <CurrencySelector />
            </CardContent>
          </CardHeader>
        </Card>
        <Button className="w-1/2" asChild>
          <Link href="/">I&apos;m done!</Link>
        </Button>
      </div>
    </div>
  );
}
