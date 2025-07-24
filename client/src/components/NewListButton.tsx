import { Plus } from 'lucide-react'

interface NewListButtonProps {
	setView: (value: string) => void
}

const NewListButton = ({ setView }: NewListButtonProps) => {
	return (
		<section
			className="flex w-10/12 transform cursor-pointer flex-col gap-2 rounded-lg bg-gradient-to-r from-purple-700 to-pink-700 px-3 py-2 font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:from-purple-500 hover:to-pink-500 hover:shadow-xl active:scale-95 md:w-3/12 dark:from-purple-800 dark:to-purple-900 dark:hover:from-purple-600 dark:hover:to-purple-700"
			onClick={() => setView('newList')}
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

