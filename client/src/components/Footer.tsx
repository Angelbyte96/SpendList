import { Heart } from 'lucide-react'

const Footer = () => {
	return (
		<footer>
			<div className="border-b border-gray-200/50 bg-white/70 px-1 py-1.5 text-center text-black shadow-sm backdrop-blur-xl backdrop-saturate-150 md:px-2 md:py-2 dark:border-white/5 dark:bg-black/40 dark:text-white">
				<p className="flex w-full justify-center gap-1 text-sm">
					Hecho con{' '}
					<span>
						<Heart size="20" className="animate-pulse text-red-700 select-none" />
					</span>{' '}
					<span className="absolute m-[-1px] h-[1px] w-[1px] overflow-hidden border-0 p-0 whitespace-nowrap">
						amor
					</span>{' '}
					por Angelbyte
				</p>
			</div>
		</footer>
	)
}

export { Footer }
