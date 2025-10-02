"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ScrollArea } from "@/components/ui/scroll-area"
import CustomPointer, { POINTER_STYLES, SIZE_CONFIG, COLOR_CONFIG, INTENSITY_CONFIG } from "@/components/custom-pointer"
import { Eye, EyeOff, Settings, Palette, Zap, Sparkles, MousePointer, ChevronDown, ChevronUp } from "lucide-react"

interface PointerDemoProps {
  className?: string
}

export default function PointerDemo({ className = "" }: PointerDemoProps) {
  const [isEnabled, setIsEnabled] = useState(true)
  const [currentStyle, setCurrentStyle] = useState<"glow" | "ripple" | "neon" | "auto">("auto")
  const [currentSize, setCurrentSize] = useState<"small" | "medium" | "large">("medium")
  const [currentColor, setCurrentColor] = useState<"blue" | "cyan" | "purple" | "green" | "auto">("auto")
  const [currentIntensity, setCurrentIntensity] = useState<"low" | "medium" | "high">("medium")
  const [showDemo, setShowDemo] = useState(true) // Start expanded for better UX
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const styleOptions = [
    { value: "auto", label: "Auto (Theme-based)", description: "Automatically chooses based on theme" },
    { value: "glow", label: "Glowing Circle", description: "Soft glowing circle effect" },
    { value: "ripple", label: "Ripple Effect", description: "Expanding circle with ripples" },
    { value: "neon", label: "Neon Dot", description: "Bright neon with outer glow" }
  ]

  const sizeOptions = [
    { value: "small", label: "Small", description: "Subtle and minimal" },
    { value: "medium", label: "Medium", description: "Balanced visibility" },
    { value: "large", label: "Large", description: "Prominent and bold" }
  ]

  const colorOptions = [
    { value: "auto", label: "Auto (Theme-based)", description: "Matches your theme" },
    { value: "blue", label: "Blue", description: "Professional blue tone" },
    { value: "cyan", label: "Cyan", description: "Modern cyan accent" },
    { value: "purple", label: "Purple", description: "Creative purple vibe" },
    { value: "green", label: "Green", description: "Fresh green energy" }
  ]

  const intensityOptions = [
    { value: "low", label: "Low", description: "Subtle and gentle" },
    { value: "medium", label: "Medium", description: "Balanced visibility" },
    { value: "high", label: "High", description: "Bold and prominent" }
  ]

  if (!mounted) return null

  return (
    <div className={`relative ${className}`}>
      {/* Demo Controls */}
      <Card className="fixed top-24 right-4 z-[100] w-80 max-h-[calc(100vh-8rem)] bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm border-2 border-cyan-200 dark:border-cyan-800 shadow-xl">
        {/* Demo Badge */}
        <div className="absolute -top-2 -left-2 z-10">
          <Badge className="bg-cyan-600 text-white text-xs px-2 py-1 shadow-lg">
            DEMO
          </Badge>
        </div>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MousePointer className="h-5 w-5 text-cyan-600 dark:text-cyan-400" />
              <CardTitle className="text-lg">Pointer Demo</CardTitle>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowDemo(!showDemo)}
              className="h-8 w-8 p-0 hover:bg-slate-100 dark:hover:bg-slate-800"
              title={showDemo ? "Hide controls" : "Show controls"}
            >
              {showDemo ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </Button>
          </div>
          <CardDescription className="text-sm">
            {showDemo ? "Move your mouse to see the custom pointer effect" : "Click the arrow to expand controls"}
          </CardDescription>
        </CardHeader>
        
        {showDemo && (
          <div className="overflow-hidden relative">
            <ScrollArea className="h-[calc(100vh-20rem)]">
              <CardContent className="space-y-4 pr-4 pb-4">
              {/* Instructions */}
              <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                <div className="text-xs text-blue-700 dark:text-blue-300 font-medium mb-1">
                  💡 How to use:
                </div>
                <div className="text-xs text-blue-600 dark:text-blue-400">
                  Move your mouse around the page to see the custom pointer effect. Use the controls below to customize its appearance.
                </div>
              </div>

              {/* Enable/Disable Toggle */}
              <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-cyan-600 dark:text-cyan-400" />
                  <Label htmlFor="pointer-enabled" className="text-sm font-medium">
                    Enable Custom Pointer
                  </Label>
                </div>
                <Switch
                  id="pointer-enabled"
                  checked={isEnabled}
                  onCheckedChange={(checked) => {
                    setIsEnabled(checked)
                    console.log('Pointer enabled:', checked) // Debug log
                  }}
                />
              </div>

              {/* Style Selection */}
              <div className="space-y-2">
                <Label className="text-sm font-medium flex items-center gap-2">
                  <Settings className="h-4 w-4" />
                  Pointer Style
                </Label>
                <Select value={currentStyle} onValueChange={(value: any) => {
                  setCurrentStyle(value)
                  console.log('Style changed to:', value) // Debug log
                }}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {styleOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        <div>
                          <div className="font-medium">{option.label}</div>
                          <div className="text-xs text-muted-foreground">{option.description}</div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Size Selection */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">Size</Label>
                <Select value={currentSize} onValueChange={(value: any) => {
                  setCurrentSize(value)
                  console.log('Size changed to:', value) // Debug log
                }}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {sizeOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        <div>
                          <div className="font-medium">{option.label}</div>
                          <div className="text-xs text-muted-foreground">{option.description}</div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Color Selection */}
              <div className="space-y-2">
                <Label className="text-sm font-medium flex items-center gap-2">
                  <Palette className="h-4 w-4" />
                  Color
                </Label>
                <Select value={currentColor} onValueChange={(value: any) => {
                  setCurrentColor(value)
                  console.log('Color changed to:', value) // Debug log
                }}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {colorOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        <div>
                          <div className="font-medium">{option.label}</div>
                          <div className="text-xs text-muted-foreground">{option.description}</div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Intensity Selection */}
              <div className="space-y-2">
                <Label className="text-sm font-medium flex items-center gap-2">
                  <Zap className="h-4 w-4" />
                  Intensity
                </Label>
                <Select value={currentIntensity} onValueChange={(value: any) => {
                  setCurrentIntensity(value)
                  console.log('Intensity changed to:', value) // Debug log
                }}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {intensityOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        <div>
                          <div className="font-medium">{option.label}</div>
                          <div className="text-xs text-muted-foreground">{option.description}</div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Current Configuration Display */}
              <div className="pt-2 border-t border-slate-200 dark:border-slate-700">
                <div className="text-xs text-muted-foreground mb-2">Current Configuration:</div>
                <div className="flex flex-wrap gap-1">
                  <Badge variant="secondary" className="text-xs">
                    {styleOptions.find(s => s.value === currentStyle)?.label}
                  </Badge>
                  <Badge variant="secondary" className="text-xs">
                    {sizeOptions.find(s => s.value === currentSize)?.label}
                  </Badge>
                  <Badge variant="secondary" className="text-xs">
                    {colorOptions.find(c => c.value === currentColor)?.label}
                  </Badge>
                  <Badge variant="secondary" className="text-xs">
                    {intensityOptions.find(i => i.value === currentIntensity)?.label}
                  </Badge>
                </div>
              </div>

              {/* Quick Presets */}
              <div className="pt-2 border-t border-slate-200 dark:border-slate-700">
                <div className="text-xs text-muted-foreground mb-2">Quick Presets:</div>
                <div className="flex flex-col gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-xs h-8 justify-start"
                    onClick={() => {
                      setCurrentStyle("glow")
                      setCurrentSize("medium")
                      setCurrentColor("blue")
                      setCurrentIntensity("medium")
                      console.log('Applied Professional preset')
                    }}
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                      Professional
                    </div>
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-xs h-8 justify-start"
                    onClick={() => {
                      setCurrentStyle("neon")
                      setCurrentSize("large")
                      setCurrentColor("cyan")
                      setCurrentIntensity("high")
                      console.log('Applied Futuristic preset')
                    }}
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse"></div>
                      Futuristic
                    </div>
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-xs h-8 justify-start"
                    onClick={() => {
                      setCurrentStyle("ripple")
                      setCurrentSize("small")
                      setCurrentColor("purple")
                      setCurrentIntensity("low")
                      console.log('Applied Subtle preset')
                    }}
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                      Subtle
                    </div>
                  </Button>
                </div>
              </div>

              {/* Status Indicator */}
              <div className="pt-2 border-t border-slate-200 dark:border-slate-700">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Status:</span>
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${isEnabled ? 'bg-green-500' : 'bg-red-500'}`}></div>
                    <span className={isEnabled ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}>
                      {isEnabled ? 'Active' : 'Disabled'}
                    </span>
                  </div>
                </div>
              </div>
              </CardContent>
            </ScrollArea>
            {/* Scroll indicator */}
            <div className="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-t from-white/80 dark:from-slate-900/80 to-transparent pointer-events-none"></div>
          </div>
        )}
      </Card>

      {/* Custom Pointer with Current Settings */}
      <CustomPointer
        style={currentStyle}
        size={currentSize}
        color={currentColor}
        intensity={currentIntensity}
        disabled={!isEnabled}
        className="z-40"
      />
    </div>
  )
}
