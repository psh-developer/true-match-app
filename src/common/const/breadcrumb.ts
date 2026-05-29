export const breadcrumbConfig: BreadcrumbConfig = {
  d: { label: "dashboard" },
  user: { label: "user" },
  role: { label: "role" },
  permission: { label: "permission" },
  kyc: { label: "KYC" },
  add: { label: "Add New" },
  edit: { label: "Edit" },
  settings: { label: "settings" },
};

interface BreadcrumbConfig {
  [key: string]: {
    label: string;
    icon?: React.ComponentType<{ className?: string }>;
  };
}
