"use client";

import { AI_NAME } from "@/features/theme/theme-config";
import { Hero, HeroButton } from "@/features/ui/hero";
import { HardDrive, Library, Settings, Upload } from "lucide-react";
import { useTranslation } from 'react-i18next';
import { UploadDocument } from './upload-document';

export const DocumentsHero = () => {
  const { t } = useTranslation('data-source');
  return (
    <Hero
      title={
        <>
          <HardDrive size={36} strokeWidth={1.5} />
          <span className={'pl-4'}>{t('common:documents')}</span>
        </>
      }
      description={t('generalDescription', { AI_NAME })}
    >
      <UploadDocument />
      <HeroButton
        title={t('library.title')}
        description={t('library.description')}
        icon={<Library />}
        onClick={() => alert('library')}
      />
      <HeroButton
        title={t('settings.title')}
        description={t('settings.description')}
        icon={<Settings />}
        onClick={() => alert('settings')}
      />
    </Hero>
  );
};
