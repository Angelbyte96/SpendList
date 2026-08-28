process.loadEnvFile();

import { createClient } from "@libsql/client";

const tursoURL = process.env.TURSO_DATABASE_URL;
const tursoAuthToken = process.env.TURSO_AUTH_TOKEN;
if (!tursoURL) throw new Error("Es necesaria la url de turso");
if (!tursoAuthToken) throw new Error("Es necesario el auth token de Turso");

const tursoClient = createClient({
	url: tursoURL,
	authToken: tursoAuthToken,
});

export { tursoClient };
