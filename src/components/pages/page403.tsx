// import svg from "@/assets/svg/403.svg";
import { cn } from "@/common/lib/utils";
import { Page } from "./page";

export function ForbiddenPage({
  className,
  border = false,
  title,
  // imgSize = 250,
  desctiption,
}: {
  title?: string;
  desctiption?: string;
  className?: string;
  imgSize?: number;
  border?: boolean;
}) {
  return (
    <Page>
      <div
        className={cn(
          "w-full min-h-[400px] py-20 grow flex-1 flex flex-col space-y-2 items-center justify-center rounded-lg",
          border && "border border-dashed shadow-sm",
          className,
        )}
      >
        {/* <img src={svg} width={imgSize} /> */}
        <h3 className="text-2xl font-bold tracking-tight">
          {title || "Access Denied"}
        </h3>
        <p className="text-wrap text-center text-sm text-muted-foreground">
          {desctiption || "You don't have permission to access this page"}
        </p>
      </div>
    </Page>
  );
}
