import { HeroButton } from "@/features/ui/hero";
import { Blocks } from "lucide-react";
import { extensionStore } from "../extension-store";
import { useTranslation } from 'react-i18next';

export const NewExtension = () => {
  const { t } = useTranslation('extension');
  return (
    <HeroButton
      title={t('newExtension.title')}
      description={t('newExtension.description')}
      icon={<Blocks />}
      onClick={() => extensionStore.newAndOpenSlider()}
    />
  );
};
