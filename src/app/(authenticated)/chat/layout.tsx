import { ChatMenu } from "@/features/chat-page/chat-menu/chat-menu";
import { ChatMenuHeader } from "@/features/chat-page/chat-menu/chat-menu-header";
import { FindAllChatThreadForCurrentUser } from "@/features/chat-page/chat-services/chat-thread-service";
import { MenuTray } from "@/features/main-menu/menu-tray";
import { cn } from "@/ui/lib";

import { AI_NAME } from "@/features/theme/theme-config";
import { DisplayError } from "@/features/ui/error/display-error";
import { ScrollArea } from "@/features/ui/scroll-area";
import { MainMenu } from "@/features/main-menu/main-menu";
import { MenuTrayToggle } from "@/features/main-menu/menu-tray-toggle";

export const dynamic = "force-dynamic";

export const metadata = {
  title: AI_NAME,
  description: AI_NAME,
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const chatHistoryResponse = await FindAllChatThreadForCurrentUser();

  if (chatHistoryResponse.status !== "OK") {
    return <DisplayError errors={chatHistoryResponse.errors} />;
  }

  return (
    <div className="flex flex-1 grow">
      <div className={cn("flex flex-col relative")}>
        <MenuTray className={cn("flex flex-col grow")}>
          <ChatMenuHeader />
          <ScrollArea>
            <ChatMenu menuItems={chatHistoryResponse.response} />
          </ScrollArea>
          <MainMenu />
        </MenuTray>
        <MenuTrayToggle />
      </div>
      {children}
    </div>
  );
}
