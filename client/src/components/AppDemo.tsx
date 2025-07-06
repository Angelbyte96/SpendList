import { NewListButton } from '@/components/NewListButton'
import { ViewListButton } from '@/components/ViewListButton'
import { ShoppingCart } from 'lucide-react'
import { useState } from 'react'

const AppDemo = () => {
	const [view, setView] = useState('home')

	return (
		<main className="flex flex-col items-center justify-center gap-4 dark:text-white">
			<section className="flex flex-col gap-2">
				{view === 'newList' && <p>Hola Mundo desde newList!!</p>}
				{view === 'viewList' && <p>Hola Mundo desde viewList!!</p>}
				{view === 'home' && (
					<>
						<article className="flex flex-col items-center">
							<ShoppingCart size={78} />
							<h1 className="text-5xl">Lista de compras</h1>
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

