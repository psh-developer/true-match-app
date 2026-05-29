import { Page } from "@/components/pages/page"
import { DataTable } from "@/components/table/data-table"
import { useGetAllUsers } from "@/services/queries/user.query"
import { useTranslation } from "react-i18next"
import { columns } from "../components/columns"

function ChildComp() {
  const { data, isFetching, isError } = useGetAllUsers()

  return (
    <DataTable
      error={isError}
      loading={isFetching}
      columns={columns}
      total={data?.total}
      data={data?.data || []}
      // header={<SearchInput />}
    />
  )
}

export default function UserPage() {
  const { t } = useTranslation()

  return (
    <Page fixHeight title={t("users")}>
      <ChildComp />
    </Page>
  )
}
