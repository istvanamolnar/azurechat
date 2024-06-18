import { MenuTrayToggle } from "@/features/main-menu/menu-tray-toggle";
import {
  Menu,
  MenuBar,
  MenuItem,
  MenuItemContainer,
  menuIconProps,
} from "@/ui/menu";
import {
  Book,
  Home,
  MessageCircle,
  Blocks,
  HardDrive,
  UserRoundCog,
} from "lucide-react";
import { getCurrentUser } from "../auth-page/helpers";
import { MenuLink } from "./menu-link";
import { UserProfile } from "./user-profile";
import initTranslations from '@/app/i18n';
import Image from "next/image";

export const MainMenu = async ({locale}: { locale: 'de' | 'en' }) => {
  const { t } = await initTranslations(locale, ['mainMenu']);
  const user = await getCurrentUser();

  return (
    <Menu>
      <MenuBar>
        <MenuItemContainer>
          <MenuItem tooltip={t('homePage')} asChild>
            <MenuLink href="/chat" ariaLabel="Go to the Home page">
              {/* <Home {...menuIconProps} /> */}
              <Image
                src={"/ai-icon.png"}
                width={24}
                height={24}
                quality={50}
                alt="home-icon"
              />
            </MenuLink>
          </MenuItem>
          <MenuTrayToggle />
        </MenuItemContainer>
        <MenuItemContainer>
          <MenuItem tooltip="Chat">
            <MenuLink href="/chat" ariaLabel="Go to the Chat page">
              <MessageCircle {...menuIconProps} />
            </MenuLink>
          </MenuItem>
          <MenuItem tooltip="Persona">
            <MenuLink href="/persona" ariaLabel="Go to the Persona configuration page">
              <UserRoundCog {...menuIconProps} />
            </MenuLink>
          </MenuItem>
          <MenuItem tooltip="Extensions">
            <MenuLink href="/extensions" ariaLabel="Go to the Extensions configuration page">
              <Blocks {...menuIconProps} />
            </MenuLink>
          </MenuItem>
          <MenuItem tooltip="Prompts">
            <MenuLink href="/prompt" ariaLabel="Go to the Prompt Library configuration page">
              <Book {...menuIconProps} />
            </MenuLink>
          </MenuItem>
          {user.isAdmin && (
            <>
              <MenuItem tooltip="Data source">
                <MenuLink href="/documents" ariaLabel="Go to documents" >
                  <HardDrive {...menuIconProps} />
                </MenuLink>
              </MenuItem>
              {/* <MenuItem tooltip="reporting">
                <MenuLink href="/reporting" ariaLabel="Go to the Admin reporting" >
                  <HardDrive {...menuIconProps} />
                </MenuLink>
              </MenuItem> */}
            </>
          )}
        </MenuItemContainer>
        <MenuItemContainer>
          <MenuItem tooltip="Profile">
            <UserProfile />
          </MenuItem>
        </MenuItemContainer>
      </MenuBar>
    </Menu>
  );
};
