import { Button } from "@/features/ui/button";
import { ScrollArea } from "@/features/ui/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/features/ui/sheet";
import { File, Trash } from "lucide-react";
import { FC } from "react";
import { ChatDocumentModel } from "../chat-services/models";
import { SoftDeleteChatDocument } from "../chat-services/chat-document-service";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/features/ui/dropdown-menu";

interface Props {
  chatDocuments: Array<ChatDocumentModel>;
}

export const DocumentDetail: FC<Props> = (props) => {
  return (
    <div className="absolute right-0">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant={"ghost"} className="gap-2" aria-label="Current Chat Documents Menu">
            <File size={16} /> {props.chatDocuments.length}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent side="bottom" className="w-72" align="end">
          {props.chatDocuments.map((doc) => {
            return (
              <DropdownMenuItem className="flex gap-2 items-center font-normal" key={doc.id}>
                <File size={16} />
                <div>{doc.name}</div>
                <div
                  className="cursor-pointer hover:bg-accent"
                  onClick={() => SoftDeleteChatDocument(doc)}
                  title="Dokument löschen"
                >
                  <Trash size={18} />
                </div>
              </DropdownMenuItem>
            );
          })}
        </DropdownMenuContent>
      </DropdownMenu>
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
