# Procrastination Tracker

A brutal productivity app that detects procrastination, sends roasting notifications, and locks your phone in hard mode until a task is done.

## Features

### To-Do List Tracking
- Add, edit, and delete tasks
- Track last interaction time
- Detect inactivity (configurable interval)

### Roast Notifications
- Randomized brutal push notifications
- Triggered after set inactivity period
- Customizable roast messages

### Hard Mode
- Optional toggle to lock the interface
- Disables all non-productive actions
- Unlocks only after completing a task

### Settings
- Configure notification intervals
- Enable/disable hard mode
- Customize roast messages

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Zustand (State Management)

## Development

The app is structured as follows:
- `/src/app` - Main application pages and API routes
- `/src/components` - Reusable React components
- `/src/lib` - Utilities, hooks, and state management

## License

MIT