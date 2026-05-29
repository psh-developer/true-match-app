import { cn } from "@/common/lib/utils";
import { LoaderIcon } from "lucide-react";
import { Page } from "./page";

export function LoadingPage({
  className,
  isPage = true,
  desctiption,
}: {
  desctiption?: string;
  className?: string;
  isPage?: boolean;
}) {
  const child = (
    <div
      className={cn(
        "w-full min-h-[500px] py-20 grow flex flex-1 items-center justify-center rounded-lg",
        // "border border-dashed shadow-sm",
        className,
      )}
    >
      <div className="flex flex-col items-center gap-1 text-center">
        <LoaderIcon
          role="status"
          aria-label="Loading"
          className="size-6 animate-spin"
        />
        <p className="text-wrap text-sm text-muted-foreground">{desctiption}</p>
      </div>
    </div>
  );

  if (!isPage) return child;
  return <Page noSpace>{child}</Page>;
}
