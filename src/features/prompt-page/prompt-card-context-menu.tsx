"use client";

import { MoreVertical, Pencil, Trash } from "lucide-react";
import { FC, useState } from "react";
import { DropdownMenuItemWithIcon } from "../chat-page/chat-menu/chat-menu-item";
import { RevalidateCache } from "../common/navigation-helpers";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { LoadingIndicator } from "../ui/loading";
import { PromptModel } from "./models";
import { DeletePrompt } from "./prompt-service";
import { promptStore } from "./prompt-store";
import { useTranslation } from 'react-i18next';

interface Props {
  prompt: PromptModel;
}

type DropdownAction = "delete";

export const PromptCardContextMenu: FC<Props> = (props) => {
  const { t } = useTranslation("common");
  const { isLoading, handleAction } = useDropdownAction({
    prompt: props.prompt,
  });

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          {isLoading ? (
            <LoadingIndicator isLoading={isLoading} />
          ) : (
            <MoreVertical size={18} />
          )}
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItemWithIcon
            onClick={() => promptStore.updatePrompt(props.prompt)}
          >
            <Pencil size={18} />
            <span>{t('edit')}</span>
          </DropdownMenuItemWithIcon>
          <DropdownMenuItemWithIcon
            onClick={async () => await handleAction("delete")}
          >
            <Trash size={18} />
            <span>{t('delete')}</span>
          </DropdownMenuItemWithIcon>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

const useDropdownAction = (props: { prompt: PromptModel }) => {
  const { t } = useTranslation("prompts");
  const { prompt } = props;
  const [isLoading, setIsLoading] = useState(false);

  const handleAction = async (action: DropdownAction) => {
    setIsLoading(true);
    switch (action) {
      case "delete":
        if (window.confirm(t("deleteConfirm", { name: prompt.name }))) {
          await DeletePrompt(prompt.id);
          RevalidateCache({
            page: "prompt",
          });
        }

        break;
    }
    setIsLoading(false);
  };

  return {
    isLoading,
    handleAction,
  };
};
