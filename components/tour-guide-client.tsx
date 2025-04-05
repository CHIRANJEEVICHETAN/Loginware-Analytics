"use client"

import { useState, useEffect } from "react"
import Joyride, { CallBackProps, STATUS, Step } from "react-joyride"
import { useLocalStorage } from "@/lib/use-local-storage"
import { InfoIcon, SkipForward, MoveRight, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { MotionFade } from "@/components/ui/motion"

// Use any type to avoid TypeScript compatibility issues
interface TourGuideClientProps {
  autoStart?: boolean;
}

export function TourGuideClient({ autoStart = true }: TourGuideClientProps) {
  const [run, setRun] = useState(false)
  const [tourCompleted, setTourCompleted] = useLocalStorage<boolean>("eagle_analytics_tour_completed", false)
  
  // Define tour steps with proper typing
  const steps: Step[] = [
    {
      target: "body",
      content: "Welcome to Eagle Analytics! Let's explore the key features to help you make the most of the dashboard.",
      placement: "center",
      disableBeacon: true,
      styles: {
        options: {
          width: 450,
        },
      },
    },
    {
      target: ".sidebar-trigger",
      content: "Toggle the sidebar to get more space when working with detailed charts and analytics.",
      placement: "right",
      styles: {
        options: {
          width: 320,
        },
      },
    },
    {
      target: ".sidebar-dashboard-group",
      content: "Quickly access all dashboard sections including Overview, Machine Status, Utilization, and OEE Analysis.",
      placement: "right",
      styles: {
        options: {
          width: 320,
        },
      },
    },
    {
      target: ".sidebar-analysis-group",
      content: "Find detailed analysis tools including Alarms, Downtime, and Maintenance predictions.",
      placement: "right",
      styles: {
        options: {
          width: 320,
        },
      },
    },
    {
      target: ".notifications-button",
      content: "Get real-time alerts and updates about machine status, maintenance needs, and system notifications.",
      placement: "bottom",
      styles: {
        options: {
          width: 320,
        },
      },
    },
    {
      target: ".theme-toggle",
      content: "Switch between light and dark mode to customize your viewing experience based on your preference.",
      placement: "bottom",
      styles: {
        options: {
          width: 320,
        },
      },
    },
    {
      target: ".user-nav",
      content: "Access your profile, account settings, and sign out from here.",
      placement: "bottom-end",
      styles: {
        options: {
          width: 320,
        },
      },
    },
  ]

  // Setup effect to start tour
  useEffect(() => {
    if (!tourCompleted && autoStart) {
      setRun(true)
    }
  }, [tourCompleted, autoStart])

  // Update callback to use proper types
  const handleJoyrideCallback = (data: CallBackProps) => {
    const { status } = data
    
    if (status === STATUS.FINISHED || status === STATUS.SKIPPED) {
      setRun(false)
      setTourCompleted(true)
    }
  }

  // Custom BeaconComponent with pulse animation
  const Beacon = (props: any) => (
    <div
      className={cn(
        "relative flex items-center justify-center rounded-full bg-primary",
        "animate-pulse before:absolute before:inset-0 before:animate-ping before:rounded-full before:bg-primary/50 before:content-['']"
      )}
      style={{ 
        width: props.size, 
        height: props.size, 
        ...props.styles 
      }}
    >
      <InfoIcon className="h-4 w-4 text-primary-foreground" />
    </div>
  )
  
  // Custom TooltipComponent with brand styling
  const Tooltip = (props: any) => {
    const { continuous, index, isLastStep, step, backProps, closeProps, primaryProps, skipProps, tooltipProps } = props;
    
    return (
      <div
        {...tooltipProps}
        className="max-w-md rounded-lg border bg-card p-4 shadow-lg animate-in fade-in-50 zoom-in-95"
      >
        <MotionFade>
          <div className="relative space-y-4">
            <div className="flex items-center gap-2 text-lg font-medium">
              <InfoIcon className="h-5 w-5 text-primary" />
              <span>Eagle Analytics Tour</span>
            </div>
            
            <div className="text-sm text-card-foreground">
              {step.content}
            </div>
            
            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center gap-2">
                {index > 0 && (
                  <Button {...backProps} variant="outline" size="sm">
                    Back
                  </Button>
                )}
                
                {!isLastStep && (
                  <Button {...skipProps} variant="ghost" size="sm" className="flex items-center gap-1">
                    <SkipForward className="h-3 w-3" />
                    <span>Skip</span>
                  </Button>
                )}
              </div>
              
              <div>
                {continuous && (
                  <Button {...primaryProps} className="flex items-center gap-1">
                    {isLastStep ? (
                      <>
                        <span>Finish</span>
                        <Check className="h-4 w-4" />
                      </>
                    ) : (
                      <>
                        <span>Next</span>
                        <MoveRight className="h-4 w-4" />
                      </>
                    )}
                  </Button>
                )}
                
                {!continuous && (
                  <Button {...closeProps} variant="ghost" size="sm">
                    Close
                  </Button>
                )}
              </div>
            </div>
            
            {continuous && (
              <div className="flex items-center justify-center gap-1 pt-2">
                {steps.map((_, i) => (
                  <div
                    key={i}
                    className={cn(
                      "h-1.5 w-8 rounded-full transition-colors duration-300",
                      i === index ? "bg-primary" : "bg-muted"
                    )}
                  />
                ))}
              </div>
            )}
          </div>
        </MotionFade>
      </div>
    );
  }

  // Only render on client-side
  if (typeof window === 'undefined') {
    return null;
  }

  return (
    <Joyride
      callback={handleJoyrideCallback}
      continuous
      hideCloseButton
      run={run}
      scrollToFirstStep
      showProgress
      showSkipButton
      steps={steps}
      disableOverlayClose
      floaterProps={{
        disableAnimation: false,
      }}
      tooltipComponent={Tooltip}
      beaconComponent={Beacon}
      styles={{
        options: {
          zIndex: 10000,
          primaryColor: "hsl(var(--primary))",
          arrowColor: "hsl(var(--card))",
          backgroundColor: "hsl(var(--card))",
          textColor: "hsl(var(--card-foreground))",
          overlayColor: "rgba(0, 0, 0, 0.5)",
        },
      }}
    />
  )
}

export function TourButton() {
  const [_, setTourCompleted] = useLocalStorage<boolean>("eagle_analytics_tour_completed", false)
  
  const startTour = () => {
    setTourCompleted(false)
    window.location.reload() // Simple way to restart the tour
  }
  
  return (
    <Button
      onClick={startTour}
      variant="outline"
      size="sm"
      className="flex w-full items-center justify-center gap-2 text-xs"
    >
      <InfoIcon className="h-3.5 w-3.5" />
      <span>Restart Tour</span>
    </Button>
  )
} 