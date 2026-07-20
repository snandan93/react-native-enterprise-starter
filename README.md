# React Native Enterprise Starter

A production-minded, open-source React Native CLI starter demonstrating a feature-first architecture through a working task and team management app. It targets React Native 0.86 and the New Architecture.

## Included

- Protected authentication with Keychain-backed session restoration, logout, refresh-token single-flight logic, and a replaceable mock API
- Dashboard, task list/detail/create/edit, profile, settings, splash, offline, and generic error experiences
- Typed design system, runtime light/dark/system themes, English and Hindi resources, accessibility semantics, and no inline screen styles
- Typed development/staging/production profiles with a persisted runtime environment switch, dynamic API routing, and per-environment logging
- TanStack Query caching, Redux Toolkit business state, Zustand UI preferences, MMKV persistence, NetInfo connectivity handling, and an offline mutation queue boundary
- Axios normalization and cancellation support; raw transport errors never reach screens
- Jest + Testing Library foundations, Detox smoke setup, strict TypeScript, ESLint, Prettier, Husky, lint-staged, and GitHub Actions

## Quick start

Requirements: Node 22.11+, Yarn via Corepack, Ruby/Bundler, Xcode 16+ for iOS, or Android Studio with the current Android SDK.

```bash
corepack enable
yarn install
cd ios && bundle install && bundle exec pod install && cd ..
yarn ios # or yarn android
```

Sign in with `demo@enterprise.dev` / `Password123!`. No backend is required.

## Environment configuration

Public mobile configuration is defined and type-checked in `src/app/config/env.ts`. Each profile includes an app name, API base URL, request timeout, log level, and mock API flag. All starter profiles use the included mock APIs so environment switching can be tested without a backend. After replacing a profile's placeholder URL with a working server, set its `useMockApi` value to `false` to route authentication and task requests to that server.

Authenticated users can switch profiles from **Settings → Environment** without rebuilding the app. A switch is persisted across launches and immediately affects new requests. It also clears the React Query cache and secure session, then signs the user out, preventing data or credentials from one environment being reused in another.

Update the placeholder URLs in `environmentProfiles` before connecting a backend. The expected example endpoints are:

- `POST /auth/login`
- `POST /auth/forgot-password`
- `POST /auth/refresh`
- `GET /tasks` and `GET /tasks/:id`
- `POST /tasks` and `PUT /tasks/:id`

The `.env*.example` files document equivalent values for CI and local tooling. Real `.env` files are ignored by Git. They are not loaded into the runtime profile registry because runtime switching requires every public profile to be bundled. Do not bundle private API keys, signing credentials, or service-account secrets in a mobile application; store them on the backend or in your CI secret store.

## Architecture

Code is grouped by business feature. A feature owns its API, hooks, schemas, store, types, components, and screens. Shared UI contains only domain-neutral components. Services define infrastructure boundaries that can be replaced without changing screens.

State has deliberate ownership:

- **TanStack Query**: remote/cacheable server state such as tasks. It handles freshness, retry, invalidation, and reconnection.
- **Redux Toolkit**: global business workflow state such as the authenticated session and cross-screen task drafts.
- **Zustand**: small UI-only preferences such as theme and transient toast state.
- **Component state**: ephemeral state local to a view, including confirmation visibility.

Aliases (`@app`, `@features`, `@components`, `@services`, `@theme`, `@utils`, `@types`, `@hooks`, `@localization`) are configured in TypeScript, Babel, and Jest.

## Replacing the mock backend

Implement the same typed contracts exposed by `src/features/*/api` and update the typed profiles in `src/app/config/env.ts`. The Axios client resolves the selected base URL and timeout for every request, injects access tokens, and coordinates concurrent 401 responses through one refresh promise before retrying each original request once.

## Security notes

Tokens use iOS Keychain / Android Keystore through React Native Keychain, not MMKV. MMKV stores non-sensitive preferences only. Clear credentials on irrecoverable refresh failure in a production API adapter. Add certificate pinning only after planning rotation and incident recovery. Keep logs free of credentials and personal data.

## Offline model

NetInfo drives Query's online manager and the global banner. Previously fetched Query data remains usable while offline and retries when connectivity returns. `PendingActionQueue` is intentionally a narrow abstraction: production apps can persist, encrypt, deduplicate, and replay it according to their domain conflict rules.

## Quality commands

```bash
yarn typecheck
yarn lint
yarn test
yarn e2e:build:ios && yarn e2e:test:ios
```

## Contributing

Use focused feature modules, retain strict typing, add accessible labels and tests for behavior, and run all quality commands before opening a pull request. See [SECURITY.md](SECURITY.md) for responsible disclosure.
