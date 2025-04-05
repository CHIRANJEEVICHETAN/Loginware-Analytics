"use client"

import React from "react"
import { PageTransition, MotionWrapper } from "@/components/ui/motion"

interface PageWrapperProps {
  children: React.ReactNode
  className?: string
}

export function PageWrapper({ children, className }: PageWrapperProps) {
  return (
    <PageTransition className={className}>
      {children}
    </PageTransition>
  )
}

interface GridPageProps {
  children: React.ReactNode
  title: string
  description?: string
  className?: string
  action?: React.ReactNode
}

export function GridPage({ 
  children, 
  title, 
  description, 
  className,
  action 
}: GridPageProps) {
  return (
    <PageTransition>
      <div className="flex flex-col gap-6 w-full">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <MotionWrapper direction="left" delay={0.1}>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
              {description && (
                <p className="text-muted-foreground mt-1">{description}</p>
              )}
            </div>
          </MotionWrapper>
          
          {action && (
            <MotionWrapper direction="right" delay={0.2}>
              {action}
            </MotionWrapper>
          )}
        </div>
        
        <MotionWrapper
          delay={0.3}
          staggerChildren
          className={className}
        >
          {children}
        </MotionWrapper>
      </div>
    </PageTransition>
  )
} 