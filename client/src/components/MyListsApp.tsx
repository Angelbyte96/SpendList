import { ViewList } from '@/components/ViewList'

const MyListsApp = () => {
	const navigateToEdit = (listId: string) => {
        window.location.href = `/demo/editar/${listId}`
    }

	return <ViewList onEditingListId={navigateToEdit} />
}

export { MyListsApp }

