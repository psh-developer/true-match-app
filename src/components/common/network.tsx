import { WifiOffIcon } from "lucide-react"
import { useTranslation } from "react-i18next"
import { useNetworkState } from "react-use"

export function NetworkState() {
  const { t } = useTranslation()
  const { online } = useNetworkState()

  if (online) return null
  return (
    <div className="absolute inset-x-0 bottom-0 z-50 flex h-8 items-center justify-center bg-red-700 p-4 text-xs text-slate-50">
      <WifiOffIcon className="mr-2 size-3" />
      {t("no-internet-connection")}
    </div>
  )
}
