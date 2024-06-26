import { fileStore } from "@/features/common/services/file/file-store";
import { AttachFile } from '@/features/ui/chat/chat-input-area/attach-file';
import { HeroButton } from '@/features/ui/hero'
import { Upload } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { SHARED_DOCUMENT_ID } from '../documents-services/models';

export const UploadDocument = () => {
  const { t } = useTranslation('documents');
  const chatThreadId = SHARED_DOCUMENT_ID;
  return (
    <AttachFile
      onClick={(formData) =>
        fileStore.onFileChange({ formData, chatThreadId, t })
      }
    >
      <HeroButton
        title={t('uploadDocument.title')}
        description={t('uploadDocument.description')}
        icon={<Upload />}
        onClick={() => undefined}
      />
    </AttachFile>
  )
}