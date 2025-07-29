import { NewListButton } from '@/components/NewListButton'
import { ViewListButton } from '@/components/ViewListButton'
import { useAppNavigation } from '@/hooks/useAppNavigation'
import { ShoppingCart } from 'lucide-react'
import { NewListForm } from './NewListForm'
import { ViewList } from './ViewList'

const AppDemo = () => {
	const { view, editingListId, handleEditList, navigateToNewList, navigateToViewList } =
		useAppNavigation()

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
						<NewListButton onNavigate={navigateToNewList} />
						<ViewListButton onNavigate={navigateToViewList} />
					</>
				)}
			</section>
		</main>
	)
}

export { AppDemo }

