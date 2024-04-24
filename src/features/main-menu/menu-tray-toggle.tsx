"use client";
import { cn } from "@/ui/lib";
import { MenuItem, menuIconProps } from "@/ui/menu";
import { ChevronLeft } from "lucide-react";
import { menuStore, useMenuState } from "./menu-store";

export const MenuTrayToggle = () => {
  const { isMenuOpen } = useMenuState();

  return (
    <MenuItem
      onClick={() => menuStore.toggleMenu()}
      tooltip="Open and Collapse menu"
      // className={cn("absolute top-1/2 translate-x-full -translate-y1/2 w-10 z-100")}
      style={{
        position: "absolute",
        top: '50%',
        transform: 'translate(100%, -50%)',
        right: 0,
        width: "2.5rem",
        zIndex: 100
      }}
    >
      <ChevronLeft
        {...menuIconProps}
        className={cn(
          "transition-all rotate-180 duration-700 hover:bg-primary hover:text-white rounded scale-y-150",
          isMenuOpen ? "rotate-0" : "bg-primary text-white ml-2"
        )}
      />
    </MenuItem>
  );
};
