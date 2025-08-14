import * as Dialog from '@radix-ui/react-dialog'
import { X } from 'lucide-react'

interface ModalRadixProps {
	children: React.ReactNode
	trigger: React.ReactNode
	title: string
	description?: string
	isOpen?: boolean
	onOpenChange?: (open: boolean) => void
	/**
	 * Tamaño del modal
	 * @default 'md'
	 * @description
	 * - 'sm': Pequeño (w-11/12 md:w-1/3)
	 * - 'md': Mediano (w-11/12 md:w-5/12)
	 * - 'lg': Grande (w-11/12 md:w-7/12)
	 * - 'xl': Extra grande (w-11/12 md:w-9/12)
	 * - 'full': Pantalla completa (w-11/12 md:w-11/12)
	 */
	size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
}

const ModalRadix = ({
	children,
	trigger,
	title,
	description,
	isOpen,
	onOpenChange,
	size = 'md',
}: ModalRadixProps) => {
	const getSizeClasses = () => {
		switch (size) {
			case 'sm':
				return 'w-11/12 md:w-1/3'
			case 'md':
				return 'w-11/12 md:w-5/12' // Tamaño actual
			case 'lg':
				return 'w-11/12 md:w-7/12'
			case 'xl':
				return 'w-11/12 md:w-9/12'
			case 'full':
				return 'w-11/12 md:w-11/12'
			default:
				return 'w-11/12 md:w-5/12'
		}
	}

	return (
		<Dialog.Root open={isOpen} onOpenChange={onOpenChange}>
			<Dialog.Trigger asChild>{trigger}</Dialog.Trigger>
			<Dialog.Portal>
				<Dialog.Overlay className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm" />
				<Dialog.Content
					className={`fixed top-1/2 left-1/2 z-50 flex -translate-x-1/2 -translate-y-1/2 flex-col gap-4 rounded-lg bg-slate-50 p-4 text-center text-black shadow-lg dark:bg-[#2c2c2c] dark:text-white ${getSizeClasses()}`}
				>
					<Dialog.DialogTitle className="">{title}</Dialog.DialogTitle>
					<Dialog.DialogDescription className="">{description}</Dialog.DialogDescription>
					{children}
					<Dialog.Close asChild>
						{
							<button
								className="focus:ring-opacity-30 absolute top-4 right-4 rounded-full p-1 text-black hover:cursor-pointer hover:bg-red-300 focus:ring-2 focus:ring-blue-200 focus:outline-none dark:text-white dark:hover:bg-[#fb868683]"
								aria-label="Cerrar"
							>
								<X width={20} height={20} />
							</button>
						}
					</Dialog.Close>
				</Dialog.Content>
			</Dialog.Portal>
		</Dialog.Root>
	)
}

export { ModalRadix }

