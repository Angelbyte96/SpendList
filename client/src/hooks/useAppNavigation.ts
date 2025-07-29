import { useState } from 'react'

const useAppNavigation = () => {
	type AppView = 'home' | 'newList' | 'viewList' | 'editList'

	const [view, setView] = useState<AppView>('home')
	const [editingListId, setEditingListId] = useState<string | null>(null)

	const navigateToHome = () => setView('home')
	const navigateToNewList = () => setView('newList')
	const navigateToViewList = () => setView('viewList')

	const handleEditList = (listId: string) => {
		setEditingListId(listId)
		setView('editList')
	}

	return {
		view,
		editingListId,
		navigateToHome,
		navigateToNewList,
		navigateToViewList,
		handleEditList,
	}
}

export { useAppNavigation }

