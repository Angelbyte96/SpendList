import type { ItemResponseDto } from '@/dtos/item.dto'
import type { ListResponseDto, ListSummaryDto } from '@/dtos/list.dto'
import type { Item } from '@/models/item.model'
import type { List } from '@/models/list.model'

export class ListMapper {
	static toResponseDto(list: List): ListResponseDto {
		return {
			id: list.id,
			name: list.name,
			items: list.items.map((item) => this.itemToResponseDto(item)),
			total: list.total,
			totalItems: list.items.length,
			totalPieces: list.items.reduce((total, item) => total + item.quantity, 0),
			createdAt: list.createdAt,
		}
	}

	static toSummaryDto(list: List): ListSummaryDto {
		return {
			id: list.id,
			name: list.name,
			totalItems: list.items.length,
			totalPieces: list.items.reduce((total, item) => total + item.quantity, 0),
			total: list.total,
			createdAt: list.createdAt,
		}
	}

	private static itemToResponseDto(item: Item): ItemResponseDto {
		return {
			id: item.id,
			name: item.name,
			price: item.price,
			quantity: item.quantity,
			totalPrice: item.price * item.quantity,
		}
	}
}
