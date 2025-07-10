// src/pages/api/lists/finalize.ts
import type { APIRoute } from 'astro'
import { db, eq, Item, List, User } from 'astro:db'

export const POST: APIRoute = async ({ request }) => {
	const { userId, name, items } = (await request.json()) as {
		userId: number
		name: string
		items: { name: string; price: number }[]
	}

	// 1) Leemos al usuario y comprobamos su límite
	const [user] = await db.select().from(User).where(eq(User.id, userId))
	if (!user) {
		return new Response('Usuario no encontrado', { status: 404 })
	}
	const existingCount = (await db.select().from(List).where(eq(List.userId, userId))).length
	if (existingCount >= user.listLimit) {
		return new Response('Has alcanzado el límite de listas', { status: 400 })
	}

	// 2) Calculamos el total
	const total = items.reduce((sum, i) => sum + i.price, 0)

	// 3) Ejecutamos todo en una transacción atómica
	const newList = await db.transaction(async (tx) => {
		// Insertamos la lista (ya pasamos total porque en el esquema no tiene `default`)
		const [list] = await tx.insert(List).values({ userId, name, total }).returning()

		// Insertamos los items
		if (items.length) {
			await tx.insert(Item).values(
				items.map((i) => ({
					listId: list.id,
					name: i.name,
					price: i.price,
				})),
			)
		}

		return list
	})

	return new Response(JSON.stringify(newList), {
		status: 201,
		headers: { 'Content-Type': 'application/json' },
	})
}
