import { GetFormatterForCurrency } from "@/app/helpers/GetFormatterForCurrency";
import prisma from "@/app/lib/prisma";
import { OverviewQuerySchema } from "@/schema/overview";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export async function GET(request: Request) {
  const user = await currentUser();
  if (!user) {
    redirect("/sign-in");
  }
  const { searchParams } = new URL(request.url);
  const from = searchParams.get("from");
  const to = searchParams.get("to");

  const queryParams = OverviewQuerySchema.safeParse({ from, to });

  if (!queryParams.success) {
    return Response.json(queryParams.error.message, { status: 400 });
  }

  const transactions = await getTransactionsHistory(
    user.id,
    queryParams.data.from,
    queryParams.data.to
  );

  return Response.json(transactions);
}

export type GetTransactionsHistoryResponseType = Awaited<
  ReturnType<typeof getTransactionsHistory>
>;

async function getTransactionsHistory(userid: string, from: Date, to: Date) {
  const userSettings = await prisma.userSettings.findUnique({
    where: {
      userId: userid,
    },
  });

  if (!userSettings) {
    throw new Error("User settings not found");
  }

  const formatter = GetFormatterForCurrency(userSettings.currency);

  const transactions = await prisma.transaction.findMany({
    where: {
      userid,
      date: {
        gte: from,
        lte: to,
      },
    },
    orderBy: {
      date: "desc",
    },
  });

  return transactions.map((transaction) => ({
    ...transaction,
    // Format amount with the users selected currency
    formattedAmount: formatter.format(transaction.amount),
  }));
}
