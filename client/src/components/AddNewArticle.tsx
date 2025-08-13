import type { Item } from '@/lib/localStorageService'
import { Ban, Check, Plus } from 'lucide-react'
import type { Dispatch, SetStateAction } from 'react'

interface AddNewArticleProps {
	logicAddNewArticle: {
		cancelEdit: () => void
		addItem: () => void
		updateItem: () => void
	}
	currentItem: Item
	setCurrentItem: Dispatch<SetStateAction<Item>>
	editingItem: Item | null
}

const AddNewArticle = ({
	currentItem,
	setCurrentItem,
	editingItem,
	logicAddNewArticle,
}: AddNewArticleProps) => {
	const { addItem, cancelEdit, updateItem } = logicAddNewArticle

	return (
		<div className="flex flex-col gap-1 rounded-xl border p-2 md:gap-2 md:p-4">
			<label htmlFor="nameArticle" className="font-semibold">
				Agregar Articulo
			</label>
			<div className="flex w-full flex-col items-start gap-3 sm:flex-row sm:items-center">
				<input
					type="text"
					name="nameArticle"
					id="nameArticle"
					placeholder="Nombre del articulo"
					className="w-full rounded-lg border p-1.5 sm:flex-grow"
					value={currentItem.name}
					onChange={(e) => setCurrentItem({ ...currentItem, name: e.target.value })}
				/>
				<input
					type="number"
					name="price"
					placeholder="Precio"
					className="w-full rounded-xl border p-1.5 sm:w-24"
					value={currentItem.price || ''}
					onChange={(e) =>
						setCurrentItem({
							...currentItem,
							price: e.target.value ? parseFloat(e.target.value) : 0,
						})
					}
				/>
				<div className="flex w-full justify-end gap-2 md:w-auto md:flex-row">
					{editingItem ? (
						<>
							<button
								className="w-fit rounded-xl bg-green-700 px-3 py-1 text-white hover:bg-green-800"
								onClick={updateItem}
							>
								<Check />
							</button>
							<button
								className="w-fit rounded-xl bg-red-900 px-3 py-1 text-white hover:bg-red-950"
								onClick={cancelEdit}
							>
								<Ban />
							</button>
						</>
					) : (
						<button
							className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-800 px-3 py-1.5 text-white transition-colors hover:bg-blue-900 sm:w-auto"
							type="button"
							onClick={addItem}
						>
							<Plus size={18} />
							<span>Agregar</span>
						</button>
					)}
				</div>
			</div>
		</div>
	)
}

export { AddNewArticle }

