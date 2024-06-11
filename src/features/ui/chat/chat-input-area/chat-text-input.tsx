import React from "react";
import { useTranslation } from 'react-i18next';

export const ChatTextInput = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement> // Add ChatInputAreaProps to the type definition
>(({ ...props }, ref) => {
  const { t } = useTranslation();
  return (
    <textarea
      ref={ref}
      className="p-4 w-full focus:outline-none bg-transparent resize-none "
      placeholder={t('chat:inputPlaceholder')}
      {...props}
    />
  );
});
ChatTextInput.displayName = "ChatTextInput";
