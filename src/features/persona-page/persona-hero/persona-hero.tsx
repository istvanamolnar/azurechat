"use client";
import { Hero, HeroButton } from "@/features/ui/hero";
import { Atom, Languages, UserRoundCog } from "lucide-react";
import { personaStore } from "../persona-store";
import { useTranslation } from 'react-i18next';

export const PersonaHero = () => {
  const { t } = useTranslation();
  return (
    <Hero
      title={
        <>
          <UserRoundCog size={36} strokeWidth={1.5} />
          <span>{t('common:persona')}</span>
        </>
      }
      description={t('persona:generalDescription')}
    >
      <HeroButton
        title={t('persona:newPersonaTitle')}
        description={t('persona:newPersonaDescription')}
        icon={<UserRoundCog />}
        onClick={() =>
          personaStore.newPersonaAndOpen({
            name: "",
            personaMessage: t('persona:newPersonaSystemMessage'),
            description: "",
          })
        }
      />
      <HeroButton
        title={t('persona:newTranslatorTitle')}
        description={t('persona:newTranslatorDescription')}
        icon={<Languages />}
        onClick={() =>
          personaStore.newPersonaAndOpen({
            name: t('persona:newTranslatorTitle'),
            personaMessage: t('persona:newTranslatorSystemMessage'),
            description: t('persona:newTranslatorDescription'),
          })
        }
      />
      <HeroButton
        title={t('persona:newReactExpertTitle')}
        description={t('persona:newReactExpertDescription')}
        icon={<Atom />}
        onClick={() =>
          personaStore.newPersonaAndOpen({
            name: t('persona:newReactExpertTitle'),
            personaMessage: t('persona:newReactExpertSystemMessage'),
            description: t('persona:newReactExpertDescription'),
          })
        }
      />
    </Hero>
  );
};
