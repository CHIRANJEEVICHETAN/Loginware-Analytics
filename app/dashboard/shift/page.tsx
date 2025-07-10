"use client"

import { GridPage } from "@/components/page-wrapper"
import { ShiftForm } from "@/components/shift-form"
import { ShiftList } from "@/components/shift-list"

export default function ShiftPage() {
  return (
    <GridPage 
      title="Shift" 
      description="Manage shift timings and schedules"
      className="w-full px-0 pb-4"
    >
      <div className="grid gap-6 w-full">
        <ShiftForm />
        <ShiftList />
      </div>
    </GridPage>
  )
} 