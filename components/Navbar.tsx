import { UserButton } from "@clerk/nextjs";
import React from "react";
import { MainNav } from "./MainNav";
import StoreSwitcher from "./StoreSwitcher";

const Navbar = () => {
  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4 ">
        <StoreSwitcher/>
        <MainNav className="mx-6"/>
        <div className="ml-auto flex items-center space-x-4">
          <UserButton />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
