"use client";

import { UserSettings } from "@prisma/client";
import { differenceInDays, startOfYear } from "date-fns";
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
    from: startOfYear(new Date()),
    to: new Date(),
  });
  return (
    <>
      <div className="flex flex-wrap items-center justify-between py-10">
        <h2 className="text-4xl font-bold">Overview</h2>
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
      <div>
        <StatsCards
          userSettings={userSettings}
          from={dateRange.from}
          to={dateRange.to}
        />
        <div className="mt-6">
          <StatCategories
            userSettings={userSettings}
            from={dateRange.from}
            to={dateRange.to}
          />
        </div>
      </div>
    </>
  );
}
