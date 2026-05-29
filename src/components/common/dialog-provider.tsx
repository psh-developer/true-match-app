import { cn } from "@/common/lib/utils"
import { useDialogStore } from "@/common/stores/dialog"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

export function DialogProvider() {
  const { open, option, closeDialog } = useDialogStore()

  const handleChange = (status: boolean) => {
    if (!status) closeDialog()
  }

  return (
    <Dialog aria-describedby="model" open={open} onOpenChange={handleChange}>
      <DialogContent className={cn(option?.className)}>
        <DialogHeader>
          <DialogTitle>{option?.title}</DialogTitle>
          <DialogDescription>{option?.subtitle || ""}</DialogDescription>
        </DialogHeader>
        {option?.content}
        {option?.actions && <DialogFooter>{option?.actions}</DialogFooter>}
      </DialogContent>
    </Dialog>
  )
}
