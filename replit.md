# Communication Guide Builder

## Overview

This is a full-stack web application that helps users create and manage personal communication guides. The application uses a multi-step form to collect information about users' vision, mission, values, and communication preferences, then stores this data for future reference and editing.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS with shadcn/ui component library
- **State Management**: React hooks and context for authentication and form state
- **Form Management**: React Hook Form with Zod validation
- **Build Tool**: Vite for development and production builds
- **UI Theme**: New York style with neutral base color and CSS variables

### Backend Architecture
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript with ES modules
- **Session Management**: In-memory storage for development
- **API Design**: RESTful endpoints with `/api` prefix
- **Error Handling**: Centralized error middleware

### Data Storage Solutions
- **Primary Database**: PostgreSQL via Neon serverless
- **ORM**: Drizzle ORM with PostgreSQL dialect
- **Schema Management**: Drizzle Kit for migrations
- **Development Storage**: In-memory storage class for development
- **API Layer**: Express.js RESTful endpoints with validation

## Key Components

### Authentication System
- **Provider**: Simplified authentication context (demo mode)
- **Context**: React Context API for global auth state management
- **Features**: Placeholder authentication for development
- **Security**: Server-side API validation and secure data handling

### Multi-Step Form System
- **Steps**: 10-step guided form covering vision, mission, values, and communication style
- **Validation**: Real-time form validation with error messaging
- **Persistence**: Auto-save functionality with manual save options
- **Export**: PDF generation using jsPDF library
- **Navigation**: Step-by-step progression with back/forward controls

### Profile Management
- **Dashboard**: User profile with form management capabilities
- **CRUD Operations**: Create, read, update, delete communication guides
- **Organization**: Multiple forms per user with custom titles
- **Status Tracking**: Completion status for each form

### UI Components
- **Component Library**: shadcn/ui with Radix UI primitives
- **Responsive Design**: Mobile-first approach with responsive breakpoints
- **Dark Theme**: CSS variables for theming support
- **Icons**: Lucide React icon library

## Data Flow

1. **User Registration/Login**: Users authenticate via Supabase Auth
2. **Form Creation**: New forms are created with default empty values
3. **Form Filling**: Users progress through 10 steps, with data saved incrementally
4. **Data Persistence**: Form data is stored in PostgreSQL via Drizzle ORM
5. **Profile Management**: Users can view, edit, and delete their saved forms
6. **Export**: Completed forms can be exported as PDF documents

## External Dependencies

### Authentication & Database
- **Supabase**: Authentication service and PostgreSQL hosting
- **Neon**: Serverless PostgreSQL database with connection pooling
- **Drizzle ORM**: Type-safe database operations

### Frontend Libraries
- **React Query**: Data fetching and caching (via @tanstack/react-query)
- **React Hook Form**: Form state management and validation
- **Zod**: Schema validation for form data
- **jsPDF**: PDF generation for form exports
- **date-fns**: Date formatting and manipulation

### UI & Styling
- **Tailwind CSS**: Utility-first CSS framework
- **Radix UI**: Accessible component primitives
- **Class Variance Authority**: Component variant management
- **Embla Carousel**: Carousel/slider functionality

## Deployment Strategy

### Development Environment
- **Runtime**: Node.js 20 with tsx for TypeScript execution
- **Hot Reload**: Vite development server with HMR
- **Database**: PostgreSQL 16 module in Replit
- **Port Configuration**: Local port 5000, external port 80

### Production Build
- **Frontend**: Vite builds static assets to `dist/public`
- **Backend**: ESBuild bundles server code to `dist/index.js`
- **Deployment**: Autoscale deployment target on Replit
- **Environment**: NODE_ENV=production with optimized builds

### Database Management
- **Migrations**: Drizzle Kit manages schema migrations
- **Connection**: Serverless connection pooling via @neondatabase/serverless
- **Environment Variables**: DATABASE_URL required for database connectivity

## Changelog

Changelog:
- June 20, 2025. Initial setup
- June 20, 2025. Completed migration from Lovable to Replit:
  - Migrated from Supabase to PostgreSQL with Drizzle ORM
  - Implemented Express.js API endpoints for form management
  - Added React Query for data fetching and caching
  - Fixed authentication context for development environment
  - Resolved background color and form creation issues
- June 20, 2025. Enhanced About page and PDF generation:
  - Added About page with Chris's personal communication framework image
  - Redesigned PDF export to match visual style of uploaded "Get to Know Me" image
  - Updated About page navigation to match landing page header
  - Made "Communication Guide" branding clickable for navigation consistency

## User Preferences

Preferred communication style: Simple, everyday language.