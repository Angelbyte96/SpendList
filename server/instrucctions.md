# Plan: API de SpendList con Express + Turso

Objetivo: practicar Express construyendo una API propia (login + CRUD) conectada
a una base Turso separada de la real (no tocar la BD de `client/`).

Decisión previa: crear una base Turso nueva solo para este server
(`turso db create spendlist-practice`). Mismo motor, cero riesgo sobre la app real.

Cada fase termina con un checkpoint manual (curl/Postman/Thunder Client) antes
de avanzar a la siguiente.

## Fase 0 — Esqueleto
- `npm init`, TypeScript, `express`.
- Servidor mínimo con `GET /health` → 200.
- Checkpoint: `npm run dev` levanta y responde.

## Fase 1 — Conexión a Turso
- Cliente `@libsql/client` (versión node, no `/web`).
- Variables de entorno con `process.loadEnvFile()` (nativo de Node, sin
  `dotenv` — Node local es v22.22.2, la API es estable desde v20.10.0).
- Ruta de prueba `GET /db-check` con un `SELECT 1`.
- Checkpoint: no avanzar sin verificar la conexión.

## Fase 2 — Schema propio
- Tabla `users` (id, email único, password_hash, created_at).
- SQL crudo o query builder simple (Drizzle opcional; SQL plano recomendado
  para entender bien el flujo primero).

## Fase 3 — Registro
- `POST /auth/register`: validar body, hashear password (`bcrypt`), insertar
  usuario, nunca devolver el hash en la respuesta.

## Fase 4 — Login
- `POST /auth/login`: buscar por email, comparar hash, firmar JWT
  (`jsonwebtoken`) con expiración corta.
- Fase central: entender el flujo stateless, qué va en el payload, por qué el
  password nunca viaja en el token.

## Fase 5 — Middleware de auth
- Middleware que lee `Authorization: Bearer`, verifica el JWT, cuelga `req.user`.
- Probar primero con una ruta dummy protegida (`GET /me`).

## Fase 6 — CRUD de Lists e Items
- Referencia de operaciones (no copiar código, es Astro/astro:db):
  `client/src/_disabled-api/{list,items,finalize}.ts`
- Todo bajo el middleware de auth, todo scopeado a `userId`.

## Fase 7 — Endurecer
- Manejo de errores centralizado (middleware de error al final).
- Status codes correctos.
- Opcional: refresh tokens, logout.

## Reglas de trabajo
- El código lo escribe el usuario. Claude actúa como coach: guía y responde
  dudas puntuales cuando el usuario se traba, no implementa por adelantado.
- No avanzar de fase sin el checkpoint de la anterior verificado.

## Foco de cada fase (para repasar antes de continuar)

| Fase | Tema principal |
|---|---|
| 0 — Esqueleto | Express puro (setup, rutas básicas) |
| 1 — Conexión a Turso | Cliente libSQL + env vars (nativas de Node) — casi nada de Express |
| 2 — Schema propio | SQL puro (diseño de tablas) — cero Express |
| 3 — Registro | Express (rutas, body) + bcrypt/hashing (seguridad) |
| 4 — Login | Express + JWT (auth stateless) — la fase más conceptual |
| 5 — Middleware de auth | Express (patrón de middleware) + verificación de JWT |
| 6 — CRUD de Lists/Items | Express aplicado (rutas CRUD) + SQL |
| 7 — Endurecer | Express (middleware de error) + JWT opcional (refresh/logout) |

Para repasar antes de retomar: Express puro en fases 0, 5 y 7; SQL/DB en
fases 1 y 2; JWT/auth stateless en la fase 4 (payload, por qué el password
nunca viaja, firma/verificación).
