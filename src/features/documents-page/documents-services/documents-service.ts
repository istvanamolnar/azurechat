import { CHAT_DOCUMENT_ATTRIBUTE, DocumentModel } from '@/features/documents-page/documents-services/models';
import { ServerActionResponse } from '@/features/common/server-action-response';
import { DocumentsContainer } from '@/features/common/services/cosmos';
import { SqlQuerySpec } from '@azure/cosmos';

export const FindAllDocuments = async (): Promise<
  ServerActionResponse<Array<DocumentModel>>
> => {
  try {
    const querySpec: SqlQuerySpec = {
      query: "SELECT * FROM root r WHERE r.type=@type",
      parameters: [
        {
          name: "@type",
          value: CHAT_DOCUMENT_ATTRIBUTE,
        },
      ],
    };

    const { resources } = await DocumentsContainer()
      .items.query<DocumentModel>(querySpec)
      .fetchAll();

    return {
      status: "OK",
      response: resources,
    };
  } catch (error) {
    return {
      status: "ERROR",
      errors: [
        {
          message: `Error retrieving prompt: ${error}`,
        },
      ],
    };
  }
};
