# Modern Blog Application

A beautiful, modern blog application built with React, TypeScript, Zustand, and TailwindCSS. Features a clean, responsive design with search, filtering, and comprehensive testing.

## Features

- **Blog List Page**: Display all blog posts in a modern card-based layout
- **Blog Details Page**: View individual blog posts with full content and author information
- **Search Functionality**: Search through blog titles and content
- **Tag Filtering**: Filter blogs by topic tags
- **Responsive Design**: Fully responsive layout that works on all devices
- **State Management**: Efficient state management with Zustand
- **Modern UI**: Built with shadcn/ui components and TailwindCSS
- **Testing**: Comprehensive unit tests (Vitest) and E2E tests (Playwright)



## Technologies

- **React**: Modern React with hooks
- **TypeScript**: Type-safe code
- **Zustand**: Lightweight state management
- **TailwindCSS**: Utility-first CSS framework
- **shadcn/ui**: Beautiful, accessible components
- **React Router**: Client-side routing
- **Vitest**: Fast unit testing
- **Playwright**: Reliable E2E testing
- **JSONPlaceholder**: External API for blog data

## Design System

The application uses a modern design system with:
- **Primary Color**: Purple to blue gradient (#6366f1 → #3b82f6)
- **Accent Color**: Vibrant cyan for interactive elements
- **Typography**: Clean, hierarchical text styles
- **Animations**: Smooth transitions on hover and interactions
- **Cards**: Elevated design with subtle shadows

## Testing

### Unit Tests (Vitest)

Run unit tests for components, store, and utilities:

```bash
npm run test
```

Test files are located in `src/__tests__/` and cover:
- Zustand store functionality
- Component rendering and behavior
- Utility function logic

### E2E Tests (Playwright)

Run end-to-end tests:

```bash
# Install Playwright browsers (first time only)
npx playwright install

# Run E2E tests
npm run test:e2e

# Run with UI
npm run test:e2e:ui

# Run specific test file
npx playwright test e2e/blog.spec.ts
```

E2E tests cover:
- Blog list page loading
- Search functionality
- Tag filtering
- Navigation to blog details
- Responsive design

## Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start development server**:
   ```bash
   npm run dev
   ```

3. **Run tests**:
   ```bash
   # Unit tests
   npm run test

   # E2E tests
   npm run test:e2e
   ```

4. **Build for production**:
   ```bash
   npm run build
   ```

## API Integration

The application fetches data from [JSONPlaceholder](https://jsonplaceholder.typicode.com/):
- `/posts` - Blog posts
- `/users` - Author information

The Zustand store handles:
- Fetching and caching data
- Search and filter logic
- Loading and error states

## Best Practices

- **Component Organization**: Small, focused components
- **Type Safety**: Comprehensive TypeScript types
- **State Management**: Centralized Zustand store
- **Testing**: High test coverage for critical paths
- **Accessibility**: Semantic HTML and ARIA labels
- **Performance**: Optimized rendering and lazy loading
- **Responsive**: Mobile-first design approach
