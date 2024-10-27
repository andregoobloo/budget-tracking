"use client";

import { differenceInDays, startOfYear } from "date-fns";
import { DateRangePicker } from "../components/DateRangePicker";
import Navbar from "../components/Navbar";
import { MAX_DATE_RANGE_DAYS } from "../lib/constants";
import { toast } from "sonner";
import { useState } from "react";
import TransactionsTable from "../components/TransactionsTable";

export default function TransactionsPage() {
  const [dateRange, setDateRange] = useState<{ from: Date; to: Date }>({
    from: startOfYear(new Date()),
    to: new Date(),
  });
  return (
    <>
      <header>
        <Navbar />
      </header>
      <main>
        <div className="border-b bg-card w-full">
          <div className=" flex flex-wrap items-center justify-between gap-6 py-8">
            <div>
              <p className="text-3xl font-bold">Transactions History</p>
            </div>
            <DateRangePicker
              initialDateFrom={dateRange.from}
              initialDateTo={dateRange.to}
              showCompare={false}
              onUpdate={(values) => {
                const { from, to } = values.range;

                // Update the range only if both dates are set
                if (!from || !to) return;
                if (differenceInDays(to, from) > MAX_DATE_RANGE_DAYS) {
                  toast.error(
                    `The selected data range is too big. The maximum range is ${MAX_DATE_RANGE_DAYS} days`
                  );
                  return;
                }
                setDateRange({ from, to });
              }}
            />
          </div>
        </div>
        <div className="">
          <TransactionsTable from={dateRange.from} to={dateRange.to} />
        </div>
      </main>
    </>
  );
}
