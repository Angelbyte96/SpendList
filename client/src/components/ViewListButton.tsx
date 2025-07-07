import { List } from 'lucide-react'

interface ViewListButtonProps {
	setView: (value: string) => void
}

const ViewListButton = ({ setView }: ViewListButtonProps) => {
	return (
		<section
			className="flex w-10/12 cursor-pointer flex-col gap-2 rounded-lg border p-3 md:w-3/12 dark:bg-[#3c10297d] dark:hover:bg-[#501637]"
			onClick={() => setView('viewList')}
		>
			<div className="flex items-center gap-2">
				<List size={22} strokeWidth={3} />
				<h2 className="text-3xl font-semibold">Ver Listas</h2>
			</div>
			<div className="">
				<p className="text-lg">Ver y gestionar listas guardadas</p>
			</div>
		</section>
	)
}

export { ViewListButton }

