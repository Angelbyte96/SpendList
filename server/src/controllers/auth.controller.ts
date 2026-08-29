import type { Request, Response } from "express";
import { z } from "zod";

export function registerController(req: Request, res: Response) {
	const { email, password } = req.body;
	const newUser = {};
}
