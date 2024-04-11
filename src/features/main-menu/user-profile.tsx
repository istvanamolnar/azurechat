"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/ui/dropdown-menu";
import { menuIconProps } from "@/ui/menu";
import { CircleUserRound, LogOut, PocketKnife, VenetianMask } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { Avatar, AvatarImage } from "../ui/avatar";
import { ThemeToggle } from "./theme-toggle";
import { MenuLink } from "./menu-link";

export const UserProfile = () => {
  const { data: session } = useSession();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="w-full flex items-center mx-4">
          {session?.user?.image ? (
            <Avatar className="">
              <AvatarImage
                src={session?.user?.image!}
                alt={session?.user?.name!}
              />
            </Avatar>
          ) : (
            <CircleUserRound {...menuIconProps} role="button" />
          )}
          <div className="flex align-center ml-6">{session?.user?.name!}</div>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent side="right" className="w-56" align="end">
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col gap-2">
            <p className="text-sm font-medium leading-none">
              {session?.user?.name}
            </p>
            <p className="text-xs leading-none text-muted-foreground">
              {session?.user?.email}
            </p>
            <p className="text-xs leading-none text-muted-foreground">
              {session?.user?.isAdmin ? "Admin" : ""}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col gap-1">
            <p className="text-sm font-medium leading-none">Themen wechseln</p>
            <ThemeToggle />
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuLabel>
          <MenuLink href="/persona" ariaLabel="Go to the Persona configuration page">
            <div className="flex items-center justify-start">
              <VenetianMask {...menuIconProps} size={18} />
              <span className="ml-4">{'Persona'}</span>
            </div>
          </MenuLink>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuLabel>
          <MenuLink href="/extensions" ariaLabel="Go to the Extensions configuration page">
            <div className="flex items-center justify-start">
              <PocketKnife {...menuIconProps} size={18} />
              <span className="ml-4">{'Extensions'}</span>
            </div>
          </MenuLink>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="flex gap-2"
          onClick={() => signOut({ callbackUrl: "/" })}
        >
          <LogOut {...menuIconProps} size={18} />
          <span>Abmelden</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
