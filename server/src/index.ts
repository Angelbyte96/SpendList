import express from "express";

const PORT = process.env.PORT ?? 4010;

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
