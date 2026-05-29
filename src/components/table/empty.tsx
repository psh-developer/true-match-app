import { Inbox } from "lucide-react";
import { useTranslation } from "react-i18next";

export function Empty() {
  const { t } = useTranslation("message");
  return (
    <div className="w-full min-h-[400px] flex items-center justify-center">
      <div className="flex flex-col items-center gap-2">
        <Inbox size={60} className="text-muted-foreground" />
        <span className="text-muted-foreground">{t("no-result-found")}</span>
      </div>
    </div>
  );
}
