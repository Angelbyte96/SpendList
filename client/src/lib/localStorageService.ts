import type { CreateListDto, ListResponseDto, ListSummaryDto, UpdateListDto } from '@/dtos/list.dto'
import { ListMapper } from '@/mappers/list.mapper'
import type { List } from '@/models/list.model'

export class ListService {
	static getAll(): ListResponseDto[] {
		const lists = this.getAllRaw()
		return lists.map((list) => ListMapper.toResponseDto(list))
	}

	static getAllSummary(): ListSummaryDto[] {
		const lists = this.getAllRaw()
		return lists.map((list) => ListMapper.toSummaryDto(list))
	}

	static getById(id: string): ListResponseDto | null {
		const list = this.getByIdRaw(id)
		return list ? ListMapper.toResponseDto(list) : null
	}

	static create(dto: CreateListDto): ListResponseDto {
		const lists = this.getAllRaw()

		const newList: List = {
			id: crypto.randomUUID(),
			name: dto.name,
			items: dto.items.map((item) => ({
				id: crypto.randomUUID(),
				name: item.name,
				price: item.price,
				quantity: item.quantity,
			})),
			total: dto.items.reduce((total, item) => total + item.price * item.quantity, 0),
			createdAt: new Date().toISOString(),
		}

		localStorage.setItem('lists', JSON.stringify([...lists, newList]))
		return ListMapper.toResponseDto(newList)
	}

	static update(dto: UpdateListDto): ListResponseDto | null {
		const lists = this.getAllRaw()
		const index = lists.findIndex((list) => list.id === dto.id)

		if (index === -1) return null

		const existingList = lists[index]

		const updatedList: List = {
			...existingList,
			name: dto.name ?? existingList.name,
			items: dto.items
				? dto.items.map((item) => ({
						id: item.id,
						name: item.name ?? '',
						price: item.price ?? 0,
						quantity: item.quantity ?? 1,
					}))
				: existingList.items,
			total: dto.items
				? dto.items.reduce((total, item) => total + (item.price ?? 0) * (item.quantity ?? 1), 0)
				: existingList.total,
		}

		lists[index] = updatedList
		localStorage.setItem('lists', JSON.stringify(lists))
		return ListMapper.toResponseDto(updatedList)
	}

	static delete(id: string): boolean {
		const lists = this.getAllRaw()
		const filteredLists = lists.filter((list) => list.id !== id)

		if (filteredLists.length === lists.length) return false

		localStorage.setItem('lists', JSON.stringify(filteredLists))
		return true
	}

	// Métodos privados de acceso a localStorage
	private static getAllRaw(): List[] {
		const lists = localStorage.getItem('lists')
		return lists ? JSON.parse(lists) : []
	}

	private static getByIdRaw(id: string): List | null {
		const lists = this.getAllRaw()
		return lists.find((list) => list.id === id) || null
	}
}
