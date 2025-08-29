# Scholar Nexus


Scholar Nexus is a modern, full-stack academic resource hub designed to democratize access to knowledge. It provides a centralized platform for students, faculty, and administrators to discover, share, and discuss academic materials, including research papers, books, and courses.

## ✨ Key Features

*   **Comprehensive Resource Hub**: Browse, search, and filter a vast collection of academic resources.
*   **Role-Based Access Control**: Secure user authentication and distinct roles (Admin, Faculty, Student) powered by Clerk, with dedicated dashboards and permissions for each role.
*   **Interactive Community Forums**: Engage in discussions, ask questions, and share insights with peers and experts.
*   **Resource Contribution & Requests**: Users can contribute new resources to the platform and request materials that are not yet available.
*   **Offline Book Reservation**: A system to reserve physical books from the library for pickup.
*   **Personalized User Profiles**: Manage personal information, view contributions, manage settings, and bookmark favorite resources.
*   **Modern & Responsive UI**: Built with React, TypeScript, and Shadcn/UI for a clean, accessible, and responsive user experience across all devices.

## 🚀 Tech Stack

*   **Frontend**: React, Vite, TypeScript
*   **UI Components**: Shadcn/UI, Tailwind CSS, Radix UI
*   **Routing**: React Router
*   **State Management**: TanStack Query (React Query)
*   **Authentication**: Clerk
*   **Form Management**: React Hook Form
*   **Schema Validation**: Zod

## 📚 Pages & Components

The application is structured into several key pages and reusable components:

### Core Pages
*   **`Index`**: The landing page with featured resources and category browsing.
*   **`Browse`**: The main discovery page with advanced search and filtering capabilities.
*   **`Forum`**: A community discussion board with topics, replies, and moderation.
*   **`RequestPage`**: A form for users to request new academic resources.
*   **`BookServicePage`**: An interface to reserve physical books for offline pickup.
*   **`ProfilePage`**: A user-centric page to manage profile details, settings, bookmarks, and contributions.
*   **`AdminPanel`**: A dashboard for administrators to manage users, resources, and system settings.
*   **`FacultyPanel`**: A dashboard for faculty members to manage their contributed resources and student interactions.
*   **`AddResourcePage`**: A form for faculty and admins to contribute new resources to the platform.

### Core Components
*   **`Navbar`**: Responsive navigation bar with search, user authentication, and role-based links.
*   **`ResourceCard`**: A detailed card to display information about an academic resource.
*   **`ResourceFilters`**: A sidebar component for filtering resources by type, access level, categories, and more.
*   **`ResourceRequestForm`**: A form for submitting detailed requests for new materials.
*   **`ForumPreview`**: A component showcasing recent activity from the discussion forums.
*   **`ProfileUserInfo` / `ProfileEditForm`**: Components for displaying and editing user profile information.

## ⚙️ Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

*   Node.js (v18 or higher)
*   npm or a compatible package manager

### Installation & Setup

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/jayaditya-gandham/scholar_nexus.git
    cd scholar_nexus
    ```

2.  **Install NPM packages:**
    ```sh
    npm install
    ```

3.  **Set up environment variables:**

    Create a `.env` file in the root of the project and add your Clerk Publishable Key. You can find this key in your Clerk.dev dashboard.

    ```.env
    VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
    ```

4.  **Run the development server:**
    ```sh
    npm run dev
    ```

    The application will be available at `http://localhost:8080`.

## 📂 Project Structure

The repository is organized with a clear separation of concerns, making it easy to navigate and contribute.

```
/src
├── App.tsx             # Main application component with routing setup
├── components/         # Reusable UI components
│   ├── ui/             # Shadcn/UI components
│   ├── AuthLayout.tsx
│   ├── Navbar.tsx
│   └── ResourceCard.tsx
├── hooks/              # Custom React hooks
│   ├── useRoleCheck.tsx  # Hook for Clerk role management
│   └── use-toast.ts      # Hook for toast notifications
├── lib/                # Utility functions
├── pages/              # Top-level page components
│   ├── Browse.tsx
│   ├── Forum.tsx
│   ├── AdminPanel.tsx
│   └── ProfilePage.tsx
└── services/           # Mock API services for data fetching
    ├── resourceService.ts
    └── bookService.ts
