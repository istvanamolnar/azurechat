"use client";
import { Hero, HeroButton } from "@/features/ui/hero";
import { Atom, Languages, UserRoundCog } from "lucide-react";
import { personaStore } from "../persona-store";
import { useTranslation } from 'react-i18next';

export const PersonaHero = () => {
  const { t } = useTranslation('persona');
  return (
    <Hero
      title={
        <>
          <UserRoundCog size={36} strokeWidth={1.5} />
          <span>{t('common:persona')}</span>
        </>
      }
      description={t('generalDescription')}
    >
      <HeroButton
        title={t('newPersona.title')}
        description={t('newPersona.description')}
        icon={<UserRoundCog />}
        onClick={() =>
          personaStore.newPersonaAndOpen({
            name: "",
            personaMessage: t('newPersona.systemMessage'),
            description: "",
          })
        }
      />
      <HeroButton
        title={t('newTranslator.title')}
        description={t('newTranslator.description')}
        icon={<Languages />}
        onClick={() =>
          personaStore.newPersonaAndOpen({
            name: t('newTranslator.title'),
            personaMessage: t('newTranslator.systemMessage'),
            description: t('newTranslator.description'),
          })
        }
      />
      <HeroButton
        title={t('newReactExpert.title')}
        description={t('newReactExpert.description')}
        icon={<Atom />}
        onClick={() =>
          personaStore.newPersonaAndOpen({
            name: t('newReactExpert.title'),
            personaMessage: t('newReactExpert.systemMessage') +
`import * as React from "react";
export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}
const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    return (
      <input
        className={
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        }
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";
export { Input };
`,
            description: t('newReactExpert.description'),
          })
        }
      />
    </Hero>
  );
};
