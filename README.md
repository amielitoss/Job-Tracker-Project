# JobTrackly

JobTrackly is a responsive job application tracking dashboard built with React.

It allows users to organize their job applications, monitor application statuses, track interviews, view application statistics, and manage their job search from one interface.

The project was built as a portfolio project to strengthen my React skills and practice building a complete application from planning through development, accessibility testing, performance optimization, and deployment.

## Features

- Add new job applications
- Edit existing applications
- Delete applications
- View detailed application information
- Track application status:
  - Applied
  - Interview
  - Offer
  - Rejected
- Search applications by company or role
- Filter applications by status
- Dashboard statistics
- Applications-over-time chart
- Status distribution chart
- Interviews page automatically derived from applications with an `Interview` status
- Recent applications section
- Light and dark mode
- Theme preference saved locally
- Application data saved with `localStorage`
- Settings page
- Clear all application data with confirmation modal
- Responsive navigation for desktop, tablet, and mobile
- Keyboard-accessible modals
- Escape key support for closing dialogs
- Accessible form labels and controls

## Tech Stack

- React
- JavaScript
- Vite
- React Router
- Recharts
- Lucide React
- CSS
- LocalStorage

## Project Structure

```text
job-tracker/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   ├── pages/
│   ├── styles/
│   ├── App.jsx
│   └── main.jsx
├── index.html
├── package.json
└── vite.config.js
```

The CSS is separated by responsibility to keep the project easier to maintain:

```text
styles/
├── layout.css
├── dashboard.css
├── applications.css
├── interviews.css
├── settings.css
├── modal.css
└── responsive.css
```

## How It Works

Application data is stored in shared React state.

The different pages use the same application data, allowing changes in one part of JobTrackly to automatically affect the rest of the application.

For example:

```text
Application status changed to "Interview"
        ↓
Shared applications state updates
        ↓
Dashboard statistics update
        ↓
Charts update
        ↓
Application appears on the Interviews page
```

Application data and theme preferences are persisted using browser `localStorage`.

## Getting Started

Clone the repository:

```bash
git clone <repository-url>
```

Move into the application directory:

```bash
cd job-tracker
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Create a production build:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Performance and Accessibility

JobTrackly was tested using Google Lighthouse on the production build.

The project was developed with attention to:

- Performance
- Accessibility
- SEO
- Responsive design
- Semantic HTML
- Keyboard navigation
- Accessible dialogs
- Reduced unnecessary UI complexity

Recent Lighthouse testing reached:

| Category | Score |
| --- | ---: |
| Performance | 89–99 |
| Accessibility | 100 |
| Best Practices | 100 |
| SEO | 100 |

Performance can vary between Lighthouse runs and devices.

## Responsive Design

JobTrackly is designed to work across:

- Desktop
- Tablet
- Mobile

The application includes responsive statistics, charts, application cards, navigation, forms, and modal dialogs.

## Future Improvements

JobTrackly currently works as a frontend application using browser storage.

Planned future improvements include:

- TypeScript migration
- Node.js and Express backend
- PostgreSQL database
- User authentication
- Persistent user accounts
- Server-side application storage
- Interview-specific scheduling information
- Improved analytics
- Additional filtering and sorting
- Deployment of the full-stack version

## What I Learned

Building JobTrackly helped me practice:

- React component architecture
- Shared state management
- Props and callbacks
- Conditional rendering
- Array methods such as `map()` and `filter()`
- React Router
- LocalStorage persistence
- Reusable components
- Modal state management
- CSS organization
- Responsive design
- Accessibility
- Lighthouse testing
- Debugging and refactoring

## Author

**Carl Amiel Balita**

Web Developer focused on React and currently progressing toward full-stack development.