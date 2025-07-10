"use client"

import { GridPage } from "@/components/page-wrapper"
import { CompanyForm } from "@/components/company-form"
import { CompanyList } from "@/components/company-list"

export default function CompanyMasterPage() {
  return (
    <GridPage 
      title="Company Master" 
      description="Manage company details and view company list"
      className="w-full px-0 pb-4"
    >
      <div className="grid gap-6 w-full">
        <CompanyForm />
        <CompanyList />
      </div>
    </GridPage>
  )
} 