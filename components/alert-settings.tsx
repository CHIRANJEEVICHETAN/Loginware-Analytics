"use client"

import * as React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { AlertTriangle, Bell, Check, Clock, RotateCcw, Save, WrenchIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/components/ui/use-toast"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useLocalStorage } from "@/lib/use-local-storage"

const alertFormSchema = z.object({
  criticalAlarmThreshold: z.number().min(1).max(100),
  mttrThreshold: z.number().min(1).max(60),
  mtbfThreshold: z.number().min(1).max(500),
  emailNotifications: z.boolean(),
  pushNotifications: z.boolean(),
  alertSound: z.boolean(),
  machineDowntimeAlerts: z.boolean(),
  machineCriticalAlerts: z.boolean(),
})

type AlertFormValues = z.infer<typeof alertFormSchema>

const defaultValues: AlertFormValues = {
  criticalAlarmThreshold: 10,
  mttrThreshold: 15,
  mtbfThreshold: 120,
  emailNotifications: false,
  pushNotifications: true,
  alertSound: true,
  machineDowntimeAlerts: true,
  machineCriticalAlerts: true,
}

export function AlertSettings() {
  const { toast } = useToast()
  const [savedSettings, setSavedSettings] = useLocalStorage<AlertFormValues>(
    "eagle_analytics_alert_settings",
    defaultValues
  )

  const form = useForm<AlertFormValues>({
    resolver: zodResolver(alertFormSchema),
    defaultValues: savedSettings || defaultValues,
  })

  function onSubmit(data: AlertFormValues) {
    setSavedSettings(data)
    toast({
      title: "Alert settings updated",
      description: "Your alert preferences have been saved.",
      duration: 3000,
    })
  }

  function resetDefaults() {
    form.reset(defaultValues)
    toast({
      title: "Settings reset",
      description: "Alert settings have been reset to defaults.",
      duration: 3000,
    })
  }

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Alert Settings</CardTitle>
        <CardDescription>Customize when and how you receive alerts</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="thresholds">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="thresholds">Alert Thresholds</TabsTrigger>
            <TabsTrigger value="notifications">Notification Preferences</TabsTrigger>
          </TabsList>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 pt-6">
              <TabsContent value="thresholds" className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-amber-500" />
                    <h3 className="text-lg font-medium">Alarm Thresholds</h3>
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="criticalAlarmThreshold"
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex justify-between items-center">
                          <FormLabel>Critical Alarm Threshold</FormLabel>
                          <span className="text-sm font-medium">{field.value} alarms</span>
                        </div>
                        <FormControl>
                          <Slider
                            min={1}
                            max={100}
                            step={1}
                            defaultValue={[field.value]}
                            onValueChange={(value) => field.onChange(value[0])}
                          />
                        </FormControl>
                        <FormDescription>
                          Alert when machine has more than this number of alarms per day
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="flex items-center gap-2 mt-6">
                    <Clock className="h-5 w-5 text-blue-500" />
                    <h3 className="text-lg font-medium">Time Thresholds</h3>
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="mttrThreshold"
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex justify-between items-center">
                          <FormLabel>MTTR Threshold</FormLabel>
                          <span className="text-sm font-medium">{field.value} min</span>
                        </div>
                        <FormControl>
                          <Slider
                            min={1}
                            max={60}
                            step={1}
                            defaultValue={[field.value]}
                            onValueChange={(value) => field.onChange(value[0])}
                          />
                        </FormControl>
                        <FormDescription>
                          Alert when Mean Time To Repair exceeds this threshold
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="mtbfThreshold"
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex justify-between items-center">
                          <FormLabel>MTBF Threshold</FormLabel>
                          <span className="text-sm font-medium">{field.value} hrs</span>
                        </div>
                        <FormControl>
                          <Slider
                            min={1}
                            max={500}
                            step={1}
                            defaultValue={[field.value]}
                            onValueChange={(value) => field.onChange(value[0])}
                          />
                        </FormControl>
                        <FormDescription>
                          Alert when Mean Time Between Failures falls below this threshold
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </TabsContent>
              
              <TabsContent value="notifications" className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Bell className="h-5 w-5 text-purple-500" />
                    <h3 className="text-lg font-medium">Notification Methods</h3>
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="emailNotifications"
                    render={({ field }) => (
                      <FormItem className="flex items-center justify-between rounded-lg border p-3 shadow-sm">
                        <div className="space-y-0.5">
                          <FormLabel>Email Notifications</FormLabel>
                          <FormDescription>
                            Receive email alerts for critical events
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="pushNotifications"
                    render={({ field }) => (
                      <FormItem className="flex items-center justify-between rounded-lg border p-3 shadow-sm">
                        <div className="space-y-0.5">
                          <FormLabel>Push Notifications</FormLabel>
                          <FormDescription>
                            Receive browser push notifications
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="alertSound"
                    render={({ field }) => (
                      <FormItem className="flex items-center justify-between rounded-lg border p-3 shadow-sm">
                        <div className="space-y-0.5">
                          <FormLabel>Alert Sounds</FormLabel>
                          <FormDescription>
                            Play sound when new alerts arrive
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  
                  <div className="flex items-center gap-2 mt-6">
                    <WrenchIcon className="h-5 w-5 text-amber-500" />
                    <h3 className="text-lg font-medium">Alert Types</h3>
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="machineDowntimeAlerts"
                    render={({ field }) => (
                      <FormItem className="flex items-center justify-between rounded-lg border p-3 shadow-sm">
                        <div className="space-y-0.5">
                          <FormLabel>Machine Downtime</FormLabel>
                          <FormDescription>
                            Alerts for extended machine downtime
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="machineCriticalAlerts"
                    render={({ field }) => (
                      <FormItem className="flex items-center justify-between rounded-lg border p-3 shadow-sm">
                        <div className="space-y-0.5">
                          <FormLabel>Critical Alarms</FormLabel>
                          <FormDescription>
                            Alerts for critical machine alarms
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
              </TabsContent>
              
              <CardFooter className="flex justify-between px-0">
                <Button type="button" variant="outline" onClick={resetDefaults}>
                  <RotateCcw className="mr-2 h-4 w-4" />
                  Reset Defaults
                </Button>
                <Button type="submit">
                  <Save className="mr-2 h-4 w-4" />
                  Save Settings
                </Button>
              </CardFooter>
            </form>
          </Form>
        </Tabs>
      </CardContent>
    </Card>
  )
} 