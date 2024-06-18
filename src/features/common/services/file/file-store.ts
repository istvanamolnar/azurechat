"use client";

import { ServerActionResponse } from "@/features/common/server-action-response";
import {
  showError,
  showSuccess,
} from "@/features/globals/global-message-store";
import { proxy, useSnapshot } from "valtio";
import { IndexDocuments } from "@/features/chat-page/chat-services/azure-ai-search/azure-ai-search";
import {
  CrackDocument,
  CreateChatDocument,
} from "@/features/chat-page/chat-services/chat-document-service";
import { chatStore } from "@/features/chat-page/chat-store";
import { TFunction } from 'i18next';

class FileStore {
  public uploadButtonLabel: string = "";

  public async onFileChange({ formData, chatThreadId, t }: {
    formData: FormData;
    chatThreadId: string;
    t: TFunction<"translation", undefined>
  }) {
    try {
      chatStore.updateLoading("file upload");

      formData.append("id", chatThreadId);
      const file: File | null = formData.get("file") as unknown as File;

      this.uploadButtonLabel = t('chat:processingDocument');
      const crackingResponse = await CrackDocument(formData);

      if (crackingResponse.status === "OK") {
        let index = 0;

        const documentIndexResponses: Array<ServerActionResponse<boolean>> = [];

        for (const doc of crackingResponse.response) {
          this.uploadButtonLabel = `${t('chat:indexingDocument')} [${index + 1}]/[${
            crackingResponse.response.length
          }]`;

          // index one document at a time
          const indexResponses = await IndexDocuments(
            file.name,
            [doc],
            chatThreadId
          );

          documentIndexResponses.push(...indexResponses);
          index++;
        }

        const allDocumentsIndexed = documentIndexResponses.every(
          (r) => r.status === "OK"
        );

        if (allDocumentsIndexed) {
          // Update state
          this.uploadButtonLabel = file.name + t('chat:loaded');
          // Update history DB with doc on chat thread
          const response = await CreateChatDocument(file.name, chatThreadId);

          if (response.status === "OK") {
            showSuccess({
              title: "File Upload",
              description: `${file.name} ${t('chat:uploadedSuccessfully')}`,
            });
          } else {
            showError(response.errors.map((e) => e).join("\n"));
          }
        } else {
          const errors: Array<string> = [];

          documentIndexResponses.forEach((r) => {
            if (r.status === "ERROR") {
              errors.push(...r.errors.map((e) => e.message));
            }
          });

          showError(
            t('chat:notAllDocsIndexedError') +
              errors.map((e) => e).join("\n")
          );
        }
      } else {
        showError(crackingResponse.errors.map((e) => e.message).join("\n"));
      }
    } catch (error) {
      showError("" + error);
    } finally {
      this.uploadButtonLabel = "";
      chatStore.updateLoading("idle");
    }
  }
}

export const fileStore = proxy(new FileStore());

export function useFileStore() {
  return useSnapshot(fileStore);
}
