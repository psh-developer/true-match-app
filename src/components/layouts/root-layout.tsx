// import { useInit } from "@/common/hooks/use-init"
import { DialogProvider } from "@/components/common/dialog-provider"
import { ModalProvider } from "@/components/common/modal-provider"
import { Outlet } from "react-router"

function RootLayout() {
  //   const ready = useInit()

  //   if (!ready) return null
  return (
    <>
      <Outlet />
      <ModalProvider />
      <DialogProvider />
    </>
  )
}

export default RootLayout
