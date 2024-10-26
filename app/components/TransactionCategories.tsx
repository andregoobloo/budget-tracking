"use client";

import { useQuery } from "@tanstack/react-query";
import { TransactionType } from "../lib/types";
import { useCallback, useEffect, useState } from "react";
import { Category } from "@prisma/client";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./ui/command";
import CreateCategoryDialog from "./CreateCategoryDialog";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "../lib/utils";

interface Props {
  type: TransactionType;
  onChange: (value: string) => void;
}

export default function TransactionCategories({ type, onChange }: Props) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  useEffect(() => {
    if (!value) return;
    onChange(value);
  }, [onChange, value]);

  const categoriesQuery = useQuery({
    queryKey: ["categories", type],
    queryFn: () =>
      fetch(`/api/categories?type=${type}`).then((res) => res.json()),
  });

  const selectedCategory = categoriesQuery.data?.find(
    (category: Category) => category.name === value
  );

  const successCallback = useCallback(
    (category: Category) => {
      setValue(category.name);
      setOpen((prev) => !prev);
    },
    [setValue, setOpen]
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          role="combobox"
          aria-expanded={open}
          className="w-48 justify-between"
        >
          {selectedCategory ? (
            <CategoryRow category={selectedCategory} />
          ) : (
            "Select Category"
          )}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-48">
        <Command onSubmit={(e) => e.preventDefault()}>
          <CommandInput placeholder="Search Category..." />
          <CreateCategoryDialog type={type} successCallBack={successCallback} />
          <CommandEmpty>
            <p>Category not found</p>
          </CommandEmpty>
          <CommandGroup>
            <CommandList>
              {categoriesQuery.data &&
                categoriesQuery.data.map((category: Category) => (
                  <CommandItem
                    key={category.name}
                    onSelect={() => {
                      setValue(category.name);
                      setOpen((prev) => !prev);
                    }}
                  >
                    <CategoryRow category={category} />
                    <Check
                      className={cn(
                        "mx-2 w-4 h-4 opacity-0",
                        value === category.name && "opacity-100"
                      )}
                    />
                  </CommandItem>
                ))}
            </CommandList>
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

function CategoryRow({ category }: { category: Category }) {
  return (
    <div className="flex items-center gap-2">
      <span role="img">{category.icon}</span>
      <span>{category.name}</span>
    </div>
  );
}
