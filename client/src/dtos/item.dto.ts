export interface CreateItemDto {
	name: string
	price: number
	quantity: number
}

export interface UpdateItemDto {
	id: string
	name?: string
	price?: number
	quantity?: number
}

export interface ItemResponseDto {
	readonly id: string
	name: string
	price: number
	quantity: number
	totalPrice: number
}