import { SquarePen, Trash2 } from 'lucide-react'
import { useState } from 'react'

const ListArticles = () => {
	const [articles, setArticles] = useState([])

	return (
		<>
			{articles.length > 0 ? (
				<div>
					<p></p>
				</div>
			) : (
				<>
					{/* <p className="text-center">No hay articulos por mostrar.</p> */}
					<article className="mx-2 flex items-center gap-2 border border-gray-200 p-2 rounded-lg">
						<div className="grow">Pan</div>
						<div>$35.00</div>
						<button className='p-1 bg-[#3d036622] border dark:border-[#393939] rounded-md text-white'>
							<SquarePen size={16} />
						</button>
						<button className='p-1 bg-[#3d036622] border dark:border-[#393939] rounded-md text-white'>
							<Trash2 size={16} className="text-red-500" />
						</button>
					</article>
				</>
			)}
		</>
	)
}

export { ListArticles }

