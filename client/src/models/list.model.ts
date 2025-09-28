import type { Item } from '@/models/item.model'

export interface List {
	id: string
	name: string
	items: Item[]
	total: number
	createdAt: string
}
