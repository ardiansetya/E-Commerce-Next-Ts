"use client";

import React, { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Store } from "@prisma/client";
import { useStoreModal } from "@/hooks/useStoreModal";
import { useParams, useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { Check, ChevronDown, PlusCircle, StoreIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "./ui/command";
import { CommandGroup } from "cmdk";
import { ClerkLoading } from "@clerk/nextjs";

type PopoverTriggerProps = React.ComponentPropsWithoutRef<
  typeof PopoverTrigger
>;

interface StoreSwitcherProps extends PopoverTriggerProps {
  items: Store[];
}
const StoreSwitcher = ({ className, items = [] }: StoreSwitcherProps) => {
  const [open, setOpen] = useState(false);

  const storeModal = useStoreModal();
  const params = useParams();
  const router = useRouter();

  console.log({params})

  const formattedItems = items.map((item) => ({
    ...item,
    label: item.name,
    value: item.id,
  }));

  const onStoreSelect = (store: Store) => {
    setOpen(false);
    router.push(`/${store.id}`);
  };

  const currentStore = formattedItems.find(
    (item) => item.value === params.storeId
  );

  

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          className={cn("w-[200px] justify-between", className)}
          variant={"outline"}
          role="combobox"
          aria-label="Select a store"
          aria-expanded={open}
          size={"sm"}>
          <StoreIcon className="w-4 h-4 mr-2" />
          {currentStore?.label}
          <ChevronDown className="w-4 h-4 shrink-0 opacity-50 ml-auto" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandList>
            <CommandInput placeholder="Search store..." />
            <CommandEmpty>No store found.</CommandEmpty>
            <CommandGroup  heading="Stores">
              {formattedItems.map((store) => (
                <CommandItem
                  key={store.value}
                  onSelect={() => onStoreSelect(store)}
                  className="text-sm">
                  <StoreIcon className="w-4 h-4" />
                  {store.label}
                  <Check
                    className={cn(
                      "ml-auto h-4 w-4",
                      currentStore?.value === store.value
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
          <CommandSeparator />
          <CommandList>
            <CommandGroup>
              <CommandItem
                onSelect={() => {
                  setOpen(false);
                  storeModal.onOpen();
                }}
                className="">
                <PlusCircle className="mr-2 w-5 h-5" />
                Create Store
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default StoreSwitcher;
