"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { DateTimePicker } from "@/components/ui/date-time-picker"

const weekDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

export function CompanyForm() {
  const [weeklyOff, setWeeklyOff] = useState<string[]>(["Sunday"])
  const [businessStart, setBusinessStart] = useState<Date | undefined>(undefined)
  const [businessEnd, setBusinessEnd] = useState<Date | undefined>(undefined)

  const handleWeeklyOffChange = (day: string) => {
    setWeeklyOff((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    )
  }

  return (
    <Card className="w-full overflow-hidden">
      <CardHeader className="px-6">
        <CardTitle className="text-2xl font-semibold tracking-tight">Company Details</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <form className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="col-span-1 md:col-span-2">
            <Input placeholder="Company Name" />
          </div>
          <div className="col-span-1 md:col-span-2">
            <Input placeholder="Address Line 1" />
          </div>
          <div className="col-span-1 md:col-span-2">
            <Input placeholder="Address Line 2" />
          </div>
          <Input placeholder="City" />
          <Input placeholder="District" />
          <Input placeholder="Pincode" />
          <Input placeholder="Contact Person" />
          <Input placeholder="Contact No. 1" />
          <Input placeholder="Contact No. 2" />
          <Input placeholder="GST No." />
          <Input placeholder="State" />
          <Input placeholder="Manager Name" />
          <div className="col-span-1 md:col-span-2">
            <Input placeholder="Nature of Industry" />
          </div>
          <div className="col-span-1 md:col-span-2 flex gap-4">
            <div className="flex-1">
              <DateTimePicker
                date={businessStart}
                setDate={setBusinessStart}
                placeholder="Business Start"
              />
            </div>
            <div className="flex-1">
              <DateTimePicker
                date={businessEnd}
                setDate={setBusinessEnd}
                placeholder="Business End"
              />
            </div>
          </div>
        </form>

        <div className="mt-6">
          <h2 className="text-lg font-semibold mb-4">Weekly-Off</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
            {weekDays.map((day) => (
              <label key={day} className="flex items-center gap-2 text-sm">
                <Checkbox 
                  checked={weeklyOff.includes(day)} 
                  onCheckedChange={() => handleWeeklyOffChange(day)} 
                />
                <span>{day}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="flex gap-2 mt-6">
          <Button type="submit" className="bg-green-500 text-white hover:bg-green-600">Save</Button>
          <Button type="button" variant="destructive" className="bg-orange-500 text-white hover:bg-orange-600">Delete</Button>
        </div>
      </CardContent>
    </Card>
  )
} 