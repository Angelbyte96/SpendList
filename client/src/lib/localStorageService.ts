export interface Item {
	id: string
	name: string
	price: number
}

export interface List {
	id: string
	name: string
	items: Item[]
	total: number
	createdAt: string
}

export const getLists = (): List[] => {
	const lists = localStorage.getItem('lists')
	return lists ? JSON.parse(lists) : []
}

export const saveList = (list: Omit<List, 'id' | 'createdAt'>): List => {
	const lists = getLists()
	const newList: List = {
		...list,
		id: crypto.randomUUID(),
		createdAt: new Date().toISOString(),
	}

	localStorage.setItem('lists', JSON.stringify([...lists, newList]))
	return newList
}

export const updateList = (id: string, updateList: Partial<List>): List | null => {
	const lists = getLists()
	const index = lists.findIndex((list) => list.id === id)

	if (index === -1) return null

	const updated = { ...lists[index], ...updateList }
	lists[index] = updated

	localStorage.setItem('lists', JSON.stringify(lists))
	return updated
}

export const deleteList = (id: string): boolean => {
	const lists = getLists()
	const filteredLists = lists.filter((list) => list.id !== id)

	if (filteredLists.length === lists.length) return false

	localStorage.setItem('lists', JSON.stringify(filteredLists))
	return true
}

export const getList = (id: string): List | null => {
	const lists = getLists()
	return lists.find((list) => list.id === id) || null
}
