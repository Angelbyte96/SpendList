import { ListArticles } from '@/components/ListArticles'
import type { Item, List } from '@/lib/localStorageService'
import { MoveLeft, Plus } from 'lucide-react'
import { useState } from 'react'

const NewListForm = () => {
	const [list, setList] = useState<Omit<List, 'id' | 'createdAt'>>({
		name: '',
		items: [],
		total: 0,
	})

	const [currentItem, setCurrentItem] = useState<Item>({ id: '', name: '', price: 0 })

	// Función para crear una nueva lista
	const createList = () => {
		const newList: Omit<List, 'id' | 'createdAt'> = {
			name: list.name,
			items: list.items,
			total: list.total,
		}
	}

	// Función para agregar un artículo a la lista
	const addItem = () => {
		// Validar que el nombre y el precio del artículo sean válidos
		if (!currentItem.name || currentItem.price <= 0) {
			alert('Por favor, ingresa un nombre y un precio válido para el artículo.')
			return
		}

		// Crear un nuevo artículo con un ID único
		const newItem: Item = {
			id: crypto.randomUUID(),
			name: currentItem.name,
			price: currentItem.price,
		}

		// Agregar el nuevo artículo a la lista
		setList((prevList) => ({
			...prevList,
			items: [...prevList.items, newItem],
			total: prevList.total + newItem.price,
		}))

		// Limpiar el campo del artículo actual
		setCurrentItem({ id: '', name: '', price: 0 })
	}

	return (
		<section className="grid min-h-full w-full grid-rows-[auto_1fr_auto] border md:gap-8">
			<header className="m-2 flex items-center justify-start gap-4">
				<a
					href="/demo"
					className="flex items-center gap-2 rounded-md border p-1 transition-colors hover:bg-gray-200 md:p-2 dark:hover:bg-gray-700"
				>
					<MoveLeft />
					<span>Volver</span>
				</a>
				<h2 className="text-xl font-bold md:text-2xl">Nueva Lista</h2>
			</header>
			<main className="flex flex-col gap-4">
				<form action="">
					<div className="m-2 flex flex-col gap-1 rounded-xl border p-2 md:gap-2 md:p-4">
						<label htmlFor="nameList" className="font-semibold">
							{list.name ? 'Editar Lista' : 'Nombre de la Lista'}
						</label>
						<input
							type="text"
							name="nameList"
							id="nameList"
							placeholder="Ej. Compras del fin de semana"
							className="rounded-lg border p-1.5"
							value={list.name}
							onChange={(e) => setList({ ...list, name: e.target.value })}
						/>
					</div>
					<div className="m-2 flex flex-col gap-1 rounded-xl border p-2 md:gap-2 md:p-4">
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
							<button
								className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-800 px-3 py-1.5 text-white transition-colors hover:bg-blue-900 sm:w-auto"
								type="button"
								onClick={addItem}
							>
								<Plus size={18} />
								<span>Agregar</span>
							</button>
						</div>
					</div>
				</form>
				<div>
					<ListArticles listArticles={list} />
				</div>
			</main>
			<div className="flex items-center justify-between bg-[#0f172b3d] px-4 py-2">
				<div>
					<p>
						Total: <span>${list.total}</span>
					</p>
				</div>
				<button className="rounded-lg bg-green-800 px-4 py-2 text-white transition-colors hover:bg-green-900">
					Finalizar Lista
				</button>
			</div>
		</section>
	)
}

export { NewListForm }

