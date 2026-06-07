import type { APIRoute } from 'astro'
import { db, eq, Item, List } from 'astro:db'

// Método GET para obtener todas las listas
export const GET: APIRoute = async () => {
	const lists = await db.select().from(List)
	return new Response(JSON.stringify(lists), {
		status: 200,
		headers: { 'Content-Type': 'application/json' },
	})
}

// Método POST para crear una nueva lista
export const POST: APIRoute = async ({ request }) => {
	const { name } = await request.json()
	const [inserted] = await db.insert(List).values({ name }).returning()
	return new Response(JSON.stringify(inserted), { status: 201 })
}

// Método Patch para actualizar una lista existente
export const PATCH: APIRoute = async ({ request }) => {
	const { id, name } = await request.json()
	await db.update(List).set({ name }).where(eq(List.id, id))
	return new Response(null, { status: 204 })
}

// Método DELETE para eliminar una lista
export const DELETE: APIRoute = async ({ request }) => {
	const { id } = await request.json()
	// Borramos los items de la lista
	await db.delete(Item).where(eq(Item.listId, id))
	// Borramos la lista
	await db.delete(List).where(eq(List.id, id))
	return new Response(null, { status: 204 })
}
