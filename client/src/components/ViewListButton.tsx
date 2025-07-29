import { List } from 'lucide-react'

interface ViewListButtonProps {
	onNavigate: () => void
}

const ViewListButton = ({ onNavigate }: ViewListButtonProps) => {
	return (
		<section
			className="flex w-10/12 transform cursor-pointer flex-col gap-2 rounded-lg border border-purple-300/50 bg-purple-100 px-6 py-4 font-medium text-purple-800 transition-all duration-300 hover:scale-[1.02] hover:border-purple-300/70 hover:bg-purple-200 hover:text-purple-900 active:scale-[0.98] md:w-3/12 dark:border-purple-700/50 dark:bg-purple-900/40 dark:text-purple-200 dark:hover:border-purple-600/70 dark:hover:bg-purple-800/50 dark:hover:text-purple-100"
			onClick={onNavigate}
		>
			<div className="flex items-center gap-2">
				<List size={22} strokeWidth={3} />
				<h2 className="text-2xl font-semibold">Ver Listas</h2>
			</div>
			<div className="">
				<p className="text-lg">Ver y gestionar listas guardadas</p>
			</div>
		</section>
	)
}

export { ViewListButton }

