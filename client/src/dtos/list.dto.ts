import type { CreateItemDto, ItemResponseDto, UpdateItemDto } from '@/dtos/item.dto'

export interface CreateListDto {
	name: string
	items: CreateItemDto[]
}

export interface UpdateListDto {
	id: string
	name?: string
	items?: UpdateItemDto[]
}

export interface ListResponseDto {
	readonly id: string
	name: string
	items: ItemResponseDto[]
	total: number
	totalItems: number
	totalPieces: number
	readonly createdAt: string
	updatedAt?: string
}

export interface ListSummaryDto {
	readonly id: string
	name: string
	totalItems: number
	totalPieces: number
	total: number
	readonly createdAt: string
}
