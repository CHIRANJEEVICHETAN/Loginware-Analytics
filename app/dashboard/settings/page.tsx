"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { AlertSettings } from "@/components/alert-settings"
import { MotionWrapper } from "@/components/ui/motion"
import { GridPage } from "@/components/page-wrapper"
import { Settings as SettingsIcon, Bell, User, Palette, Mail, AtSign, Save, Smartphone, User2, Clock, Check, Monitor, Sun, Moon, Languages, LayoutGrid, ChevronsUpDown, AlertTriangle } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { useState } from "react"
import { useTheme } from "next-themes"

export default function SettingsPage() {
  const { toast } = useToast();
  const { theme, setTheme } = useTheme();
  const [densityValue, setDensityValue] = useState("default");
  const [languageValue, setLanguageValue] = useState("english");
  const [dateFormatValue, setDateFormatValue] = useState("mm/dd/yyyy");
  
  const handleSaveAccount = () => {
    toast({
      title: "Account settings saved",
      description: "Your account settings have been updated successfully.",
      duration: 3000,
    });
  };
  
  const handleSaveAppearance = () => {
    toast({
      title: "Appearance settings saved",
      description: "Your appearance settings have been updated successfully.",
      duration: 3000,
    });
  };
  
  const handleSaveNotifications = () => {
    toast({
      title: "Notification settings saved",
      description: "Your notification preferences have been updated successfully.",
      duration: 3000,
    });
  };

  return (
    <GridPage
      title="Settings"
      description="Manage your preferences and system settings"
    >
      <Tabs defaultValue="alerts" className="w-full">
        <MotionWrapper delay={0.1}>
          <TabsList className="w-full max-w-lg bg-muted/40 p-1 rounded-xl">
            <TabsTrigger value="alerts" className="flex items-center gap-1.5 pl-5 rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm">
              <Bell className="h-4 w-4" />
              <span>Alert Settings</span>
            </TabsTrigger>
            <TabsTrigger value="account" className="flex items-center gap-1.5 rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm">
              <User className="h-4 w-4" />
              <span>Account</span>
            </TabsTrigger>
            <TabsTrigger value="appearance" className="flex items-center gap-1.5 rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm">
              <Palette className="h-4 w-4" />
              <span>Appearance</span>
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center gap-1.5 rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm">
              <Bell className="h-4 w-4" />
              <span>Notifications</span>
            </TabsTrigger>
          </TabsList>
        </MotionWrapper>
        
        <div className="mt-6">
          <TabsContent value="alerts" className="mt-0">
            <MotionWrapper direction="up" delay={0.2}>
              <AlertSettings />
            </MotionWrapper>
          </TabsContent>
          
          <TabsContent value="account" className="mt-0">
            <MotionWrapper direction="up" delay={0.2}>
              <Card>
                <CardHeader>
                  <CardTitle>Account Settings</CardTitle>
                  <CardDescription>
                    Manage your account settings and preferences
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <User2 className="h-5 w-5 text-blue-500" />
                      <h3 className="text-lg font-medium">Personal Information</h3>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input id="name" defaultValue="Admin User" />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="title">Job Title</Label>
                        <Input id="title" defaultValue="Plant Manager" />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="bio">Bio</Label>
                      <Textarea 
                        id="bio" 
                        placeholder="Brief description about yourself" 
                        className="min-h-[100px]"
                        defaultValue="Managing production operations and monitoring machine efficiency at our main plant."
                      />
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <AtSign className="h-5 w-5 text-purple-500" />
                      <h3 className="text-lg font-medium">Contact Information</h3>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input id="email" type="email" defaultValue="admin@loginware.com" />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input id="phone" type="tel" defaultValue="+1 (555) 123-4567" />
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Smartphone className="h-5 w-5 text-green-500" />
                      <h3 className="text-lg font-medium">Two-Factor Authentication</h3>
                    </div>
                    
                    <div className="flex items-center justify-between rounded-lg border p-3 shadow-sm">
                      <div className="space-y-0.5">
                        <Label>Two-Factor Authentication</Label>
                        <p className="text-sm text-muted-foreground">
                          Add an extra layer of security to your account
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button onClick={handleSaveAccount} className="ml-auto">
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                  </Button>
                </CardFooter>
              </Card>
            </MotionWrapper>
          </TabsContent>
          
          <TabsContent value="appearance" className="mt-0">
            <MotionWrapper direction="up" delay={0.2}>
              <Card>
                <CardHeader>
                  <CardTitle>Appearance</CardTitle>
                  <CardDescription>
                    Customize the appearance of the dashboard
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Monitor className="h-5 w-5 text-amber-500" />
                      <h3 className="text-lg font-medium">Theme Settings</h3>
                    </div>
                    
                    <RadioGroup 
                      defaultValue={theme || "system"} 
                      onValueChange={(value) => setTheme(value)}
                      className="grid grid-cols-1 md:grid-cols-3 gap-4"
                    >
                      <div className="flex items-center space-x-2 rounded-lg border p-4 cursor-pointer hover:border-primary">
                        <RadioGroupItem value="light" id="theme-light" />
                        <Label htmlFor="theme-light" className="flex items-center gap-2 cursor-pointer">
                          <Sun className="h-4 w-4" />
                          <span>Light</span>
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2 rounded-lg border p-4 cursor-pointer hover:border-primary">
                        <RadioGroupItem value="dark" id="theme-dark" />
                        <Label htmlFor="theme-dark" className="flex items-center gap-2 cursor-pointer">
                          <Moon className="h-4 w-4" />
                          <span>Dark</span>
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2 rounded-lg border p-4 cursor-pointer hover:border-primary">
                        <RadioGroupItem value="system" id="theme-system" />
                        <Label htmlFor="theme-system" className="flex items-center gap-2 cursor-pointer">
                          <Monitor className="h-4 w-4" />
                          <span>System</span>
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <LayoutGrid className="h-5 w-5 text-blue-500" />
                      <h3 className="text-lg font-medium">Layout Density</h3>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="flex flex-col space-y-1.5">
                        <Select value={densityValue} onValueChange={setDensityValue}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select density" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="compact">Compact</SelectItem>
                            <SelectItem value="default">Default</SelectItem>
                            <SelectItem value="comfortable">Comfortable</SelectItem>
                          </SelectContent>
                        </Select>
                        <p className="text-sm text-muted-foreground">
                          Controls the spacing between elements
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Languages className="h-5 w-5 text-green-500" />
                      <h3 className="text-lg font-medium">Language & Region</h3>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex flex-col space-y-1.5">
                        <Label>Language</Label>
                        <Select value={languageValue} onValueChange={setLanguageValue}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select language" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="english">English</SelectItem>
                            <SelectItem value="spanish">Spanish</SelectItem>
                            <SelectItem value="french">French</SelectItem>
                            <SelectItem value="german">German</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="flex flex-col space-y-1.5">
                        <Label>Date Format</Label>
                        <Select value={dateFormatValue} onValueChange={setDateFormatValue}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select date format" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="mm/dd/yyyy">MM/DD/YYYY</SelectItem>
                            <SelectItem value="dd/mm/yyyy">DD/MM/YYYY</SelectItem>
                            <SelectItem value="yyyy-mm-dd">YYYY-MM-DD</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button onClick={handleSaveAppearance} className="ml-auto">
                    <Save className="mr-2 h-4 w-4" />
                    Save Preferences
                  </Button>
                </CardFooter>
              </Card>
            </MotionWrapper>
          </TabsContent>
          
          <TabsContent value="notifications" className="mt-0">
            <MotionWrapper direction="up" delay={0.2}>
              <Card>
                <CardHeader>
                  <CardTitle>Notification Settings</CardTitle>
                  <CardDescription>
                    Configure how you receive notifications
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Bell className="h-5 w-5 text-purple-500" />
                      <h3 className="text-lg font-medium">Notification Methods</h3>
                    </div>
                    
                    <div className="flex items-center justify-between rounded-lg border p-3 shadow-sm">
                      <div className="space-y-0.5">
                        <Label>Email Notifications</Label>
                        <p className="text-sm text-muted-foreground">
                          Receive email alerts for critical events
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between rounded-lg border p-3 shadow-sm">
                      <div className="space-y-0.5">
                        <Label>Push Notifications</Label>
                        <p className="text-sm text-muted-foreground">
                          Receive browser push notifications
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between rounded-lg border p-3 shadow-sm">
                      <div className="space-y-0.5">
                        <Label>SMS Notifications</Label>
                        <p className="text-sm text-muted-foreground">
                          Receive text messages for urgent alerts
                        </p>
                      </div>
                      <Switch />
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="h-5 w-5 text-amber-500" />
                      <h3 className="text-lg font-medium">Alert Categories</h3>
                    </div>
                    
                    <div className="flex items-center justify-between rounded-lg border p-3 shadow-sm">
                      <div className="space-y-0.5">
                        <Label>Machine Downtime</Label>
                        <p className="text-sm text-muted-foreground">
                          Alerts for extended machine downtime events
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between rounded-lg border p-3 shadow-sm">
                      <div className="space-y-0.5">
                        <Label>Critical Alarms</Label>
                        <p className="text-sm text-muted-foreground">
                          Alerts for critical machine alarms that require attention
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between rounded-lg border p-3 shadow-sm">
                      <div className="space-y-0.5">
                        <Label>Maintenance Reminders</Label>
                        <p className="text-sm text-muted-foreground">
                          Notifications for scheduled maintenance activities
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between rounded-lg border p-3 shadow-sm">
                      <div className="space-y-0.5">
                        <Label>Performance Thresholds</Label>
                        <p className="text-sm text-muted-foreground">
                          Alerts when performance metrics fall below thresholds
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Clock className="h-5 w-5 text-blue-500" />
                      <h3 className="text-lg font-medium">Notification Schedule</h3>
                    </div>
                    
                    <div className="flex items-center justify-between rounded-lg border p-3 shadow-sm">
                      <div className="space-y-0.5">
                        <Label>Quiet Hours</Label>
                        <p className="text-sm text-muted-foreground">
                          Disable notifications during specified hours
                        </p>
                      </div>
                      <Switch />
                    </div>
                    
                    <div className="flex items-center justify-between rounded-lg border p-3 shadow-sm">
                      <div className="space-y-0.5">
                        <Label>Weekly Digest</Label>
                        <p className="text-sm text-muted-foreground">
                          Receive a weekly summary of all alerts and events
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button onClick={handleSaveNotifications} className="ml-auto">
                    <Save className="mr-2 h-4 w-4" />
                    Save Preferences
                  </Button>
                </CardFooter>
              </Card>
            </MotionWrapper>
          </TabsContent>
        </div>
      </Tabs>
    </GridPage>
  )
}

