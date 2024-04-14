import { Home } from "lucide-react";
import { CreateChatAndRedirect } from "../chat-services/chat-thread-service";
import { ChatContextMenu } from "./chat-context-menu";
import { NewChat } from "./new-chat";
import { menuIconProps } from "@/features/ui/menu";
import Link from "next/link";

export const ChatMenuHeader = () => {
  return (
    <div className="w-full p-2 px-3 flex items-center justify-between">
      <Link href="/home"><Home {...menuIconProps} /></Link>
      <form action={CreateChatAndRedirect} className="flex gap-2 pr-3">
        <NewChat />
        <ChatContextMenu />
      </form>
    </div>
  );
};
