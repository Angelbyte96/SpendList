import { ListArticles } from '@/components/ListArticles'
import type { Item, List } from '@/lib/localStorageService'
import { getList, saveList, updateList } from '@/lib/localStorageService'
import { calculateTotal } from '@/logic/calculateTotal'
import { formatPrice } from '@/utils/formatPrice'
import { ShowToast } from '@/utils/ShowToast'
import { Ban, Check, Plus } from 'lucide-react'
import { useEffect, useState } from 'react'
import { ButtonBack } from './ButtonBack'

interface NewListFormProps {
	editingListId?: string | null
}

const NewListForm = ({ editingListId }: NewListFormProps) => {
	const [loading, setLoading] = useState<boolean>(true)

	useEffect(() => {
		setLoading(true)

		try {
			if (editingListId) {
				const existingList = getList(editingListId)
				if (existingList) {
					setList({
						name: existingList.name,
						items: existingList.items,
						total: existingList.total,
					})
				}
			}
		} catch (error) {
			console.error('Error al cargar la lista:', error)
		} finally {
			setLoading(false)
		}
	}, [editingListId])

	const [list, setList] = useState<Omit<List, 'id' | 'createdAt'>>({
		name: '',
		items: [],
		total: 0,
	})

	const [currentItem, setCurrentItem] = useState<Item>({ id: '', name: '', price: 0 })
	const [editingItem, setEditingItem] = useState<Item | null>(null)

	const handleEditItem = (item: Item) => {
		setEditingItem(item)
		setCurrentItem(item)
	}

	const updateItem = () => {
		if (!editingItem) return

		// Validaciones
		if (!currentItem.name || currentItem.price <= 0) {
			ShowToast('Por favor, ingresa un nombre y un precio válido para el artículo.')
			return
		}

		setList((prevList) => ({
			...prevList,
			items: prevList.items.map((item) =>
				item.id === editingItem.id
					? { ...item, name: currentItem.name, price: currentItem.price }
					: item,
			),
			total: calculateTotal(
				prevList.items.map((item) =>
					item.id === editingItem.id
						? { ...item, name: currentItem.name, price: currentItem.price }
						: item,
				),
			),
		}))

		ShowToast(`"${currentItem.name}" actualizado exitosamente.`)

		// Limpiar el estado de edición
		setEditingItem(null)
		setCurrentItem({ id: '', name: '', price: 0 })
	}

	const cancelEdit = () => {
		setEditingItem(null)
		setCurrentItem({ id: '', name: '', price: 0 })
	}

	// Función para crear una nueva lista
	const createList = () => {
		// Validar que la lista tenga un nombre y al menos un artículo
		if (!list.name && list.items.length === 0) {
			ShowToast('Por favor, ingresa un nombre para la lista y agrega al menos un artículo.')
			return
		} else if (!list.name) {
			ShowToast('Por favor, ingresa un nombre para la lista.')
			return
		} else if (list.items.length === 0) {
			ShowToast('Por favor, agrega al menos un artículo a la lista.')
			return
		}

		const newList: Omit<List, 'id' | 'createdAt'> = {
			name: list.name,
			items: list.items,
			total: list.total,
		}

		// Guardar la lista en el almacenamiento local
		// if (saveList(newList) === null) return

		if (editingListId) {
			updateList(editingListId, newList)
			ShowToast('Lista editada exitosamente.')
		} else {
			saveList(newList)
			ShowToast('Lista creada exitosamente.')
		}

		// Limpiar el formulario
		setList({ name: '', items: [], total: 0 })

		// Redireccionar a demo
		setTimeout(() => {
			window.location.href = '/demo'
		}, 2000)
	}

	// Función para agregar un artículo a la lista
	const addItem = () => {
		// Validar que el nombre y el precio del artículo sean válidos
		if (!currentItem.name || currentItem.price <= 0) {
			ShowToast('Por favor, ingresa un nombre y un precio válido para el artículo.')
			return
		}

		// Crear un nuevo artículo con un ID único
		const newItem: Item = {
			id: Date.now().toString(), // ✅ Timestamp numérico como string
			name: currentItem.name,
			price: currentItem.price,
		}

		// ✅ Agregar al principio
		setList((prevList) => ({
			...prevList,
			items: [newItem, ...prevList.items],
			total: calculateTotal([newItem, ...prevList.items]),
		}))

		// Limpiar el campo del artículo actual
		setCurrentItem({ id: '', name: '', price: 0 })

		// Reiniciar el focus en el campo de nombre del artículo
		const nameInput: HTMLInputElement = document.getElementById('nameArticle') as HTMLInputElement
		if (nameInput) {
			nameInput.focus()
		}
	}

	return (
		<section className="grid min-h-full w-full grid-rows-[auto_1fr_auto] md:gap-8 dark:text-white">
			<header className="mx-4 my-2 flex items-center justify-start gap-4">
				<ButtonBack url="/demo" />
				{editingListId ? (
					<h2 className="text-xl font-bold md:text-2xl">Editar Lista</h2>
				) : (
					<h2 className="text-xl font-bold md:text-2xl">Nueva Lista</h2>
				)}
			</header>
			<main className="flex flex-col gap-4 overflow-y-auto p-4">
				<form action="" className="flex flex-col gap-4">
					<div className="flex flex-col gap-1 rounded-xl border p-2 md:gap-2 md:p-4">
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
				</form>
				<div className="mt-1 flex flex-col gap-2">
					{editingListId ? (
						<>
							{loading ? (
								<div className="flex min-h-full flex-col items-center justify-center gap-4">
									<div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600"></div>
									<h1 className="text-xl md:text-3xl">Cargando items...</h1>
								</div>
							) : (
								<ListArticles
									listArticles={list}
									setArticles={setList}
									onEditItem={handleEditItem}
								/>
							)}
						</>
					) : (
						<ListArticles listArticles={list} setArticles={setList} onEditItem={handleEditItem} />
					)}
				</div>
			</main>
			<div className="flex items-center justify-between bg-[#151c301d] px-4 py-2 dark:bg-[#0f172b3d]">
				<div>
					<p>
						Total: <span>${formatPrice(list.total)}</span>
					</p>
				</div>
				<button
					className="cursor-pointer rounded-lg bg-green-800 px-4 py-2 text-white transition-colors hover:bg-green-900"
					onClick={createList}
				>
					Finalizar Lista
				</button>
			</div>
		</section>
	)
}

export { NewListForm }

