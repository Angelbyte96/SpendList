import express from "express";
import { tursoClient } from "./db/client";

const PORT = process.env.PORT ?? 4010;

const app = express();

app.get("/health", (req, res) => {
	return res.json({ status: "ok", uptime: process.uptime() });
});

app.get("/db-check", async (req, res) => {
	try {
		const data = await tursoClient.execute("SELECT 1");
		res.json(data);
	} catch (e) {
		const message = e instanceof Error ? e.message : "Error desconocido";
		res.status(503).json({ error: message });
	}
});

if (process.env.NODE_ENV !== "production") {
	app.listen(PORT, () => {
		console.log(`Servidor corriendo en el puerto: ${PORT}`);
	});
}

export default app;
