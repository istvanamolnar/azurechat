"use client";

import { AI_NAME } from "@/features/theme/theme-config";
import { Hero } from "@/features/ui/hero";
import { Blocks } from "lucide-react";
import { AISearch } from "./ai-search-issues";
import { BingSearch } from "./bing-search";
import { NewExtension } from "./new-extension";
import { useTranslation } from 'react-i18next';

export const ExtensionHero = () => {
  const { t } = useTranslation();
  return (
    <Hero
      title={
        <>
          <Blocks size={36} strokeWidth={1.5} />
          <span className={'pl-4'}>{t('common:extensions')}</span>
        </>
      }
      description={t('extension:generalDescription', { AI_NAME })}
    >
      <NewExtension />
      <BingSearch />
      <AISearch />
    </Hero>
  );
};
