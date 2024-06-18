import { FC } from "react";
import { ScrollArea } from "@/features/ui/scroll-area";
import { DisplayError } from '@/features/ui/error/display-error';
import { DocumentsHero } from './documents-hero/documents-hero';
import { FindAllDocuments } from './documents-services/documents-service';

interface DocumentsPageProps {
}

export const DocumentsPage: FC<DocumentsPageProps> = async (props) => {
  const documentsResponse = await FindAllDocuments();

  if (documentsResponse.status !== "OK") {
    return <DisplayError errors={documentsResponse.errors} />;
  }

  return (
    <ScrollArea className="flex-1">
      <main className="flex flex-1 flex-col">
        <DocumentsHero />
        <div className="container max-w-4xl py-3">
          {documentsResponse.response.map((document) => (
            <div key={document.id}>
              <p>{document.name}</p>
            </div>
          ))}
        </div>
      </main>
    </ScrollArea>
  );
};
