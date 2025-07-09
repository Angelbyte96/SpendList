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