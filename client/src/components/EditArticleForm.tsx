import type { Item } from '@/lib/localStorageService'
import { Save } from 'lucide-react'
import type { Dispatch, SetStateAction } from 'react'

interface EditArticleFormProps {
	currentItem: Item
	setCurrentItem: Dispatch<SetStateAction<Item>>
	onSave: () => void
}

const EditArticleForm = ({ currentItem, setCurrentItem, onSave }: EditArticleFormProps) => {
	return (
		<div className="flex flex-col gap-1 rounded-xl p-2 md:gap-2 md:p-4">
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
					<button
						className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-green-700 px-3 py-1.5 text-white transition-colors hover:bg-green-800 sm:w-auto"
						type="button"
						onClick={onSave}
					>
						<Save size={18} />
						<span>Guardar</span>
					</button>
				</div>
			</div>
		</div>
	)
}

export { EditArticleForm }

