import { Moon, Sun } from 'lucide-react'
import { useEffect, useState } from 'react'

const ThemeToggle = () => {
	// Estado para controlar el tema si estamos en el cliente
	const [mounted, setMounted] = useState(false)

	const [isDark, setIsDark] = useState(true)

	useEffect(() => {
		// Detectar el tema actual basado en la clase del elemento HTML
		const isDarkMode = document.documentElement.classList.contains('dark')
		setIsDark(isDarkMode)
		setMounted(true)
	}, [])

	// Si no estamos montados o el estado del tema aún no se ha determinado
	const toggleTheme = () => {
		const newIsDark = !isDark
		if (newIsDark) {
			document.documentElement.classList.add('dark')
			localStorage.setItem('theme', 'dark')
		} else {
			document.documentElement.classList.remove('dark')
			localStorage.setItem('theme', 'light')
		}
		setIsDark(newIsDark)
	}

	if (!mounted) {
		return (
			<button
				className='justify-self-end text-black dark:text-white'
				aria-label='Alternar tema'>
				<div className='w-5 h-5'></div>
			</button>
		)
	}

	return (
		<button
			className='justify-self-end text-black dark:text-white hover:cursor-pointer'
			onClick={toggleTheme}>
			{isDark ? <Sun /> : <Moon />}
		</button>
	)
}

export { ThemeToggle }

