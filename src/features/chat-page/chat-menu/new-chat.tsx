"use client";

import { Button } from "@/features/ui/button";
import { LoadingIndicator } from "@/features/ui/loading";
import { SquarePen } from "lucide-react";
import { useFormStatus } from "react-dom";
import { useTranslation } from 'react-i18next';

export const NewChat = () => {
  const { t } = useTranslation();
  const { pending } = useFormStatus();

  return (
    <Button
      aria-disabled={pending}
      size={"default"}
      className="flex gap-2"
      variant={"outline"}
      title={t("chat:newChat")}
    >
      {pending ? <LoadingIndicator isLoading={pending} /> : <SquarePen size={20} />}
    </Button>
  );
};
