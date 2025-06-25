import { ThemeToggle } from '@/components/ThemeToggle'

const Nav = () => {
	return (
		<nav className="sticky top-0 z-10 flex w-full justify-between border-b border-gray-200/50 bg-white/70 px-2 py-3 text-black shadow-sm backdrop-blur-xl backdrop-saturate-150 dark:border-white/5 dark:bg-black/40 dark:text-white">
			<div className="w-5"></div>
			<a href="/" className="uppercase md:text-2xl">
				Shop List
			</a>
			<ThemeToggle />
		</nav>
	)
}

export { Nav }

