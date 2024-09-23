# Project Title: CoWork Rooms


## Table of Content:

- [About The App](#about-the-app)
- [Creation](#creation)
- [Technologies](#technologies)
- [Features](#features)
- [Setup](#setup)
- [Admin Credentials](#credentials)
- [env. Configuration](#env-configuration)
- [Approach](#approach)
- [API Reference](#api-reference)

## About The App
CoWork Rooms is an app that is used for booking rooms...

## Creation
Initialized the project with TypeScript using the command:
- `npx create-next-app@latest room-reservation`

## Technologies
`React`, `Next.js 14`, `TypeScript`, `Zustand`, `React Query(created in provider just to show how we use it as a setup)`, `Tailwind CSS`, `NextAuth.js v5`, `React Hook Form`, `Zod`, `Prisma`, `shadcn/ui` ...

## Features
- Tailwind design
- Full responsiveness
- Credential authentication
- Client form validation and handling using react-hook-form
- Server error handling
- Page loading state
- Zustand state management
- room CRUD operations, booking 
- Prisma/mongoDb setup instead of mocks

## Setup
- Unzip the project folder.
-  Navigate to the project directory: 
   `cd room-reservation`
- run `npm install`
- Start the development server: `npm run dev`

## Admin Credentials
- Username: `admin@gmail.com`
- Password: `111111`

## .env Configuration
- `AUTH_SECRET='NEXTAUTH_SECRET'`
- `AUTH_URL=''`

## Approach
- **State Management**: Used Zustand for storing user session, handling all modals (Register, Login, User Profile, Confirmation), and useBookRoom.
- **Routing**: Implemented basic routing.
- **UI Components**: Created some custom components next to shadcn ui.
- **Authentication**: Used the latest version of authjs for user authentication.
- **Tests**: To-Do: Implement tests including unit tests and snapshot tests to ensure the reliability of components.
- **Documentation**: Documented the setup process and usage instructions in this README file.




