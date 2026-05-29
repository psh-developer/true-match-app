// import svg from "@/assets/svg/404.svg";
import { cn } from "@/common/lib/utils";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { Button } from "../ui/button";
import { Page } from "./page";

export function Page404({
  className,
  isPage = true,
}: {
  className?: string;
  isPage?: boolean;
}) {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const notfound = (
    <div
      className={cn(
        "w-full min-h-[500px] py-20 grow flex flex-1 items-center justify-center rounded-lg",
        // "border border-dashed shadow-sm",
        className,
      )}
    >
      <div className="flex flex-col items-center gap-1 px-4 text-center">
        {/* <img src={svg} width={400} /> */}
        <h3 className="text-2xl font-bold tracking-tight">{t("not-found")}</h3>
        <p className="text-wrap text-sm text-muted-foreground">
          {t("not-found-desc")}
        </p>
        <Button className="mt-4" onClick={() => navigate("/d")}>
          {t("back-to-home")}
        </Button>
      </div>
    </div>
  );

  if (!isPage) return notfound;
  return <Page>{notfound}</Page>;
}
