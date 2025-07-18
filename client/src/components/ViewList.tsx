import { deleteList, getLists, type List } from '@/lib/localStorageService'
import { formatPrice } from '@/utils/formatPrice'
import { format } from '@formkit/tempo'
import { Calendar, SquarePen, Trash2 } from 'lucide-react'
import { useEffect, useState } from 'react'

interface ViewListProps {
	onEditingListId: (listId: string) => void
}

const ViewList = ({ onEditingListId }: ViewListProps) => {
	const [lists, setLists] = useState<List[]>([])
	function sortedLists() {
		return getLists().sort(
			(a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
		)
	}
	useEffect(() => {
		sortedLists()

		setLists(sortedLists)
	}, [])

	return (
		<section className="flex min-h-full w-full flex-col p-1">
			{lists.length === 0 ? (
				<h1 className="my-auto text-center">No hay listas que mostrar.</h1>
			) : (
				<ul className="mx-auto flex w-11/12 flex-col gap-4">
					{lists.map((list) => {
						const numItems = list.items.length
						const formattedDate = format(list.createdAt, 'D MMMM YYYY, h:mm a', 'es')

						return (
							<li
								className="flex flex-col gap-2 rounded-lg border border-gray-200 p-4"
								key={list.id}
							>
								<div className="flex items-center justify-between">
									<h2 className="uppercase">{list.name}</h2>
									<div>
										<button
											className="cursor-pointer rounded-md border bg-[#3d036622] p-1 text-white dark:border-[#393939]"
											onClick={() => onEditingListId(list.id)}
										>
											<SquarePen size={16} />
										</button>
										<button
											className="cursor-pointer rounded-md border bg-[#3d036622] p-1 text-white dark:border-[#393939]"
											onClick={() => deleteList(list.id) && setLists(getLists() && sortedLists())}
										>
											<Trash2 size={16} className="text-red-500" />
										</button>
									</div>
								</div>
								<div className="flex items-center gap-4">
									<div className="flex gap-1 text-gray-400">
										<span className="flex items-center">
											<Calendar size={16} />
										</span>
										<span>{formattedDate}</span>
									</div>
									<span className="rounded-lg border p-[0.2rem] text-xs dark:border-[#232447] dark:bg-[#1f2937]">
										{numItems === 1 ? `${numItems} articulo` : `${numItems} articulos`}
									</span>
								</div>
								<div className="flex flex-col gap-2">
									{list.items.map((item) => (
										<div key={item.id} className="flex items-center justify-between">
											<span>{item.name}</span>
											<span>${formatPrice(item.price)}</span>
										</div>
									))}
								</div>
								<hr className="my-4 border-gray-300" />
								<div className="flex items-center justify-between">
									<span>Total:</span>
									<span>${formatPrice(list.total)}</span>
								</div>
							</li>
						)
					})}
				</ul>
			)}
		</section>
	)
}

export { ViewList }

