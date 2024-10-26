"use client";

import { UserSettings } from "@prisma/client";
import { differenceInDays, startOfMonth } from "date-fns";
import { useState } from "react";
import { DateRangePicker } from "./DateRangePicker";
import { MAX_DATE_RANGE_DAYS } from "../lib/constants";
import { toast } from "sonner";
import StatsCards from "./StatsCards";
import StatCategories from "./StatCategories";

export default function Overview({
  userSettings,
}: {
  userSettings: UserSettings;
}) {
  const [dateRange, setDateRange] = useState<{ from: Date; to: Date }>({
    from: startOfMonth(new Date()),
    to: new Date(),
  });
  return (
    <>
      <div className="container flex flex-wrap items-center justify-between gap-2 py-6 px-6">
        <h2 className="text-3xl font-bold">Overview</h2>
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
      <div className="px-6">
        <StatsCards
          userSettings={userSettings}
          from={dateRange.from}
          to={dateRange.to}
        />
        <StatCategories
          userSettings={userSettings}
          from={dateRange.from}
          to={dateRange.to}
        />
      </div>
    </>
  );
}
