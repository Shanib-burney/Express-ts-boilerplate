# Express + TypeScript Boilerplate

Quick-start template for coding tests / take-home APIs. Clone, install, and start writing routes.

## Stack

- Express 4 + TypeScript
- Zod for request validation (body/params/query)
- Centralized error handling via `ApiError`
- helmet, cors, morgan preconfigured
- Jest + Supertest example test
- ESLint + Prettier

## Getting started

```bash
npm install
cp .env.example .env
npm run dev
```

Server runs at `http://localhost:3000`, API mounted under `/api/v1`.

Try it:

```bash
curl http://localhost:3000/api/v1/health

curl -X POST http://localhost:3000/api/v1/users \
  -H "Content-Type: application/json" \
  -d '{"name":"Ada","email":"ada@example.com"}'
```

## Structure

```
src/
  config/env.ts          # env var loading + validation
  middlewares/
    validate.ts           # generic Zod request validator
    errorHandler.ts        # 404 + centralized error handler
  utils/
    ApiError.ts            # typed HTTP error with status helpers
    catchAsync.ts           # wraps async route handlers, forwards errors
  validations/            # Zod schemas per resource
  services/               # business logic / data access
  controllers/            # request/response glue, thin
  routes/                 # Express routers
  app.ts                  # express app assembly
  index.ts                # server bootstrap
```

## Adding a new resource

1. Define Zod schemas in `src/validations/<name>.validation.ts`.
2. Add business logic in `src/services/<name>.service.ts` (swap the in-memory `Map` for a real DB call).
3. Add a thin controller in `src/controllers/<name>.controller.ts` using `catchAsync`.
4. Wire routes in `src/routes/<name>.routes.ts`, validate with `validate({ body, params, query })`.
5. Mount the router in `src/routes/index.ts`.

Throw `ApiError.badRequest()/notFound()/conflict()/internal()` anywhere in services/controllers — the global error handler formats the response.

## Scripts

- `npm run dev` — watch mode
- `npm run build` / `npm start` — compile and run
- `npm test` — run Jest + Supertest tests
- `npm run lint` / `npm run lint:fix`
- `npm run format`
