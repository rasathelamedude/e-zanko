# e-Zanko

A hierarchical management system for Iraq's Ministry of Higher Education. e-Zanko manages the organizational structure of universities, faculties, and departments, and digitizes official correspondence between levels through a letters and approval system.

This repository contains the frontend for e-Zanko, one of three modules under the broader Zankolink platform (alongside Moodle and Zankoline).

## Tech Stack

- **Frontend:** React, TypeScript, Vite, Tailwind CSS, Shadcn/ui, TanStack Query, React Router DOM, Zustand
- **Backend:** Laravel (REST API), Laravel Sanctum for authentication
- **Database:** PostgreSQL
- **API testing:** Hoppscotch
- **Task tracking:** Jira

## Getting Started

### Prerequisites

- Node.js 18 or higher
- npm

### Setup

```bash
git clone https://github.com/rasathelamedude/e-zanko
cd e-zanko
npm install
cp .env.example .env
```

Fill in `.env` with the required values (see `.env.example` for the full list).

### Running locally

```bash
npm run dev
```

The app runs at `http://localhost:5173` by default.

### Building for production

```bash
npm run build
```

Output is generated in the `dist/` folder.

## Project Structure

```
src/
├── api/              # functions that call backend endpoints
├── components/
│   ├── ui/            # Shadcn generated components (do not edit manually)
│   └── common/         # shared custom components
├── layouts/           # AppLayout, AuthLayout
├── pages/             # one folder per route
├── store/             # Zustand stores
├── types/              # shared TypeScript types
├── lib/                 # axios instance, query client, utilities
```

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for branching strategy, commit conventions, and PR rules before opening any pull request.

## Roles in the System

| Role                                        | Scope                                     |
| ------------------------------------------- | ----------------------------------------- |
| MinistryAdmin                               | Manages universities, broadcasts letters  |
| UniversityPresident                         | Manages faculties within their university |
| Admin (Administration / Students / Science) | University-level letter processing        |
| Dean                                        | Manages departments within their faculty  |
| HeadOfDepartment                            | Manages courses within their department   |

## License

Internal academic/internship project — not licensed for external use.
