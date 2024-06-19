import { Send } from "lucide-react";
import React from "react";
import { Button } from "../../button";
import { useTranslation } from 'react-i18next';

export const SubmitChat = React.forwardRef<
  HTMLButtonElement,
  React.HTMLAttributes<HTMLButtonElement> // Add ChatInputAreaProps to the type definition
>(({ ...props }, ref) => {
  const { t } = useTranslation('chat');
  return (
    <Button
      size="icon"
      type="submit"
      variant={"ghost"}
      {...props}
      ref={ref}
      aria-label={t('submitMessage')}
      title={t('submitMessage')}
    >
      <Send size={16} />
    </Button>
  )
});
SubmitChat.displayName = "ChatInputArea";
