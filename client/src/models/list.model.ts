import type { Item } from '@/models/item.model'

export interface List {
	readonly id: string
	name: string
	items: Item[]
	total: number
	readonly createdAt: string
}
