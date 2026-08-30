import bcrypt from "bcrypt";
import type { Request, Response } from "express";
import { z } from "zod";
import { tursoClient } from "../db/client";

const registerSchema = z.object({
	email: z.email(),
	password: z.string().min(8),
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
