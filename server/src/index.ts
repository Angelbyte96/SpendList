process.loadEnvFile();

import { createClient } from "@libsql/client";
import express from "express";

const tursoURL = process.env.TURSO_DATABASE_URL;
const tursoAuthToken = process.env.TURSO_AUTH_TOKEN;
if (!tursoURL) throw new Error("Es necesaria la url de turso");
if (!tursoAuthToken) throw new Error("Es necesario el auth token de Turso");

const PORT = process.env.PORT ?? 4010;

const tursoClient = createClient({
	url: tursoURL,
	authToken: tursoAuthToken,
});

const app = express();

app.get("/health", (req, res) => {
	return res.json({ status: "ok", uptime: process.uptime() });
});

if (process.env.NODE_ENV !== "production") {
	app.listen(PORT, () => {
		console.log(`Servidor corriendo en el puerto: ${PORT}`);
	});
}

export default app;
