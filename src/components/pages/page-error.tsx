import svg from "@/assets/svg/bug-fix.svg";
import { cn } from "@/common/lib/utils";
import { Page } from "./page";

export function ErrorPage({
  className,
  isPage = true,
  title,
  desctiption,
}: {
  title?: string;
  desctiption?: string;
  className?: string;
  isPage?: boolean;
}) {
  const notfound = (
    <div
      className={cn(
        "w-full min-h-[500px] py-20 grow flex flex-1 items-center justify-center rounded-lg",
        // "border border-dashed shadow-sm",
        className,
      )}
    >
      <div className="flex flex-col items-center gap-1 px-4 text-center">
        <img src={svg} width={400} />
        <h3 className="text-2xl font-bold tracking-tight">
          {title || "Something went wrong!"}
        </h3>
        <p className="text-wrap text-sm text-muted-foreground">
          {desctiption || "something went wrong! please try again"}
        </p>
      </div>
    </div>
  );

  if (!isPage) return notfound;
  return <Page>{notfound}</Page>;
}
