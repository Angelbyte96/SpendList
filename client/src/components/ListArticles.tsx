import type { List } from '@/lib/localStorageService'
import { SquarePen, Trash2 } from 'lucide-react'

const ListArticles = ({ listArticles }: { listArticles: Omit<List, 'id' | 'createdAt'> }) => {
	console.log(listArticles)

	return (
		<>
			{listArticles.items.length <= 0 ? (
				<div>
					<p className="text-center">No hay articulos por mostrar.</p>
				</div>
			) : (
				<>
					{listArticles.items.map((item) => (
						<article className="mx-2 flex items-center gap-2 rounded-lg border border-gray-200 p-2" key={item.id}>
							<div className="grow">{item.name}</div>
							<div>${item.price}</div>
							<button className="rounded-md border bg-[#3d036622] p-1 text-white dark:border-[#393939]">
								<SquarePen size={16} />
							</button>
							<button className="rounded-md border bg-[#3d036622] p-1 text-white dark:border-[#393939]">
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

