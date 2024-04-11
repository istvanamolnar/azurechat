import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/features/ui/accordion";
import { PropsWithChildren } from "react";

interface Props extends PropsWithChildren {
  title: string;
  numOfItems: number;
}

export const ChatGroup = (props: Props) => {
  return (
    <div className="flex flex-col">
      {props.numOfItems > 0 ? (
        <Accordion
          type="multiple"
          className="bg-background rounded-md border"
        >
          <AccordionItem value="item-1" className="">
            <AccordionTrigger className="text-sm py-1 items-center gap-2">
              <div className="font-bold text-muted-foreground p-3">{props.title}</div>
            </AccordionTrigger>
            <AccordionContent>
              <div>{props.children}</div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      ) : (
        <div className="font-bold text-muted-foreground p-3">{props.title}</div>
      )}
    </div>
  );
};
