import { Button } from "@/features/ui/button";

import { File, Trash } from "lucide-react";
import { FC } from "react";
import { ChatDocumentModel } from "../chat-services/models";
import { SoftDeleteChatDocument } from "../chat-services/chat-document-service";
import { Popover, PopoverContent, PopoverTrigger } from "@/features/ui/popover";

interface Props {
  chatDocuments: Array<ChatDocumentModel>;
}

export const DocumentDetail: FC<Props> = (props) => {
  return (
    <div className="absolute right-4 top-4">
      <Popover>
        <PopoverTrigger>
          <Button variant={"ghost"} className="gap-2" aria-label="Current Chat Documents Menu">
            <File size={16} /> {props.chatDocuments.length}
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          {props.chatDocuments.map((doc) => {
            return (
              <div className="flex gap-2 items-center font-normal" key={doc.id}>
                <File size={16} />
                <div>{doc.name}</div>
                <div
                  className="cursor-pointer hover:bg-accent"
                  onClick={() => SoftDeleteChatDocument(doc)}
                  title="Dokument löschen"
                >
                  <Trash size={18} />
                </div>
              </div>
            );
          })}
        </PopoverContent>
      </Popover>
    </div>
    // <Sheet>
    //   <SheetTrigger asChild>
    //     <Button variant={"ghost"} className="gap-2" aria-label="Current Chat Documents Menu">
    //       <File size={16} /> {props.chatDocuments.length}
    //     </Button>
    //   </SheetTrigger>
    //   <SheetContent className="min-w-[480px] sm:w-[540px] flex flex-col">
    //     <SheetHeader>
    //       <SheetTitle>Dokumente</SheetTitle>
    //     </SheetHeader>
    //     <ScrollArea className="flex-1 -mx-6 flex" type="always">
    //       <div className="pb-6 px-6 flex gap-2 flex-col  flex-1">
    //         {props.chatDocuments.map((doc) => {
    //           return (
    //             <div className="flex gap-2 items-center" key={doc.id}>
    //               <File size={16} />
    //               <div>{doc.name}</div>
    //               <div onClick={() => SoftDeleteChatDocument(doc)}>
    //                 <Trash size={18} />
    //               </div>
    //             </div>
    //           );
    //         })}
    //       </div>
    //     </ScrollArea>
    //   </SheetContent>
    // </Sheet>
  );
};
