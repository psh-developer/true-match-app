import { useLanguageStore } from "@/common/stores/i18n"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { LanguagesIcon } from "lucide-react"
import { useTranslation } from "react-i18next"
import { Button } from "../ui/button"

export function LanguageSwitch() {
  const { i18n } = useTranslation()
  const setLang = useLanguageStore((state) => state.setLang)

  const handleChange = (lang: "en" | "my") => () => {
    i18n.changeLanguage(lang)
    setLang(lang)
    const html = document.documentElement
    html.setAttribute("lang", lang)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button size="icon" variant="outline">
          <LanguagesIcon size={20} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent side="bottom" className="mr-4">
        <DropdownMenuItem onClick={handleChange("en")}>
          <span>🇬🇧</span>
          English
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleChange("my")}>
          <span>🇲🇲</span>
          Myanmar
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
