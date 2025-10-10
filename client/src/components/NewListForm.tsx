import { AddArticleForm } from '@/components/AddArticleForm'
import { ModalRadix } from '@/components/DialogTemplate'
import { ListArticles } from '@/components/ListArticles'
import type { CreateListDto, UpdateListDto } from '@/dtos/list.dto'
import { ListService } from '@/lib/localStorageService'
import { calculateTotal } from '@/logic/calculateTotal'
import type { Item } from '@/models/item.model'
import type { List } from '@/models/list.model'
import { formatPrice } from '@/utils/formatPrice'
import { ShowToast } from '@/utils/ShowToast'
import { navigate } from 'astro/virtual-modules/transitions-router.js'
import { Edit3, Plus } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { ButtonBack } from './ButtonBack'

interface NewListFormProps {
	editingListId?: string | null
}

const NewListForm = ({ editingListId }: NewListFormProps) => {
	const [loading, setLoading] = useState<boolean>(true)
	const [isNameConfirmed, setIsNameConfirmed] = useState<boolean>(true)
	const inputNameList = useRef<HTMLInputElement>(null)

	useEffect(() => {
		if (!isNameConfirmed && inputNameList.current) inputNameList.current.focus()
	}, [isNameConfirmed])

	useEffect(() => {
		setLoading(true)

		try {
			if (editingListId) {
				const listDto = ListService.getById(editingListId)

				if (listDto) {
					setList({
						name: listDto.name,
						items: listDto.items.map((item) => ({
							id: item.id,
							name: item.name,
							price: item.price,
							quantity: item.quantity,
						})),
						total: listDto.total,
					})
					setIsNameConfirmed(true)
				}
			}
		} catch (error) {
			console.error('Error al cargar la lista:', error)
		} finally {
			setLoading(false)
		}
	}, [editingListId])

	const [list, setList] = useState<Omit<List, 'id' | 'createdAt'>>({
		name: 'Coloca el nombre de tu lista',
		items: [],
		total: 0,
	})

	// Estados para modal "Nuevo"
	const [currentItem, setCurrentItem] = useState<Item>({
		id: crypto.randomUUID(),
		name: '',
		price: 0,
		quantity: 1,
	})
	const [isAddModalOpen, setIsAddModalOpen] = useState(false)

	// Estados para modal "Editar"
	const [editCurrentItem, setEditCurrentItem] = useState<Item>({
		id: '',
		name: '',
		price: 0,
		quantity: 1,
	})
	const [editingItem, setEditingItem] = useState<Item | null>(null)

	const updateItem = () => {
		if (!editingItem) return

		// Validaciones
		if (!editCurrentItem.name || editCurrentItem.price <= 0) {
			ShowToast('⚠️ Por favor, ingresa un nombre y un precio válido para el artículo.')
			return
		}

		setList((prevList) => ({
			...prevList,
			items: prevList.items.map((item) =>
				item.id === editingItem.id
					? { ...item, name: editCurrentItem.name, price: editCurrentItem.price }
					: item,
			),
			total: calculateTotal(
				prevList.items.map((item) =>
					item.id === editingItem.id
						? { ...item, name: editCurrentItem.name, price: editCurrentItem.price }
						: item,
				),
			),
		}))

		ShowToast(`✅ "${editCurrentItem.name}" actualizado exitosamente.`)

		// Limpiar el estado de edición
		setEditingItem(null)
		setEditCurrentItem({ id: '', name: '', price: 0, quantity: 1 })
	}

	const updateQuantity = (itemId: string, newQuantity: number) => {
		setList((prevList) => ({
			...prevList,
			items: prevList.items.map((item) =>
				item.id === itemId ? { ...item, quantity: newQuantity } : item,
			),
			total: calculateTotal(
				prevList.items.map((item) =>
					item.id === itemId ? { ...item, quantity: newQuantity } : item,
				),
			),
		}))
	}

	const cancelEdit = () => {
		setEditingItem(null)
		setEditCurrentItem({ id: '', name: '', price: 0, quantity: 1 })
	}

	// Función para crear una nueva lista
	const createList = () => {
		// Validar que la lista tenga un nombre y al menos un artículo
		if (!list.name && list.items.length === 0) {
			ShowToast('❌ Por favor, ingresa un nombre para la lista y agrega al menos un artículo.')
			return
		} else if (!list.name) {
			ShowToast('📝 Por favor, ingresa un nombre para la lista.')
			return
		} else if (list.items.length === 0) {
			ShowToast('📋 Por favor, agrega al menos un artículo a la lista.')
			return
		}

		// Guardar la lista en el almacenamiento local

		if (editingListId) {
			const dto: UpdateListDto = {
				id: editingListId,
				name: list.name,
				items: list.items.map((item) => ({
					id: item.id,
					name: item.name,
					price: item.price,
					quantity: item.quantity,
				})),
			}
			ListService.update(dto)
			ShowToast('🎉 Lista editada exitosamente.')
		} else {
			const dto: CreateListDto = {
				name: list.name,
				items: list.items.map((item) => ({
					name: item.name,
					price: item.price,
					quantity: item.quantity,
				})),
			}
			ListService.create(dto)
			ShowToast('🎉 Lista creada exitosamente.')
		}

		// Limpiar el formulario
		setList({ name: '', items: [], total: 0 })

		// Redireccionar a demo
		setTimeout(() => {
			window.location.href = '/demo'
			navigate('/demo')
		}, 2000)
	}

	// Función para agregar un artículo a la lista
	const addItem = () => {
		// Validar que el nombre y el precio del artículo sean válidos
		if (!currentItem.name || currentItem.price <= 0) {
			ShowToast('⚠️ Por favor, ingresa un nombre y un precio válido para el artículo.')
			return
		}

		// Crear un nuevo artículo con un ID único
		const newItem: Item = {
			id: Date.now().toString(), // ✅ Timestamp numérico como string
			name: currentItem.name,
			price: currentItem.price,
			quantity: currentItem.quantity,
		}

		// ✅ Agregar al principio
		setList((prevList) => ({
			...prevList,
			items: [newItem, ...prevList.items],
			total: calculateTotal([newItem, ...prevList.items]),
		}))

		// Limpiar el campo del artículo actual
		setCurrentItem({ id: '', name: '', price: 0, quantity: 1 })
		setIsAddModalOpen(false) // ✅ Cerrar modal después de agregar

		ShowToast(`✅ "${newItem.name}" agregado exitosamente.`)
	}

	// Lógica para modal "Nuevo"
	const logicAddNewArticle = {
		cancelEdit: () => {
			setCurrentItem({ id: '', name: '', price: 0, quantity: 1 })
			setIsAddModalOpen(false) // ✅ Cerrar modal al cancelar
		},
		addItem,
		updateItem: () => {}, // No usado en modal nuevo
	}

	// Lógica para modal "Editar"
	const logicEditArticle = {
		cancelEdit,
		addItem: () => {}, // No usado en modal editar
		updateItem,
		updateQuantity,
	}

	// Objeto con toda la lógica de edición
	const editLogic = {
		editCurrentItem,
		setEditCurrentItem,
		editingItem,
		setEditingItem,
		logicEditArticle,
	}

	return (
		<section className="grid min-h-full w-full grid-rows-[auto_1fr_auto] md:gap-8 dark:text-white">
			<header className="mx-4 my-2 flex items-center justify-start gap-4">
				{editingListId ? (
					<>
						<ButtonBack url="/demo/mis-listas" />
						<h2 className="text-xl font-bold md:text-2xl">Editar Lista</h2>
					</>
				) : (
					<>
						<ButtonBack url="/demo" />
						<h2 className="text-xl font-bold md:text-2xl">Nueva Lista</h2>
					</>
				)}
			</header>
			<main className="flex flex-col gap-4 overflow-y-auto p-4">
				<form
					action=""
					onSubmit={(e) => {
						e.preventDefault()
					}}
					className="flex items-center justify-center gap-4 rounded-xl border border-gray-200/50 bg-white/30 p-2 px-2 shadow-sm backdrop-blur transition-colors dark:border-gray-700/50 dark:bg-gray-900/60 dark:shadow-none"
				>
					<div className="flex flex-1 items-center gap-2 rounded-xl md:gap-2 md:p-4">
						{!isNameConfirmed ? (
							<>
								<input
									type="text"
									name="nameList"
									id="nameList"
									placeholder="Nombre de la lista"
									className="flex-1 rounded-lg border border-gray-400/50 p-1.5 placeholder:text-black/40 dark:placeholder:text-white/40"
									value={list.name}
									onChange={(e) => {
										setList({ ...list, name: e.target.value })
									}}
									onBlur={() => {
										const trimmedName = list.name.trim()
										setIsNameConfirmed(true)
										setList({ ...list, name: trimmedName })
									}}
									onKeyDown={(e) => {
										if (e.key === 'Enter') {
											const trimmedName = list.name.trim()
											setIsNameConfirmed(true)
											setList({ ...list, name: trimmedName })
										}
									}}
									ref={inputNameList}
								/>
							</>
						) : (
							<>
								<p
									className={`${list.name === 'Coloca el nombre de tu lista' ? 'animate-pulse text-red-700' : 'text-black'} text-sm font-bold md:text-base`}
								>
									{list.name}
								</p>
								<button
									className="cursor-pointer rounded-md border border-blue-200/80 bg-blue-100/30 p-1 text-white transition hover:bg-blue-200/50 dark:border-blue-700/50 dark:bg-blue-900/30 dark:hover:bg-blue-800/50"
									onClick={(e) => {
										e.preventDefault()
										setIsNameConfirmed(false)
										if (list.name === 'Coloca el nombre de tu lista') setList({ ...list, name: '' })
									}}
								>
									<Edit3 className="text-blue-400 dark:text-blue-300" height={16} width={16} />
								</button>
							</>
						)}
					</div>
					<ModalRadix
						isOpen={isAddModalOpen}
						onOpenChange={setIsAddModalOpen}
						trigger={
							<button
								className="flex transform cursor-pointer items-center gap-2 rounded-xl border border-blue-200/50 bg-blue-100 px-4 py-2 font-medium text-blue-800 transition-all duration-300 hover:scale-105 hover:border-blue-300/70 hover:bg-blue-200 hover:text-blue-900 active:scale-95 dark:border-blue-700/50 dark:bg-blue-900/40 dark:text-blue-200 dark:hover:border-blue-600/70 dark:hover:bg-blue-800/50 dark:hover:text-blue-100"
								onClick={() => setIsAddModalOpen(true)}
							>
								<Plus size={18} />
								<span>Nuevo</span>
							</button>
						}
						title="Agregar articulo"
						size="md"
					>
						<AddArticleForm
							currentItem={currentItem}
							setCurrentItem={setCurrentItem}
							onAdd={logicAddNewArticle.addItem}
						/>
					</ModalRadix>
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
									editLogic={editLogic}
									updateQuantity={updateQuantity}
								/>
							)}
						</>
					) : (
						<ListArticles
							listArticles={list}
							setArticles={setList}
							editLogic={editLogic}
							updateQuantity={updateQuantity}
						/>
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

