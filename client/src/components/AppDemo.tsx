import { NewListButton } from '@/components/NewListButton'
import { ViewListButton } from '@/components/ViewListButton'
import { ShoppingCart } from 'lucide-react'
import { useState } from 'react'
import { NewListForm } from './NewListForm'

const AppDemo = () => {
	const [view, setView] = useState('home')

	return (
		<main className="flex flex-col items-center justify-center gap-4 dark:text-white">
			<section className="flex min-h-full w-full flex-col items-center justify-center gap-2">
				{view === 'newList' && <NewListForm />}
				{view === 'viewList' && <p>Hola Mundo desde viewList!!</p>}
				{view === 'home' && (
					<>
						<article className="flex flex-col items-center justify-center">
							<ShoppingCart size={78} />
							<h1 className="text-center text-5xl">Lista de compras</h1>
							<p className="text-2xl">Gestiona tu lista de compras</p>
						</article>
						<NewListButton setView={setView} />
						<ViewListButton setView={setView} />
					</>
				)}
			</section>
		</main>
	)
}

export { AppDemo }

