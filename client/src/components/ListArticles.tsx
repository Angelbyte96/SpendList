import { SquarePen, Trash2 } from 'lucide-react'
import { useState } from 'react'

const ListArticles = () => {
	const [articles, setArticles] = useState([])

	return (
		<>
			{articles.length > 0 ? (
				<div>
					<p className="text-center">No hay articulos por mostrar.</p>
				</div>
			) : (
				<>
					{/* <p className="text-center">No hay articulos por mostrar.</p> */}
					<article className="mx-2 flex items-center gap-2 rounded-lg border border-gray-200 p-2">
						<div className="grow">Pan</div>
						<div>$35.00</div>
						<button className="rounded-md border bg-[#3d036622] p-1 text-white dark:border-[#393939]">
							<SquarePen size={16} />
						</button>
						<button className="rounded-md border bg-[#3d036622] p-1 text-white dark:border-[#393939]">
							<Trash2 size={16} className="text-red-500" />
						</button>
					</article>
				</>
			)}
		</>
	)
}

export { ListArticles }

