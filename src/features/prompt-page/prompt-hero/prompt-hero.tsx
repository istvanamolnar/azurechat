"use client";
import { Hero, HeroButton } from "@/features/ui/hero";
import { Book, BookImage, NotebookPen } from "lucide-react";
import { promptStore } from "../prompt-store";
import { useTranslation } from 'react-i18next';

export const PromptHero = () => {
  const { t } = useTranslation('prompts');
  return (
    <Hero
      title={
        <>
          <Book size={36} strokeWidth={1.5} />
          <span>{t('title')}</span>
        </>
      }
      description={t('description')}
    >
      <HeroButton
        title={t('new.title')}
        description={t('new.description')}
        icon={<Book />}
        onClick={() => promptStore.newPrompt()}
      />
      <HeroButton
        title={t('creative.title')}
        description={t('creative.description')}
        icon={<BookImage />}
        onClick={() =>
          promptStore.updatePrompt({
            createdAt: new Date(),
            id: "",
            name: t('creative.title'),
            description: t('creative.template'),
            isPublished: false,
            type: "PROMPT",
            userId: "",
          })
        }
      />
      <HeroButton
        title={t('problemFraming.title')}
        description={t('problemFraming.description')}
        icon={<NotebookPen />}
        onClick={() =>
          promptStore.updatePrompt({
            createdAt: new Date(),
            id: "",
            name: t('problemFraming.title'),
            description: t('problemFraming.template'),
            isPublished: false,
            type: "PROMPT",
            userId: "",
          })
        }
      />
    </Hero>
  );
};
