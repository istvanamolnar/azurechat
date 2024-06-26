import { Alert, AlertDescription, AlertTitle } from "@/features/ui/alert";
import { Button } from "@/features/ui/button";
import { Input } from "@/features/ui/input";
import { Label } from "@/features/ui/label";
import { SheetTitle } from "@/features/ui/sheet";
import { KeyRound, Plus, Trash } from "lucide-react";
import { FC } from "react";
import { HeaderModel } from "../extension-services/models";
import { extensionStore, useExtensionState } from "../extension-store";
import { useTranslation } from 'react-i18next';

interface Props {
  header: HeaderModel;
}

export const EndpointHeaderRow: FC<Props> = (props) => {
  return (
    <div className="flex gap-2">
      <input
        id={`header-id-${props.header.id}`}
        type="hidden"
        name={`header-id[]`}
        value={props.header.id}
      />
      <Input
        id={`header-key-${props.header.id}`}
        placeholder="key"
        className="flex-1"
        name={`header-key[]`}
        required
        defaultValue={props.header.key}
      />
      <Input
        id={`header-value-${props.header.id}`}
        name={`header-value[]`}
        placeholder="value"
        className="flex-1"
        required
        defaultValue={props.header.value}
      />
      <Button
        variant={"outline"}
        size={"icon"}
        type="button"
        onClick={() =>
          extensionStore.removeHeader({
            headerId: props.header.id,
          })
        }
        aria-label="Remove this header"
      >
        <Trash size={18} />
      </Button>
    </div>
  );
};

export const EndpointHeaderTitle = () => {
  const { t } = useTranslation('extension');
  return (
    <div className="flex gap-2">
      <Label className="text-muted-foreground flex-1">{t('aiSearch.headers.key')}</Label>
      <Label className="text-muted-foreground flex-1">{t('aiSearch.headers.value')}</Label>
      <Label className="text-muted-foreground w-10"> </Label>
    </div>
  );
};

export const EndpointHeader = () => {
  const { t } = useTranslation('extension');
  const { extension } = useExtensionState();
  const { headers } = extension;
  return (
    <div className="flex flex-col gap-4 bg-foreground/[0.02] border p-4 rounded-md ">
      <div className="flex justify-between items-center gap-2 ">
        <SheetTitle>{t('aiSearch.headers.headers')}</SheetTitle>
        <Button
          type="button"
          className="flex gap-2"
          variant={"outline"}
          onClick={() =>
            extensionStore.addEndpointHeader({
              key: "",
              value: "",
            })
          }
        >
          <Plus size={18} />
          <span>{t('aiSearch.headers.addHeaders')}</span>
        </Button>
      </div>
      <Alert className="text-xs">
        <KeyRound size={18} />
        <AlertTitle>{t('aiSearch.headers.secureInfo.title')}</AlertTitle>
        <AlertDescription className="text-xs">
          {t('aiSearch.headers.secureInfo.description')}
        </AlertDescription>
      </Alert>
      <EndpointHeaderTitle />
      {headers.map((header, index) => (
        <div className="grid gap-2" key={header.id}>
          <EndpointHeaderRow header={header} />
        </div>
      ))}
    </div>
  );
};
