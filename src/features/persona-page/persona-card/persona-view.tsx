import { ScrollArea } from "@/features/ui/scroll-area";
import { Textarea } from "@/features/ui/textarea";
import { Info } from "lucide-react";
import { FC } from "react";
import { Button } from "../../ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../../ui/sheet";
import { PersonaModel } from "../persona-services/models";
import initTranslations from '@/app/i18n';

interface Props {
  persona: PersonaModel;
}

export const ViewPersona: FC<Props> = async ({ persona }) => {
  const { t } = await initTranslations('de', ['persona', 'common']);
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant={"outline"} title={t('common:showDetails')}>
          <Info size={18} />
        </Button>
      </SheetTrigger>
      <SheetContent className="min-w-[480px] sm:w-[540px]">
        <SheetHeader>
          <SheetTitle>{persona.name}</SheetTitle>
        </SheetHeader>
        <ScrollArea className="flex-1 -mx-6 flex" type="always">
          <div className="p-6 flex gap-8 flex-col  flex-1">
            <SheetDescription>{persona.description}</SheetDescription>
            <div className="flex flex-col gap-3">
              <Textarea
                disabled
                className="min-h-[300px]"
                defaultValue={persona.personaMessage}
                name="personaMessage"
                placeholder={t('persona:systemMessagePlaceholder')}
              />
              <p className="text-xs text-muted-foreground">
                {persona.isPublished
                  ? t('common:publishedMessage')
                  : t('common:unpublishedMessage')}
              </p>
            </div>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};
