import { ArrowLeft } from 'lucide-react'

interface ButtonBackProps {
	url: string
	text?: string
}

const ButtonBack = ({ url, text = 'Volver' }: ButtonBackProps) => {
	return (
		<a
			href={url}
			className="inline-flex transform items-center gap-2 rounded-xl border border-purple-200 bg-purple-100 px-6 py-3 text-base font-medium text-purple-700 transition-all duration-300 hover:scale-105 hover:border-purple-300 hover:bg-purple-200 hover:text-purple-800 active:scale-95 md:text-lg dark:border-purple-700 dark:bg-purple-900/30 dark:text-purple-300 dark:hover:border-purple-600 dark:hover:bg-purple-800/40 dark:hover:text-purple-200"
		>
			<span>
				<ArrowLeft />
			</span>
			<span>{text}</span>
		</a>
	)
}

export { ButtonBack }

