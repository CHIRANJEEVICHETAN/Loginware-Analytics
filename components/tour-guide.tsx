"use client"

import dynamic from 'next/dynamic'

// Create a completely client-side TourGuide component
const TourGuide = dynamic(() => import('./tour-guide-client').then(mod => mod.TourGuideClient), {
  ssr: false
})

// Export the TourButton from the client component
export { TourButton } from './tour-guide-client'

// Export the TourGuide component
export { TourGuide } 