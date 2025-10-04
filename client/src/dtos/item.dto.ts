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
	id: string
	name: string
	price: number
	quantity: number
	totalPrice: number
}