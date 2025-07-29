import { Plus } from 'lucide-react'

interface NewListButtonProps {
	onNavigate: () => void
}

const NewListButton = ({ onNavigate }: NewListButtonProps) => {
	return (
		<section
			className="flex w-10/12 transform cursor-pointer flex-col gap-2 rounded-2xl border border-purple-300/50 bg-purple-200 px-6 py-4 font-medium text-purple-900 transition-all duration-300 hover:scale-[1.02] hover:border-purple-400/70 hover:bg-purple-300 hover:text-purple-950 active:scale-[0.98] md:w-3/12 dark:border-[#4b4a4bb9] dark:bg-[#3c1029b2] dark:text-purple-100 dark:hover:border-[#3c1029c8] dark:hover:bg-purple-700/70 dark:hover:text-white"
			onClick={onNavigate}
		>
			<div className="flex items-center gap-2">
				<Plus size={22} strokeWidth={3} />
				<h2 className="text-2xl font-semibold">Nueva Lista</h2>
			</div>
			<div className="">
				<p className="text-lg">Crear nueva lista de compras</p>
			</div>
		</section>
	)
}

export { NewListButton }

