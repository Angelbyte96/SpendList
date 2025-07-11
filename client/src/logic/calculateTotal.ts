import type { Item } from '@/lib/localStorageService'

const calculateTotal = (items: Item[]) => items.reduce((total, item) => total + item.price, 0)

export { calculateTotal }

