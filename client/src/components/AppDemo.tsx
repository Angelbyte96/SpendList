import { NewListButton } from '@/components/NewListButton'
import { ViewListButton } from '@/components/ViewListButton'
import { ShoppingCart } from 'lucide-react'
import { useState } from 'react'
import { NewListForm } from './NewListForm'
import { ViewList } from './ViewList'

type AppView = 'home' | 'newList' | 'viewList' | 'editList'

const AppDemo = () => {
	const [view, setView] = useState<AppView>('home')
	const [editingListId, setEditingListId] = useState<string | null>(null)

	// Función para manejar el cambio de vista
	const handleSetView = (newView: string) => {
		setView(newView as AppView)
	}

	const handleEditList = (listId: string) => {
		setEditingListId(listId)
		setView('editList')
	}

	return (
		<main className="flex flex-col items-center justify-center gap-4 dark:text-white">
			<section className="flex min-h-full w-full flex-col items-center justify-center gap-2">
				{view === 'newList' && <NewListForm />}
				{view === 'editList' && <NewListForm editingListId={editingListId} />}
				{view === 'viewList' && <ViewList onEditingListId={handleEditList} />}
				{view === 'home' && (
					<>
						<article className="flex flex-col items-center justify-center">
							<ShoppingCart size={78} />
							<h1 className="text-center text-5xl">Lista de compras</h1>
							<p className="text-2xl">Gestiona tu lista de compras</p>
						</article>
						<NewListButton setView={handleSetView} />
						<ViewListButton setView={handleSetView} />
					</>
				)}
			</section>
		</main>
	)
}

export { AppDemo }

