import { Page } from "@/components/pages"
import { useTranslation } from "react-i18next"
import { ChartBarInteractive } from "../components/chart-bar-interactive"
import { SectionCards } from "../components/section-cards"

export default function DashboardPage() {
  const { t } = useTranslation()
  return (
    <Page title={t("dashboard")}>
      <div className="@container/main flex flex-1 flex-col">
        <div className="flex flex-col gap-4 md:gap-4">
          <SectionCards />
          {/* <ChartAreaInteractive /> */}
          <ChartBarInteractive />
        </div>
      </div>
    </Page>
  )
}
