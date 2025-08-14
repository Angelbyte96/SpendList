import type { Item, List } from '@/lib/localStorageService'
import { calculateTotal } from '@/logic/calculateTotal'
import { formatPrice } from '@/utils/formatPrice'
import { SquarePen, Trash2 } from 'lucide-react'
import type { Dispatch, SetStateAction } from 'react'

interface ListArticlesProps {
	listArticles: Omit<List, 'id' | 'createdAt'>
	setArticles: Dispatch<SetStateAction<Omit<List, 'id' | 'createdAt'>>>
	onEditItem?: (item: Item) => void
}

const ListArticles = ({ listArticles, setArticles, onEditItem }: ListArticlesProps) => {
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
								className="flex items-center gap-2 rounded-lg border border-gray-400 p-2 dark:border-gray-200"
								key={item.id}
							>
								<div className="grow">{item.name}</div>
								<div>${formatPrice(item.price)}</div>
								<button
									className="cursor-pointer rounded-md border bg-[#3d036622] p-1 text-white dark:border-[#393939]"
									onClick={() => onEditItem?.(item)}
								>
									<SquarePen size={16} className="text-black dark:text-white" />
								</button>
								<button
									className="cursor-pointer rounded-md border bg-[#3d036622] p-1 text-white dark:border-[#393939]"
									onClick={() => deleteItem(item.id)}
								>
									<Trash2 size={16} className="text-red-600 dark:text-red-500" />
								</button>
							</article>
						))}
				</>
			)}
		</>
	)
}

export { ListArticles }

