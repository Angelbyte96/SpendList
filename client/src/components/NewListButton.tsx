import { Plus } from 'lucide-react'

interface NewListButtonProps {
	setView: (value: string) => void
}

const NewListButton = ({ setView }: NewListButtonProps) => {
	return (
		<section
			className="flex w-10/12 cursor-pointer flex-col gap-2 rounded-lg border p-2 md:w-3/12 dark:bg-[#3c10297d] dark:hover:bg-[#501637]"
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

