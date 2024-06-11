import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/features/ui/accordion';
import { PropsWithChildren } from "react";

interface Props extends PropsWithChildren {
  title: string;
  numOfItems: number;
}

export const ChatGroup = (props: Props) => {
  return (
    <div className="flex flex-col">
      {!!props.numOfItems &&
        <Accordion
          defaultValue={["item-1"]}
          type="multiple"
          className="bg-background rounded-md"
        >
          <AccordionItem value="item-1" className="">
            <AccordionTrigger className="justify-start py-1 items-center gap-2 cursor-pointer">
              <div className="font-light text-foreground p-3">{props.title}</div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="font-medium">{props.children}</div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      }
    </div>
  );
};
