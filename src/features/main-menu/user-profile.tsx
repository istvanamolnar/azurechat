"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/ui/dropdown-menu";
import { menuIconProps } from "@/ui/menu";
import { CircleUserRound, Laptop2, LogOut, Moon, Palette, PocketKnife, Sun, VenetianMask } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { Avatar, AvatarImage } from "../ui/avatar";
import { ThemeToggle } from "./theme-toggle";
import { MenuLink } from "./menu-link";
import { useTheme } from "next-themes";
import { cn } from "../ui/lib";
import { Direction } from "@uiw/react-codemirror";

export const UserProfile = () => {
  const { data: session } = useSession();
  const { setTheme, theme } = useTheme();

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
      <DropdownMenuContent side="top" className="w-64" align="start">
        <DropdownMenuLabel className="font-normal">
          <div className="flex align-center justify-between">
            <div className="flex flex-col gap-2">
              <p className="text-sm font-medium leading-none">
                {session?.user?.name}
              </p>
              <p className="text-xs leading-none text-muted-foreground">
                {session?.user?.email}
              </p>
              {session?.user?.isAdmin &&
                <p className="text-xs leading-none text-muted-foreground">"Admin"</p>
              }
            </div>
            <div
              className="flex items-center justify-center cursor-pointer hover:bg-primary hover:text-white rounded w-8 h-8"
              onClick={() => signOut({ callbackUrl: "/" })}
              title="Abmelden"
            >
              <LogOut {...menuIconProps} size={18} />
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <Palette className="mr-2 h-4 w-4" />
            <p className="text-sm font-medium leading-none p-2">Themen wechseln</p>
          </DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent>
              <DropdownMenuItem className="cursor-pointer">
                <Sun
                  size={18}
                  className={theme === "light" ? "text-primary" : ""}
                />
                <div
                  onClick={() => setTheme("light")}
                  className={cn(
                    "flex-1 ml-2",
                    theme === "light" ? "text-primary" : ""
                  )}
                  title="Helles Thema"
                >
                  {"Helles Thema"}
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                <Moon
                  size={18}
                  className={theme === "dark" ? "text-primary" : ""}
                />
                <div
                  onClick={() => setTheme("dark")}
                  className={cn(
                    "flex-1 ml-2",
                    theme === "dark" ? "text-primary" : ""
                  )}
                  title="Dunkles Thema"
                >
                  {"Dunkles Thema"}
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                <Laptop2
                  size={18}
                  className={theme === "system" ? "text-primary" : ""}
                />
                <div
                  onClick={() => setTheme("system")}
                  className={cn(
                    "flex-1 ml-2",
                    theme === "system" ? "text-primary" : ""
                  )}
                  title="Systemmodus"
                >
                  {"Systemmodus"}
                </div>
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
        <DropdownMenuItem>
          <MenuLink href="/persona" ariaLabel="Go to the Persona configuration page">
            <div className="flex items-center justify-start">
              <VenetianMask {...menuIconProps} size={18} />
              <span className="ml-4">{'Persona'}</span>
            </div>
          </MenuLink>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <MenuLink href="/extensions" ariaLabel="Go to the Extensions configuration page">
            <div className="flex items-center justify-start">
              <PocketKnife {...menuIconProps} size={18} />
              <span className="ml-4">{'Extensions'}</span>
            </div>
          </MenuLink>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
