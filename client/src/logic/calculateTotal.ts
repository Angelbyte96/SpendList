import type { Item } from '@/lib/localStorageService'

const calculateTotal = (items: Item[]) =>
	items.reduce((total, item) => total + item.price * item.quantity, 0)

export { calculateTotal }

