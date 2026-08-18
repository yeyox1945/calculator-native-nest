# Calculator Native Nest

A full-stack calculator application composed of a cross-platform mobile client and a modular backend REST API.

---

## 🛠 Tech Stack

### Mobile Frontend (`calculator-app`)
- **Framework & Runtime**: [React Native](https://reactnative.dev/) with [Expo](https://expo.dev/) (SDK 57) and [Expo Router](https://docs.expo.dev/router/introduction/) for cross-platform support (iOS, Android, Web) and file-based routing.
- **Language**: [TypeScript](https://www.typescriptlang.org/) for type safety and maintainability.
- **Styling**: [NativeWind v4](https://www.nativewind.dev/) (Tailwind CSS) for utility-first styling across platforms.
- **State & Data Fetching**: [TanStack React Query](https://tanstack.com/query/latest) paired with [Axios](https://axios-http.com/) for caching, error handling, and asynchronous API communication.
- **Testing**: [Jest](https://jestjs.io/) & [React Native Testing Library](https://callstack.github.io/react-native-testing-library/) for unit and component testing.

### Backend API (`calculator-api`)
- **Framework**: [NestJS](https://nestjs.com/) (Express platform) providing an enterprise-grade modular architecture, dependency injection, and clean separation of concerns.
- **Language**: [TypeScript](https://www.typescriptlang.org/) with strict typing, DTO validation, and custom pipes.
- **Testing**: [Jest](https://jestjs.io/) and [Supertest](https://github.com/ladjs/supertest) for unit and end-to-end (E2E) testing.
- **Containerization**: [Docker](https://www.docker.com/) & [Docker Compose](https://docs.docker.com/compose/) with multi-stage builds supporting both development (live-reload) and production environments.

---

## 📁 Project Structure & Detailed Documentation

More detailed setup instructions, available scripts, Docker configurations, environment variables, and testing procedures can be found directly within each project's respective folder:

- **Frontend App**: [calculator-app/README.md](calculator-app/README.md) – Setup, running on iOS/Android/Web, test suites, and styling details.
- **Backend API**: [calculator-api/README.md](calculator-api/README.md) – API endpoints, validation logic, Docker instructions, and test suites.
