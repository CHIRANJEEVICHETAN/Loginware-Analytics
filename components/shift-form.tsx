"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Plus, Save, Trash2, Clock } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { cn } from "@/lib/utils"
import { format } from "date-fns"

// Helper function to convert 24h format to 12h format
function convertTo12Hour(time24: string): string {
  const [hours, minutes] = time24.split(':').map(Number)
  const period = hours >= 12 ? 'PM' : 'AM'
  const hours12 = hours % 12 || 12
  return `${hours12.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')} ${period}`
}

// Helper function to convert 12h format to 24h format
function convertTo24Hour(time12: string): string {
  const [time, period] = time12.split(' ')
  let [hours, minutes] = time.split(':').map(Number)
  if (period === 'PM' && hours !== 12) hours += 12
  if (period === 'AM' && hours === 12) hours = 0
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`
}

interface TimePickerDialogProps {
  value: string;
  onChange: (value: string) => void;
  label: string;
}

function TimePickerDialog({ value, onChange, label }: TimePickerDialogProps) {
  const [open, setOpen] = useState(false)
  const [selectedHour, setSelectedHour] = useState(() => {
    const [time, period] = value.split(' ')
    const [hour] = time.split(':')
    return parseInt(hour)
  })
  const [selectedMinute, setSelectedMinute] = useState(() => {
    const [time] = value.split(' ')
    const [, minute] = time.split(':')
    return parseInt(minute)
  })
  const [selectedPeriod, setSelectedPeriod] = useState(() => {
    const [, period] = value.split(' ')
    return period
  })

  const hours = Array.from({ length: 12 }, (_, i) => (i + 1).toString().padStart(2, '0'))
  const minutes = Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, '0'))
  const periods = ['AM', 'PM']

  const handleSave = () => {
    const newValue = `${selectedHour.toString().padStart(2, '0')}:${selectedMinute.toString().padStart(2, '0')} ${selectedPeriod}`
    onChange(newValue)
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="w-full justify-between"
        >
          {value}
          <Clock className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{label}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Hour</Label>
              <div className="h-[200px] overflow-y-auto border rounded-md p-2">
                {hours.map((hour) => (
                  <Button
                    key={hour}
                    variant={parseInt(hour) === selectedHour ? "secondary" : "ghost"}
                    className="w-full mb-1"
                    onClick={() => setSelectedHour(parseInt(hour))}
                  >
                    {hour}
                  </Button>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <Label>Minute</Label>
              <div className="h-[200px] overflow-y-auto border rounded-md p-2">
                {minutes.map((minute) => (
                  <Button
                    key={minute}
                    variant={parseInt(minute) === selectedMinute ? "secondary" : "ghost"}
                    className="w-full mb-1"
                    onClick={() => setSelectedMinute(parseInt(minute))}
                  >
                    {minute}
                  </Button>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <Label>AM/PM</Label>
              <div className="border rounded-md p-2">
                {periods.map((period) => (
                  <Button
                    key={period}
                    variant={period === selectedPeriod ? "secondary" : "ghost"}
                    className="w-full mb-1"
                    onClick={() => setSelectedPeriod(period)}
                  >
                    {period}
                  </Button>
                ))}
              </div>
            </div>
          </div>
          <Button onClick={handleSave} className="mt-4 bg-[#6366F1] hover:bg-[#5457E5] text-white">
            Set Time
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export function ShiftForm() {
  const [name, setName] = useState("")
  const [fromTime, setFromTime] = useState("08:00 AM")
  const [toTime, setToTime] = useState("08:00 PM")
  const [breakTime, setBreakTime] = useState("15")
  const [cannotBeShuffled, setCannotBeShuffled] = useState(false)

  return (
    <Card className="w-full">
      <CardHeader className="px-6">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl font-semibold tracking-tight">Shift Configuration</CardTitle>
            <CardDescription>Configure shift timings and break schedules</CardDescription>
          </div>
          <div className="flex gap-2">
            <Button className="bg-[#6366F1] hover:bg-[#5457E5] text-white">
              <Plus className="h-4 w-4 mr-2" />
              New
            </Button>
            <Button className="bg-[#22C55E] hover:bg-[#1EA750] text-white">
              <Save className="h-4 w-4 mr-2" />
              Save
            </Button>
            <Button variant="destructive" className="bg-[#F97316] hover:bg-[#EA6A0E] text-white">
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid gap-6">
          <div className="grid gap-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                placeholder="First"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="fromTime">From Time</Label>
                <div className="relative">
                  <TimePickerDialog 
                    value={fromTime} 
                    onChange={setFromTime} 
                    label="Select Start Time"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="toTime">To Time</Label>
                <div className="relative">
                  <TimePickerDialog 
                    value={toTime} 
                    onChange={setToTime} 
                    label="Select End Time"
                  />
                </div>
              </div>
            </div>
            <div>
              <Label htmlFor="breakTime">Break Time in Minutes</Label>
              <Input
                id="breakTime"
                type="number"
                min="0"
                max="120"
                placeholder="15"
                value={breakTime}
                onChange={(e) => setBreakTime(e.target.value)}
              />
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="cannotBeShuffled"
                checked={cannotBeShuffled}
                onCheckedChange={(checked) => setCannotBeShuffled(checked as boolean)}
              />
              <label
                htmlFor="cannotBeShuffled"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Cannot be Shuffled
              </label>
            </div>
          </div>
          <div className="text-sm text-muted-foreground bg-muted/50 p-4 rounded-lg">
            <span className="font-medium text-foreground">Note:</span> We have introduced IOT Shift Master for handling custom shift timings, In case any change is required please update in IOT Shift Master as well.
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 