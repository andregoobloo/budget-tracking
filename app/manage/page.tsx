"use client";

import CurrencySelector from "../components/CurrencySelector";
import Navbar from "../components/Navbar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { TransactionType } from "../lib/types";
import SkeletonWrapper from "../components/SkeletonWrapper";
import { PlusSquare, TrashIcon, TrendingDown, TrendingUp } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import CreateCategoryDialog from "../components/CreateCategoryDialog";
import { Button } from "../components/ui/button";
import { Separator } from "../components/ui/separator";
import { Category } from "@prisma/client";
import DeleteCategoryDialog from "../components/DeleteCategoryDialog";

export default function ManagePage() {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <main>
        <div className="border-b bg-card">
          <div className=" flex flex-wrap items-center justify-betweengap-6 py-8">
            <div>
              <p className="text-3xl font-bold">Manage</p>
              <p className="text-muted-foreground">
                Manage your account settings and categories
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Currency</CardTitle>
              <CardDescription>Set your default currency</CardDescription>
            </CardHeader>
            <CardContent>
              <CurrencySelector />
            </CardContent>
          </Card>
          <CategoryList type="income" />
          <CategoryList type="expense" />
        </div>
      </main>
    </>
  );
}

function CategoryList({ type }: { type: TransactionType }) {
  const categoriesQuery = useQuery({
    queryKey: ["categories", type],
    queryFn: () =>
      fetch(`/api/categories?type=${type}`).then((res) => res.json()),
  });

  const dataAvailible = categoriesQuery.data && categoriesQuery.data.length > 0;

  return (
    <SkeletonWrapper isLoading={categoriesQuery.isLoading}>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              {type === "expense" ? (
                <TrendingDown className="h-12 w-12 items-center rounded-lg bg-red-400/10 p-2 text-rose-800" />
              ) : (
                <TrendingUp className="h-12 w-12 items-center rounded-lg bg-emerald-400/10 p-2 text-emerald-800" />
              )}
              <div>
                <h3>{type === "income" ? "Income" : "Expense"} Categories</h3>
                <p className="text-xs text-muted-foreground">Sorted by name</p>
              </div>
            </div>
            <CreateCategoryDialog
              type={type}
              successCallBack={() => categoriesQuery.refetch()}
              trigger={
                <Button variant="outline" className="gap-2 text-sm">
                  <PlusSquare className="h-4 w-4" />
                  Create category
                </Button>
              }
            />
          </CardTitle>
        </CardHeader>
        <Separator />
        {!dataAvailible && (
          <div className="flex h-40 w-full flex-col items-center justify-center">
            <p>No {type} categories yet</p>
            <p className="text-muted-foreground text-sm">
              Create one to get started
            </p>
          </div>
        )}
        {dataAvailible && (
          <div className="grid grid-flow-row gap-2 p-2 sm:grid-flow-row sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {categoriesQuery.data.map((category: Category) => (
              <CategoryCard category={category} key={category.name} />
            ))}
          </div>
        )}
      </Card>
    </SkeletonWrapper>
  );
}

function CategoryCard({ category }: { category: Category }) {
  return (
    <div className="flex border-separate flex-col justify-between rounded-md border shadow-md shadow-black/[0.1] dark:shadow-white/[0.1]">
      <div className="flex flex-col items-center gap-2 p-4">
        <span role="img" className="text-3xl">
          {category.icon}
        </span>
        <span>{category.name}</span>
      </div>
      <DeleteCategoryDialog
        category={category}
        trigger={
          <Button
            className="flex w-full border-separate items-center gap-2 rounded-t-none text-muted-foreground hover:bg-red-500/20"
            variant={"secondary"}
          >
            <TrashIcon />
            Remove
          </Button>
        }
      />
    </div>
  );
}
