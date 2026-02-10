# AI Development Rules

This document outlines the tech stack and development conventions for this project to ensure consistency and maintainability.

## Tech Stack

This is a modern web application built with the following technologies:

*   **Framework:** React (v19) with Vite for a fast development experience.
*   **Language:** TypeScript for type safety and improved developer experience.
*   **Styling:** Tailwind CSS is used exclusively for styling. All styles are applied directly in the components using utility classes, with theme customizations defined in `index.html`.
*   **Icons:** `lucide-react` is the designated icon library for a consistent and lightweight icon set.
*   **Animations:** A custom `Reveal.tsx` component is used for handling on-scroll animations.
*   **Architecture:** The application is a single-page landing page, with components organized in the `src/components` directory.

## Development Rules

Please adhere to the following rules when making changes to the codebase:

1.  **Styling:**
    *   **ONLY** use Tailwind CSS for styling. Do not add custom CSS files, CSS-in-JS libraries (like Emotion or Styled Components), or other styling solutions.
    *   Utilize the predefined colors in the `tailwind.config` script in `index.html` (e.g., `apvs-blue-900`, `apvs-green-500`) to maintain brand consistency.

2.  **Components:**
    *   Create small, single-responsibility components.
    *   All components must be placed in the `src/components/` directory.
    *   Use functional components with React Hooks. Class components are not permitted.

3.  **Icons:**
    *   All icons **must** come from the `lucide-react` library. Do not install other icon libraries or use SVGs directly unless absolutely necessary (like the WhatsApp icon).

4.  **Animations:**
    *   For on-scroll reveal animations, use the existing `Reveal.tsx` component. This ensures a consistent animation style throughout the application.

5.  **State Management:**
    *   For local component state, use React's built-in hooks (`useState`, `useEffect`).
    *   Avoid adding complex state management libraries (like Redux or Zustand) as the application's current scope does not require them.

6.  **Dependencies:**
    *   Keep the number of external dependencies to a minimum. Before adding a new npm package, evaluate if the required functionality can be achieved with the existing stack.