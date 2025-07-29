const useAppNavigation = () => {
	const navigateToHome = () => (window.location.href = `/demo`)
	const navigateToNewList = () => (window.location.href = `/demo/nueva-lista`)
	const navigateToViewList = () => (window.location.href = `/demo/mis-listas`)

	return {
		navigateToHome,
		navigateToNewList,
		navigateToViewList,
	}
}

export { useAppNavigation }

