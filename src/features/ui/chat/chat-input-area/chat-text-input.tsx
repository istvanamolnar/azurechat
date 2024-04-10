import React from "react";

export const ChatTextInput = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement> // Add ChatInputAreaProps to the type definition
>(({ ...props }, ref) => {
  return (
    <textarea
      ref={ref}
      className="p-4 w-full focus:outline-none bg-transparent resize-none "
      placeholder="Geben Sie hier Ihre Nachricht ein..."
      {...props}
    />
  );
});
ChatTextInput.displayName = "ChatTextInput";
