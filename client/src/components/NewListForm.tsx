import { MoveLeft, Plus } from 'lucide-react'

const NewListForm = () => {
	return (
		<section className="grid min-h-full w-full grid-rows-[auto_1fr_auto] border md:gap-8">
			<header className="m-2 flex items-center justify-start gap-4">
				<button className="flex items-center gap-2 rounded-md border p-1 transition-colors hover:bg-gray-200 md:p-2 dark:hover:bg-gray-700">
					<MoveLeft />
					<span>Volver</span>
				</button>
				<h2 className="text-xl font-bold md:text-2xl">Nueva Lista</h2>
			</header>
			<form action="">
				<div className="m-2 flex flex-col gap-1 rounded-xl border p-2 md:gap-2 md:p-4">
					<label htmlFor="nameList" className="font-semibold">
						Nombre de la lista
					</label>
					<input
						type="text"
						name="nameList"
						id="nameList"
						placeholder="Ej. Compras del fin de semana"
						className="rounded-lg border p-1.5"
					/>
				</div>
				<div className="m-2 flex flex-col gap-1 rounded-xl border p-2 md:gap-2 md:p-4">
					<label htmlFor="nameArticle" className="font-semibold">
						Agregar Articulo
					</label>
					<div className="flex flex-col sm:flex-row items-start sm:items-center w-full gap-3">
						<input
							type="text"
							name="nameArticle"
							id="nameArticle"
							placeholder="Nombre del articulo"
							className="w-full sm:flex-grow rounded-lg border p-1.5"
						/>
						<input
							type="number"
							name="price"
							placeholder="Precio"
							className="w-full sm:w-24 rounded-xl border p-1.5"
						/>
						<button className="w-full sm:w-auto flex justify-center items-center gap-2 rounded-lg bg-blue-800 px-3 py-1.5 text-white transition-colors hover:bg-blue-900">
							<Plus size={18} />
							<span>Agregar</span>
						</button>
					</div>
				</div>
			</form>
			<div className="flex items-center justify-between bg-[#0f172b3d] px-4 py-2">
				<div>
					<p>
						Total: <span>$0.00</span>
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

