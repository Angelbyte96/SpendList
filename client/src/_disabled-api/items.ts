import type { APIRoute } from 'astro'
import { db, eq, Item } from 'astro:db'

// Método GET listar los items de una lista
export const GET: APIRoute = async ({ url }) => {
	const listId = Number(url.searchParams.get('listId'))
	const items = await db.select().from(Item).where(eq(Item.listId, listId))
	return new Response(JSON.stringify(items), {
		status: 200,
		headers: { 'Content-Type': 'application/json' },
	})
}

// Método POST para crear un nuevo item
export const POST: APIRoute = async ({ request }) => {
	const { listId, name, price } = await request.json()
	const [inserted] = await db.insert(Item).values({ listId, name, price }).returning()
	return new Response(JSON.stringify(inserted), { status: 201 })
}

// Método PATCH para actualizar un item existente
export const PATCH: APIRoute = async ({ request }) => {
	const { id, name, price } = await request.json()
	await db.update(Item).set({ name, price }).where(eq(Item.id, id))
	return new Response(null, { status: 204 })
}

// Método DELETE para eliminar un item
export const DELETE: APIRoute = async ({ request }) => {
	const { id } = await request.json()
	await db.delete(Item).where(eq(Item.id, id))
	return new Response(null, { status: 204 })
}
