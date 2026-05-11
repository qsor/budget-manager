# Budget Manager

A responsive web application for tracking personal income and expenses. Built with React and Vite, it features data visualization, real-time filtering, local persistence, and a mobile-first design with touch-optimized interactions.

[Live Demo](https://budget-manager.vercel.app)

## Description

Budget Manager is a lightweight, client-side finance tracker that helps users monitor daily spending and income. All data is stored securely in the browser using LocalStorage, eliminating the need for a backend while ensuring persistence across sessions. The interface adapts seamlessly between desktop and mobile devices, featuring optimized touch interactions for mobile users and a structured grid layout for desktop screens.

## Features

- Add, delete, and manage income/expense transactions with categories
- Interactive pie chart with toggle between expenses and income views
- Real-time filtering by type, category, and keyword search
- Multi-format export: CSV (Excel-compatible), JSON, and plain TXT
- Automatic data persistence via LocalStorage
- PWA support: installable on mobile/desktop, works offline
- Responsive layout with desktop-optimized grid and mobile touch animations
- Dark mode with custom color scheme (#2c333f background)
- Font switching: System, Inter, Roboto, JetBrains Mono
- Form validation and confirmation dialogs for destructive actions
- Virtualized list rendering for performance with large datasets

## Tech Stack

- React 18 with Hooks and Context
- Vite for fast development and optimized builds
- Tailwind CSS for utility-first styling with dark mode support
- Recharts for interactive data visualization
- @tanstack/react-virtual for list virtualization
- vite-plugin-pwa for Progressive Web App functionality
- Vitest & React Testing Library for unit testing
- LocalStorage API for client-side persistence
- JavaScript (ES6+)

## Installation

### Prerequisites

Ensure you have the following installed:
- Node.js 18 or higher
- npm or yarn package manager

### Step-by-Step ( Year after year XD )  Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/budget-manager.git
   cd budget-manager

2. Install dependencies:
   ```bash
    npm install

4. Start the development server:
   ```bash
    npm run dev
The application will run at http://localhost:5173

6. Run tests (optional):
   ```bash
    npm run test


## Support

If you find this project useful, please consider giving it a star on GitHub. Your support helps me improve the project and motivates further development.

⭐ [Star this repository](https://github.com/qsor/budget-manager)

## Contact

For feedback, suggestions, or collaboration opportunities, feel free to reach out:

- Telegram: [@qsor_ru](http://t.me/qsor_ru)
- GitHub: [@qsor](https://github.com/qsor)
- Email: qsor.support@gmail.com
