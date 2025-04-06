# Eagle Analytics Dashboard

<p align="center">
  <img src="public/logo.png" alt="Eagle Analytics Logo" width="200" />
</p>

## Overview

Eagle Analytics is a comprehensive web-based dashboard for Industry 4.0 manufacturing environments. It provides real-time insights, detailed performance metrics, and actionable alerts for machines on the shopfloor. The platform is designed to help operators, supervisors, maintenance teams, and production managers make informed decisions through intuitive visualizations and analytics.

Developed by Loginware Softtec PVT LTD, Eagle Analytics is part of an integrated product suite for smart manufacturing that includes:

- **EAGLE**: IoT Edge Computing Gateway (Mini and Pro variants)
- **SPARROW**: ERP system for payroll, inventory, maintenance, quality, and production planning
- **Loginware Analytics**: Real-time data visualization platform

## Features

### Core Modules

- **Live Machine Status**: Real-time monitoring of machine states, cycle counts, and operator details
- **Shift-Wise Utilization**: Analysis of machine utilization across different shifts
- **Operator Performance**: Efficiency metrics, cycle times, and idle time analysis by operator
- **Production Trends**: Part-wise production counts, cycle times, and rejection rates
- **Alarm Analysis**: Frequency analysis, MTBF, MTTR, and root cause identification
- **Predictive Maintenance**: AI-driven failure predictions and component health monitoring
- **OEE Analysis**: Comprehensive breakdown of Overall Equipment Effectiveness

### Advanced Visualizations

- Interactive charts and graphs for data analysis
- Real-time data updates via websockets
- Customizable dashboards and alerts
- Mobile-responsive design for access from any device

### UX Enhancements

- **Tour Guide**: Interactive walkthrough for new users
- **Mobile Optimization**: Responsive design for all device sizes
- **Micro-interactions**: Subtle animations and feedback mechanisms
- **Interactive Tooltips**: Enhanced information display
- **Customizable Alerts**: User-defined thresholds for notifications
- **Advanced Animations**: Smooth transitions and visual feedback

## Technology Stack

### Frontend

- **Framework**: Next.js 15 with React and TypeScript
- **Routing**: Next.js App Router with file-based routing
- **Styling**: Tailwind CSS for utility-first styling
- **State Management**: Zustand for efficient global state
- **Data Fetching**: Next.js Server Components and TanStack Query for client-side data
- **Visualization**: Apache ECharts for interactive charts
- **Animations**: Framer Motion for smooth transitions and micro-interactions
- **Theming**: next-themes for dark/light mode support

### Backend Integration

The dashboard integrates with:

- **EAGLE Devices**: For machine signals and data collection
- **SPARROW ERP**: For production, inventory, and quality data
- **Centralized Database**: As the single source of truth for all systems

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/loginware-softtec/eagle-analytics.git
cd eagle-analytics

# Install dependencies
npm install
# or
yarn install

# Start the development server with Turbopack
npm run dev
# or
yarn dev
```

### Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```
NEXT_PUBLIC_API_URL=your_api_url
NEXT_PUBLIC_WS_URL=your_websocket_url
```

## Project Structure

```
/
├── app/                      # Next.js App Router directory
│   ├── dashboard/            # Dashboard routes
│   │   ├── alarms/           # Alarms analysis page
│   │   ├── downtime/         # Downtime analysis page
│   │   ├── machine-status/   # Machine status page
│   │   ├── maintenance/      # Maintenance page
│   │   ├── oee/              # OEE analysis page
│   │   ├── operator-performance/ # Operator performance page
│   │   ├── production/       # Production trends page
│   │   ├── profile/          # User profile page
│   │   ├── settings/         # Settings page
│   │   ├── utilization/      # Utilization analysis page
│   │   ├── layout.tsx        # Dashboard layout with sidebar
│   │   └── page.tsx          # Main dashboard overview page
│   ├── login/                # Authentication pages
│   ├── globals.css           # Global styles
│   ├── layout.tsx            # Root layout
│   ├── not-found.tsx         # 404 page
│   └── page.tsx              # Landing page
├── components/               # Reusable components
│   ├── ui/                   # UI components
│   ├── alarms-overview.tsx   # Alarms dashboard component
│   ├── alert-settings.tsx    # Alert configuration component
│   ├── dashboard-sidebar.tsx # Sidebar navigation component
│   ├── downtime-overview.tsx # Downtime analysis component
│   ├── machine-status-overview.tsx # Machine status component
│   ├── maintenance-overview.tsx # Maintenance component
│   ├── notifications.tsx     # Notifications component
│   ├── oee-overview.tsx      # OEE analysis component
│   ├── operator-performance-overview.tsx # Operator performance component
│   ├── page-wrapper.tsx      # Page transition wrapper
│   ├── production-overview.tsx # Production trends component
│   ├── theme-provider.tsx    # Theme context provider
│   ├── theme-toggle.tsx      # Dark/light mode toggle
│   ├── tour-guide.tsx        # Interactive tour guide
│   ├── user-nav.tsx          # User navigation component
│   └── utilization-overview.tsx # Utilization analysis component
├── lib/                      # Utility functions and hooks
│   ├── animation-variants.ts # Framer Motion animation presets
│   ├── use-local-storage.ts  # Local storage hook
│   └── utils.ts              # General utility functions
├── public/                   # Static assets
├── docs/                     # Project documentation
├── .env.local                # Environment variables
├── next.config.js            # Next.js configuration
├── package.json              # Project dependencies
├── tailwind.config.ts        # Tailwind CSS configuration
└── tsconfig.json             # TypeScript configuration
```

## Authentication

The application uses JWT (JSON Web Token) for secure authentication. All API requests are made over HTTPS, and the system implements role-based access control for different user types:

- Operators
- Supervisors
- Maintenance Teams
- Production Managers

## Development Status

Eagle Analytics is currently in active development. All core modules have been implemented, with ongoing enhancements and optimizations. For detailed implementation status, see the [Implementation Tracking Document](cursorUpdates/Implementation-Tracking-docs.md).

## Recent Updates

- Added Tour Guide for new users with interactive step-by-step guidance
- Enhanced Mobile Experience with responsive layouts
- Added Micro-interactions with motion components
- Created Interactive Tooltips with rich content
- Implemented Customizable Alerts for notification thresholds
- Added Alarms Analysis dashboard with comprehensive metrics
- Fixed UI padding consistency across pages

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is proprietary software owned by Loginware Softtec PVT LTD.

## Contact

Loginware Softtec PVT LTD - [contact@loginware.com](mailto:contact@loginware.com)

Project Link: [https://github.com/loginware-softtec/eagle-analytics](https://github.com/loginware-softtec/eagle-analytics)
