import { readFileSync } from "node:fs";
import { join } from "node:path";
import { tursoClient } from "./client";

const rutaAbsoluta = join(import.meta.dirname, "schema.sql");
const schema = readFileSync(rutaAbsoluta, "utf-8");

try {
	await tursoClient.executeMultiple(schema);
	console.log("Migración exitosa");
} catch (e) {
	const message = e instanceof Error ? e.message : "Error desconocido";
	console.error(message);
}
