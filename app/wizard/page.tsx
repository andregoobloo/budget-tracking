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
    <div className="flex flex-col items-center justify-between gap-2">
      <h1 className="text-center text-2xl"> Welcome, {user.firstName}</h1>
      <h3 className="text-center">Let&apos;s pick your currency</h3>
      <h5>You can change these settings at any time</h5>
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
      <Separator />
      <Button className="w-1/2" asChild>
        <Link href="/">I&apos;m done!</Link>
      </Button>
      <Logo />
    </div>
  );
}
