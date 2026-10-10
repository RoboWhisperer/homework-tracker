# Homework Tracker

A desktop homework tracker with reminders, automatic schedules and a Liquid Glass UI. Built with Electron; data stays on your machine.

## Features
- Assignments with courses, due dates/times, priority, estimates, subtasks, notes and repeats
- List, calendar and stats views; search, filters and sorting
- Desktop notifications, daily digest, and auto-generated recurring assignments
- Runs in the system tray; customizable theme, accent color and window opacity
- JSON export/import

## Run
```bash
npm install
npm start
```

## Build installers
```bash
npm run dist       # Linux: AppImage + .deb
npm run dist:win   # Windows installer
npm run dist:mac   # macOS .dmg (must run on a Mac)
```

Linux builds launch with `--no-sandbox` (Chromium's sandbox failed on the test machine).
