import { uniqueId } from "@/features/common/util";
import { HeroButton } from "@/features/ui/hero";
import { Globe } from "lucide-react";
import { ExtensionModel } from "../extension-services/models";
import { extensionStore } from "../extension-store";
import { useTranslation } from 'react-i18next';

export const BingSearch = () => {
  const { t } = useTranslation("extension");
  const newExample = () => {
    const bingExample: ExtensionModel = {
      createdAt: new Date(),
      description: t('bingSearch.description'),
      id: "",
      name: t('bingSearch.title'),
      executionSteps: t('bingSearch.systemMessage'),
      functions: [
        {
          code: `{
"name": "BingSearch",
"parameters": {
  "type": "object",
  "properties": {
    "query": {
      "type": "object",
      "description": "${t('bingSearch.codeExample.queryDescription')}",
      "properties": {
        "BING_SEARCH_QUERY": {
          "type": "string",
          "description": "${t('bingSearch.codeExample.searchQueryExampleDescription')}",
          "example": "${t('bingSearch.codeExample.searchQueryExample')}"
        }
      },
      "example": {
        "BING_SEARCH_QUERY": "${t('bingSearch.codeExample.searchQueryExample')}"
      },
      "required": ["BING_SEARCH_QUERY"]
    }
  },
  "required": ["query"]
},
"description": "${t('bingSearch.codeExample.systemMessage')}"
}
          `,
          endpoint:
            "https://api.bing.microsoft.com/v7.0/search?q=BING_SEARCH_QUERY",
          id: uniqueId(),
          endpointType: "GET",
          isOpen: false,
        },
      ],
      headers: [
        {
          id: uniqueId(),
          key: "Ocp-Apim-Subscription-Key",
          value: t('bingSearch.apiKeyPlaceholder'),
        },
      ],
      isPublished: false,
      type: "EXTENSION",
      userId: "",
    };

    extensionStore.openAndUpdate(bingExample);
  };

  return (
    <HeroButton
      title={t('bingSearch.title')}
      description={t('bingSearch.description')}
      icon={<Globe />}
      onClick={newExample}
    />
  );
};
