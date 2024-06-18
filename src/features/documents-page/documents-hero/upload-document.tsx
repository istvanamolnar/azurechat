import { fileStore } from "@/features/common/services/file/file-store";
import { AttachFile } from '@/features/ui/chat/chat-input-area/attach-file';
import { HeroButton } from '@/features/ui/hero'
import { Upload } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const UploadDocument = () => {
  const { t } = useTranslation('data-source');
  const chatThreadId = '';
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