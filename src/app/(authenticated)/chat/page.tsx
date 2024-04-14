import { ChatPage } from "@/features/chat-page/chat-page";
import { FindAllExtensionForCurrentUser } from "@/features/extensions-page/extension-services/extension-service";
import { DisplayError } from "@/features/ui/error/display-error";

export default async function Home() {
  const [extensionResponse] = await Promise.all([
    FindAllExtensionForCurrentUser(),
  ]);

  if (extensionResponse.status !== "OK") {
    return <DisplayError errors={extensionResponse.errors} />;
  }
  return (
    <ChatPage
      messages={[]}
      chatDocuments={[]}
      extensions={extensionResponse.response}
    />
  );
}
