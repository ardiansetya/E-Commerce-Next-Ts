"use client";

import React, { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Store } from "@prisma/client";
import { useStoreModal } from "@/hooks/useStoreModal";
import { useParams, useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { ChevronDown, StoreIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Command, CommandInput, CommandList } from "./ui/command";

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

  const formattedItems = items.map((item) => ({
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
          Current Store
          <ChevronDown className="w-4 h-4 shrink-0 opacity-50 ml-auto" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandList>
            <CommandInput placeholder="Search store..."/>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default StoreSwitcher;
