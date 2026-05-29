import { cn } from "@/common/lib/utils"
import { useModalStore } from "@/common/stores/model"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

export function ModalProvider() {
  const { open, option, closeModal } = useModalStore()

  const handleChange = async (status: boolean) => {
    if (!status) {
      // Attempt to close; run beforeClose guard if present
      const ok = (await option?.beforeClose?.()) ?? true
      if (!ok) return // prevent close
      closeModal()
    }
  }

  return (
    <Dialog aria-describedby="model" open={open} onOpenChange={handleChange}>
      <DialogContent
        className={cn(
          "flex flex-col gap-0 sm:max-h-[min(640px,80vh)] sm:max-w-lg [&>button:last-child]:top-3.5",
          option?.className
        )}
      >
        <DialogHeader>
          <DialogTitle>{option?.title}</DialogTitle>
          <DialogDescription>{option?.subtitle || ""}</DialogDescription>
        </DialogHeader>
        <div
          className={cn(
            "-m-6 mt-0 p-6 pt-2",
            option?.noOverflow ? "" : "overflow-y-auto"
          )}
        >
          {option?.content}
        </div>
        {option?.actions && <DialogFooter>{option?.actions}</DialogFooter>}
      </DialogContent>
    </Dialog>
  )
}
