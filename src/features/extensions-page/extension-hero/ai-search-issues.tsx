import { uniqueId } from "@/features/common/util";
import { HeroButton } from "@/features/ui/hero";
import { FileSearch } from "lucide-react";
import { ExtensionModel } from "../extension-services/models";
import { extensionStore } from "../extension-store";
import { useTranslation } from 'react-i18next';

export const AISearch = () => {
  const { t } = useTranslation('extension');
  const newExample = () => {
    const aiSearchExample: ExtensionModel = {
      createdAt: new Date(),
      description: t('aiSearch.description'),
      id: "",
      name: t('aiSearch.title'),
      executionSteps: t('aiSearch.executionSteps') + "{% citation items=[{name:\"filename 1\",id:\"file id\"}, {name:\"filename 2\",id:\"file id\"}] /%}",
      functions: [
        {
          code: `{
"name": "aisearch",
"parameters": {
  "type": "object",
  "properties": {
    "body": {
      "type": "object",
      "description": "${t('aiSearch.functions.code.body')}",
      "properties": {
        "search": {
          "type": "string",
          "description": "${t('aiSearch.functions.code.search')}"
        }
      },
      "required": ["search"]
    }
  },
  "required": ["body"]
},
"description": "${t('aiSearch.functions.code.description')}"
}
          `,
          endpoint: "https:AZURE_CHAT_HOST.com/api/document",
          id: uniqueId(),
          endpointType: "POST",
          isOpen: false,
        },
      ],
      headers: [
        {
          id: uniqueId(),
          key: "vectors",
          value: t('aiSearch.headers.vector'),
        },
        {
          id: uniqueId(),
          key: "apiKey",
          value: t('aiSearch.headers.apiKey'),
        },
        {
          id: uniqueId(),
          key: "searchName",
          value: t('aiSearch.headers.searchName'),
        },
        {
          id: uniqueId(),
          key: "indexName",
          value: t('aiSearch.headers.indexName'),
        },
      ],
      isPublished: false,
      type: "EXTENSION",
      userId: "",
    };

    extensionStore.openAndUpdate(aiSearchExample);
  };

  return (
    <HeroButton
      title={t('aiSearch.title')}
      description={t('aiSearch.description')}
      icon={<FileSearch />}
      onClick={newExample}
    />
  );
};
