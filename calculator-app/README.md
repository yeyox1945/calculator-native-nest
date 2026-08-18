# Calculator App 📱

A modern, responsive calculator application built with **React Native**, **Expo SDK 57**, **Expo Router**, **TypeScript**, and **NativeWind (Tailwind CSS)**. The app connects to a backend calculation API via **Axios** and **TanStack React Query**.

---

## 🛠 Tech Stack

- **Framework**: [Expo SDK 57](https://docs.expo.dev/versions/v57.0.0/) with [Expo Router](https://docs.expo.dev/router/introduction/) (file-based routing)
- **UI & Styling**: [NativeWind v4](https://www.nativewind.dev/) (Tailwind CSS v3)
- **State & Data Fetching**: [@tanstack/react-query](https://tanstack.com/query/latest)
- **HTTP Client**: [Axios](https://axios-http.com/)
- **Testing**: [Jest](https://jestjs.io/), [jest-expo](https://docs.expo.dev/develop/unit-testing/), and [@testing-library/react-native](https://callstack.github.io/react-native-testing-library/) (100% test coverage)
- **Package Manager**: [pnpm](https://pnpm.io/)

---

## 📋 Prerequisites

Before getting started, make sure you have the following installed on your machine:

- **Node.js**: `v18.x` or later
- **pnpm**: `npm install -g pnpm` (or use `npm` / `yarn` / `bun`)
- **Mobile Development Environment** (one of the following):
  - **Expo Go** app on your physical iOS or Android device.
  - **iOS Simulator** (macOS with Xcode installed).
  - **Android Emulator** (Android Studio with an AVD configured).
- **Backend API**: The [calculator-api](../calculator-api/) service running locally or in a remote environment.

---

## ⚙️ Environment Configuration

This app uses Expo's built-in environment variable management. Any variable exposed to the client must be prefixed with `EXPO_PUBLIC_`.

### Environment Files

Expo automatically loads `.env` files based on priority:
- `.env.local`: Local overrides (ignored by Git, recommended for local dev).
- `.env.development`: Loaded automatically during development (`NODE_ENV=development`).
- `.env.production`: Loaded during production builds (`NODE_ENV=production`).
- `.env`: Default fallback for all environments.
- `.env.template`: Example template committed to source control.

### Setup Your Environment

1. Copy `.env.template` to create your local `.env.local`:
   ```bash
   cp .env.template .env.local
   ```

2. Configure `EXPO_PUBLIC_API_URL` depending on your setup:

| Platform / Target | `EXPO_PUBLIC_API_URL` Value | Notes |
| :--- | :--- | :--- |
| **iOS Simulator** | `http://localhost:3000` | Simulator shares `localhost` with the host machine. |
| **Android Emulator** | `http://10.0.2.2:3000` | `10.0.2.2` aliases your host computer's `localhost` on Android. |
| **Physical Device (Expo Go)** | `http://<YOUR_LOCAL_IP>:3000` | Replace with your computer's local network IP (e.g. `http://192.168.1.50:3000`). Both device and computer must be on the same Wi-Fi. |
| **Production** | `https://api.yourdomain.com` | Your deployed production API endpoint. |

> **Tip**: If you change `.env` variables while the Expo dev server is running, restart it with cache reset (`npx expo start -c` or `pnpm start -c`).

---

## 🚀 Getting Started

### 1. Install Dependencies

```bash
pnpm install
```

### 2. Start the Development Server

```bash
pnpm start
```

### 3. Run on a Specific Platform

- **iOS Simulator**:
  ```bash
  pnpm ios
  ```
- **Android Emulator / Device**:
  ```bash
  pnpm android
  ```
- **Web**:
  ```bash
  pnpm web
  ```

---

## 🧪 Testing & Code Quality

### Run Unit Tests
```bash
pnpm test
```

### Run Tests with Coverage
```bash
pnpm test:cov
```

### Run Linter
```bash
pnpm lint
```

---

## 📂 Project Structure

```text
calculator-app/
├── assets/                  # App icons, splash screens, and static images
├── src/
│   ├── actions/             # Asynchronous API actions (e.g. calculateAction)
│   │   └── __tests__/       # Action unit tests
│   ├── app/                 # Expo Router routes & layout (_layout.tsx, index.tsx)
│   ├── components/          # Reusable UI components (CalculatorButton, Result, etc.)
│   │   └── __tests__/       # Component unit tests
│   ├── core/                # Core configurations (Axios API client)
│   ├── hooks/               # Custom React hooks (useCalculator, useExpression)
│   │   └── __tests__/       # Hook unit tests
│   ├── interfaces/          # TypeScript interfaces & types
│   └── screens/             # Screen components (CalculatorScreen)
├── .env.template            # Template for environment variables
├── .env.local               # Local environment configuration (git ignored)
├── app.json                 # Expo project configuration
├── babel.config.js          # Babel config with NativeWind preset
├── global.css               # Global Tailwind CSS styles
├── jest.config.js           # Jest configuration with jest-expo preset
├── package.json             # Project dependencies and npm scripts
├── tailwind.config.js       # Tailwind CSS theme and content paths
└── tsconfig.json            # TypeScript configuration
```

---

## 🚢 Building for Production

When building for production (e.g. with [EAS Build](https://docs.expo.dev/build/introduction/)):

1. Configure production environment variables in `eas.json` or in `.env.production`.
2. Build with EAS:
   ```bash
   npx eas build --platform all
   ```
