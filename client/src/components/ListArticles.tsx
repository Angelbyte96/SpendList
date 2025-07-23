import type { Item, List } from '@/lib/localStorageService'
import { calculateTotal } from '@/logic/calculateTotal'
import { formatPrice } from '@/utils/formatPrice'
import { SquarePen, Trash2 } from 'lucide-react'

const ListArticles = ({
	listArticles,
	setArticles,
	onEditItem,
}: {
	listArticles: Omit<List, 'id' | 'createdAt'>
	setArticles: React.Dispatch<React.SetStateAction<Omit<List, 'id' | 'createdAt'>>>
	onEditItem?: (item: Item) => void
}) => {
	const deleteItem = (id: string) => {
		setArticles((prevList) => {
			const updateItems = prevList.items.filter((item) => item.id !== id)
			return {
				...prevList,
				items: updateItems,
				total: calculateTotal(updateItems),
			}
		})
	}

	return (
		<>
			{listArticles.items.length <= 0 ? (
				<div>
					<p className="text-center">No hay articulos por mostrar.</p>
				</div>
			) : (
				<>
					{listArticles.items
						.sort((a, b) => b.id.localeCompare(a.id))

						.map((item) => (
							<article
								className="mx-2 flex items-center gap-2 rounded-lg border border-gray-200 p-2"
								key={item.id}
							>
								<div className="grow">{item.name}</div>
								<div>${formatPrice(item.price)}</div>
								<button
									className="cursor-pointer rounded-md border bg-[#3d036622] p-1 text-white dark:border-[#393939]"
									onClick={() => onEditItem?.(item)}
								>
									<SquarePen size={16} />
								</button>
								<button
									className="cursor-pointer rounded-md border bg-[#3d036622] p-1 text-white dark:border-[#393939]"
									onClick={() => deleteItem(item.id)}
								>
									<Trash2 size={16} className="text-red-500" />
								</button>
							</article>
						))}
				</>
			)}
		</>
	)
}

export { ListArticles }

