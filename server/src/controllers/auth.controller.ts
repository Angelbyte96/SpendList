import bcrypt from "bcrypt";
import type { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { z } from "zod";
import { tursoClient } from "../db/client";

const registerSchema = z.object({
	email: z.email(),
	password: z.string().min(8),
});

const loginSchema = z.object({
	email: z.email(),
	password: z.string(),
});

export async function registerController(req: Request, res: Response) {
	const result = registerSchema.safeParse(req.body);
	if (!result.success) {
		return res.status(400).json(z.flattenError(result.error));
	}
	const saltRound = 10;
	const passwordHash = await bcrypt.hash(result.data.password, saltRound);
	try {
		await tursoClient.execute({
			sql: "INSERT INTO users (email, password_hash) VALUES (?,?)",
			args: [result.data.email, passwordHash],
		});
		res.status(201).json({
			message: `Usuario creado con email ${result.data.email} exitosamente`,
		});
	} catch (e) {
		const message = e instanceof Error ? e.message : "Error desconocido";
		res.status(500).json({ error: message });
	}
}

export async function loginController(req: Request, res: Response) {
	const result = loginSchema.safeParse(req.body);
	if (!result.success) {
		return res.status(400).json(z.flattenError(result.error));
	}
	try {
		const userData = await tursoClient.execute({
			sql: "SELECT id, password_hash from users WHERE email=?",
			args: [result.data.email],
		});
		if (userData.rows.length === 0) {
			return res.status(401).json({ error: "Credenciales invalidas" });
		}
		const { id, password_hash } = userData.rows[0];
		if (typeof password_hash !== "string")
			return res.status(500).json({ error: "Error desconocido" });

		const passIsValid = await bcrypt.compare(
			result.data.password,
			password_hash,
		);

		if (!passIsValid)
			return res.status(401).json({ error: "Credenciales invalidas" });

		const jwtSecret = process.env.JWT_SECRET;
		if (!jwtSecret) {
			return res
				.status(500)
				.json({ error: "Error de configuración del servidor" });
		}

		const token = jwt.sign({ sub: String(id) }, jwtSecret, {
			expiresIn: "15m",
		});

		res.status(200).json({ token });
	} catch (e) {
		const message = e instanceof Error ? e.message : "Error desconocido";
		res.status(500).json({ error: message });
	}
}
