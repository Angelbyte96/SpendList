import { ThemeToggle } from '@/components/ThemeToggle'

const Nav = () => {
	return (
		<nav className="sticky top-0 z-10 flex w-full justify-between border-b border-gray-200/50 bg-white/70 px-1 py-1.5 text-black shadow-sm backdrop-blur-xl backdrop-saturate-150 md:px-2 md:py-3 dark:border-white/5 dark:bg-black/40 dark:text-white">
			<div className="w-5"></div>
			<a href="/" className="font-bold uppercase md:text-2xl">
				SpendList
			</a>
			<ThemeToggle />
		</nav>
	)
}

export { Nav }

