"use client";
import { useTranslation } from 'react-i18next';
import { cn } from "@/ui/lib";
import { MenuItem, menuIconProps } from "@/ui/menu";
import { PanelLeftClose } from "lucide-react";
import { menuStore, useMenuState } from "./menu-store";

export const MenuTrayToggle = () => {
  const { t } = useTranslation();
  const { isMenuOpen } = useMenuState();

  return (
    <MenuItem
      onClick={() => menuStore.toggleMenu()}
      tooltip={isMenuOpen ? t('mainMenu:closeMenu') : t('mainMenu:openMenu')}
    >
      <PanelLeftClose
        {...menuIconProps}
        className={cn(
          "transition-all rotate-180 duration-700",
          isMenuOpen ? "rotate-0" : ""
        )}
      />
    </MenuItem>
  );
};
