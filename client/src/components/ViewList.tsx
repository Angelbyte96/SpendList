import { deleteList, getLists, type List } from '@/lib/localStorageService'
import { formatPrice } from '@/utils/formatPrice'
import { format } from '@formkit/tempo'
import { ArrowLeft, Calendar, ChevronDown, ChevronUp, SquarePen, Trash2 } from 'lucide-react'
import { useEffect, useState } from 'react'

interface ViewListProps {
	onEditingListId: (listId: string) => void
}

const ViewList = ({ onEditingListId }: ViewListProps) => {
	const [lists, setLists] = useState<List[]>([])
	const [expandedLists, setExpandedLists] = useState<Set<string>>(new Set())

	function sortedLists() {
		return getLists().sort(
			(a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
		)
	}
	useEffect(() => {
		sortedLists()

		setLists(sortedLists)
	}, [])

	// Función para alternar la expansión de una lista
	const toggleExpanded = (listId: string) => {
		setExpandedLists((prev) => {
			const newSet = new Set(prev)
			if (newSet.has(listId)) {
				newSet.delete(listId)
			} else {
				newSet.add(listId)
			}
			return newSet
		})
	}

	return (
		<section className="flex min-h-full w-full flex-col p-1">
			{lists.length === 0 ? (
				<div className="flex min-h-full flex-col items-center justify-center gap-4">
					<h1 className="text-xl md:text-3xl">No hay listas que mostrar.</h1>
					<a
						href="/demo"
						className="inline-flex text-base md:text-lg transform items-center gap-2 rounded-xl border border-purple-200 bg-purple-100 px-6 py-3 font-medium text-purple-700 transition-all duration-300 hover:scale-105 hover:border-purple-300 hover:bg-purple-200 hover:text-purple-800 active:scale-95 dark:border-purple-700 dark:bg-purple-900/30 dark:text-purple-300 dark:hover:border-purple-600 dark:hover:bg-purple-800/40 dark:hover:text-purple-200"
					>
						<span>
							<ArrowLeft />
						</span>
						<span>Volver</span>
					</a>
				</div>
			) : (
				<ul className="mx-auto flex w-11/12 flex-col gap-4">
					{lists
						.sort((a, b) => b.id.localeCompare(a.id))
						.map((list) => {
							const numItems = list.items.length
							const formattedDate = format(list.createdAt, 'D MMMM YYYY, h:mm a', 'es')
							const isExpanded = expandedLists.has(list.id)
							const shouldShowExpand = numItems > 3
							const sortedItems = list.items.sort((a, b) => b.id.localeCompare(a.id))
							const itemsToShow =
								shouldShowExpand && !isExpanded ? list.items.slice(0, 3) : sortedItems

							return (
								<li
									className="flex flex-col gap-2 rounded-lg border border-gray-300 p-4"
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
										{itemsToShow.map((item) => (
											<div key={item.id} className="flex items-center justify-between">
												<span>{item.name}</span>
												<span>${formatPrice(item.price)}</span>
											</div>
										))}
										{shouldShowExpand && (
											<button
												onClick={() => toggleExpanded(list.id)}
												className="flex items-center justify-center gap-2 rounded-md border border-gray-300 p-2 text-sm text-gray-600 transition-colors hover:bg-gray-50 dark:border-gray-600 dark:text-gray-400 dark:hover:bg-gray-800"
											>
												{isExpanded ? (
													<>
														<span>Ver menos</span>
														<ChevronUp size={16} />
													</>
												) : (
													<>
														<span>Ver más</span>
														<ChevronDown size={16} />
													</>
												)}
											</button>
										)}
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

