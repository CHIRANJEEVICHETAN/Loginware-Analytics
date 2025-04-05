"use client"

import * as React from "react"
import { Bell, Check, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

type Notification = {
  id: string
  title: string
  description: string
  time: string
  read: boolean
  priority: "high" | "medium" | "low"
  type: "alert" | "maintenance" | "system"
}

const notifications: Notification[] = [
  {
    id: "1",
    title: "Emergency Stop Triggered",
    description: "CNC Machine 3 has triggered an emergency stop.",
    time: "5 minutes ago",
    read: false,
    priority: "high",
    type: "alert",
  },
  {
    id: "2",
    title: "Maintenance Due",
    description: "Scheduled maintenance for Grinding Machine 1 is due in 2 days.",
    time: "1 hour ago",
    read: false,
    priority: "medium",
    type: "maintenance",
  },
  {
    id: "3",
    title: "Low Oil Pressure",
    description: "Drilling Machine 1 is reporting low oil pressure.",
    time: "2 hours ago",
    read: false,
    priority: "high",
    type: "alert",
  },
  {
    id: "4",
    title: "Production Target Achieved",
    description: "Daily production target has been achieved.",
    time: "3 hours ago",
    read: true,
    priority: "low",
    type: "system",
  },
  {
    id: "5",
    title: "System Update Available",
    description: "A new system update is available for installation.",
    time: "1 day ago",
    read: true,
    priority: "medium",
    type: "system",
  },
]

interface NotificationsProps {
  className?: string
}

export function Notifications({ className }: NotificationsProps) {
  const [open, setOpen] = React.useState(false)
  const [notificationsList, setNotificationsList] = React.useState<Notification[]>(notifications)
  const unreadCount = notificationsList.filter((n) => !n.read).length

  const markAsRead = (id: string) => {
    setNotificationsList((prev) =>
      prev.map((notification) => (notification.id === id ? { ...notification, read: true } : notification)),
    )
  }

  const markAllAsRead = () => {
    setNotificationsList((prev) => prev.map((notification) => ({ ...notification, read: true })))
  }

  const deleteNotification = (id: string) => {
    setNotificationsList((prev) => prev.filter((notification) => notification.id !== id))
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-500 text-white"
      case "medium":
        return "bg-amber-500 text-white"
      case "low":
        return "bg-green-500 text-white"
      default:
        return "bg-blue-500 text-white"
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon" className={cn("h-8 w-8", className)}>
          <Bell className="h-4 w-4" />
          <span className="sr-only">Notifications</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] md:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Notifications</DialogTitle>
          <DialogDescription className="flex justify-between">
            <span>Stay updated with machine alerts and system notifications</span>
            {unreadCount > 0 && (
              <Button variant="ghost" size="sm" onClick={markAllAsRead} className="h-8 px-2 text-xs">
                Mark all as read
              </Button>
            )}
          </DialogDescription>
        </DialogHeader>
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="alerts">Alerts</TabsTrigger>
            <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
            <TabsTrigger value="system">System</TabsTrigger>
          </TabsList>
          <TabsContent value="all">
            <ScrollArea className="h-[400px] pr-4">
              {notificationsList.length > 0 ? (
                <div className="space-y-4 py-4">
                  {notificationsList.map((notification) => (
                    <NotificationItem
                      key={notification.id}
                      notification={notification}
                      markAsRead={markAsRead}
                      deleteNotification={deleteNotification}
                      priorityColor={getPriorityColor(notification.priority)}
                    />
                  ))}
                </div>
              ) : (
                <div className="flex h-[300px] items-center justify-center">
                  <p className="text-center text-muted-foreground">No notifications</p>
                </div>
              )}
            </ScrollArea>
          </TabsContent>
          <TabsContent value="alerts">
            <ScrollArea className="h-[400px] pr-4">
              {notificationsList.filter((n) => n.type === "alert").length > 0 ? (
                <div className="space-y-4 py-4">
                  {notificationsList
                    .filter((n) => n.type === "alert")
                    .map((notification) => (
                      <NotificationItem
                        key={notification.id}
                        notification={notification}
                        markAsRead={markAsRead}
                        deleteNotification={deleteNotification}
                        priorityColor={getPriorityColor(notification.priority)}
                      />
                    ))}
                </div>
              ) : (
                <div className="flex h-[300px] items-center justify-center">
                  <p className="text-center text-muted-foreground">No alert notifications</p>
                </div>
              )}
            </ScrollArea>
          </TabsContent>
          <TabsContent value="maintenance">
            <ScrollArea className="h-[400px] pr-4">
              {notificationsList.filter((n) => n.type === "maintenance").length > 0 ? (
                <div className="space-y-4 py-4">
                  {notificationsList
                    .filter((n) => n.type === "maintenance")
                    .map((notification) => (
                      <NotificationItem
                        key={notification.id}
                        notification={notification}
                        markAsRead={markAsRead}
                        deleteNotification={deleteNotification}
                        priorityColor={getPriorityColor(notification.priority)}
                      />
                    ))}
                </div>
              ) : (
                <div className="flex h-[300px] items-center justify-center">
                  <p className="text-center text-muted-foreground">No maintenance notifications</p>
                </div>
              )}
            </ScrollArea>
          </TabsContent>
          <TabsContent value="system">
            <ScrollArea className="h-[400px] pr-4">
              {notificationsList.filter((n) => n.type === "system").length > 0 ? (
                <div className="space-y-4 py-4">
                  {notificationsList
                    .filter((n) => n.type === "system")
                    .map((notification) => (
                      <NotificationItem
                        key={notification.id}
                        notification={notification}
                        markAsRead={markAsRead}
                        deleteNotification={deleteNotification}
                        priorityColor={getPriorityColor(notification.priority)}
                      />
                    ))}
                </div>
              ) : (
                <div className="flex h-[300px] items-center justify-center">
                  <p className="text-center text-muted-foreground">No system notifications</p>
                </div>
              )}
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}

function NotificationItem({
  notification,
  markAsRead,
  deleteNotification,
  priorityColor,
}: {
  notification: Notification
  markAsRead: (id: string) => void
  deleteNotification: (id: string) => void
  priorityColor: string
}) {
  return (
    <div className={`relative rounded-lg border p-4 ${notification.read ? "bg-background" : "bg-muted/30"}`}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h4 className="text-sm font-semibold">{notification.title}</h4>
            <Badge className={priorityColor} variant="outline">
              {notification.priority}
            </Badge>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">{notification.description}</p>
          <p className="mt-2 text-xs text-muted-foreground">{notification.time}</p>
        </div>
        <div className="flex space-x-1">
          {!notification.read && (
            <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => markAsRead(notification.id)}>
              <Check className="h-4 w-4" />
              <span className="sr-only">Mark as read</span>
            </Button>
          )}
          <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => deleteNotification(notification.id)}>
            <X className="h-4 w-4" />
            <span className="sr-only">Delete</span>
          </Button>
        </div>
      </div>
    </div>
  )
}

