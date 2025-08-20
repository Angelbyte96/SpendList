import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from '@radix-ui/react-icons'
import * as Select from '@radix-ui/react-select'
import classnames from 'classnames'
import * as React from 'react'

interface SelectRadixProps {
	value: number
	onValueChange: (value: number) => void
}

const SelectRadix = ({ value, onValueChange }: SelectRadixProps) => (
	<Select.Root value={value.toString()} onValueChange={(val) => onValueChange(parseInt(val))}>
		<Select.Trigger
			className="inline-flex h-[25px] items-center justify-center gap-[3px] rounded-md border bg-[#3d036622] px-[6px] text-[12px] leading-none text-black shadow-[0_2px_10px] shadow-black/10 outline-none transition-all duration-150 hover:bg-[#3d036644] focus:ring-2 focus:ring-purple-500 focus:ring-offset-1 focus:ring-offset-white dark:border-[#393939] dark:text-white dark:focus:ring-purple-400 dark:focus:ring-offset-[#101421]"
			aria-label="quantity"
		>
			<Select.Value placeholder="Piezas" />
			<Select.Icon className="text-violet11">
				<ChevronDownIcon />
			</Select.Icon>
		</Select.Trigger>
		<Select.Portal>
			<Select.Content className="w-fit overflow-hidden rounded-md bg-white/90 backdrop-blur-md shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] dark:bg-[#101421]/80 dark:backdrop-blur-md dark:border dark:border-gray-600/30">
				<Select.ScrollUpButton className="flex h-[25px] cursor-default items-center justify-center bg-white/50 backdrop-blur-sm text-gray-600 dark:bg-[#101421]/60 dark:backdrop-blur-sm dark:text-gray-300">
					<ChevronUpIcon />
				</Select.ScrollUpButton>
				<Select.Viewport className="w-fit p-[4px]">
					<Select.Group>
						<Select.Label className="flex justify-center px-[8px] py-[2px] text-[10px] leading-[14px] text-purple-700 font-medium dark:text-purple-300">
							Cantidad
						</Select.Label>

						{[...Array(20)].map((_, i) => (
							<SelectItem
								key={i + 1}
								value={(i + 1).toString()}
								className="cursor-pointer rounded hover:bg-purple-200/60 hover:backdrop-blur-sm dark:hover:bg-[#1a1d2e]/70 dark:hover:backdrop-blur-sm"
							>
								{i + 1}
							</SelectItem>
						))}
					</Select.Group>
				</Select.Viewport>
				<Select.ScrollDownButton className="flex h-[25px] cursor-default items-center justify-center bg-white/50 backdrop-blur-sm text-gray-600 dark:bg-[#101421]/60 dark:backdrop-blur-sm dark:text-gray-300">
					<ChevronDownIcon />
				</Select.ScrollDownButton>
			</Select.Content>
		</Select.Portal>
	</Select.Root>
)

interface SelectItemProps {
	children: React.ReactNode
	className?: string
	value: string
}

const SelectItem = React.forwardRef<HTMLDivElement, SelectItemProps>(({ children, className, ...props }, forwardedRef) => {
	return (
		<Select.Item
			className={classnames(
				'relative flex h-[25px] w-[60px] items-center justify-center rounded-[3px] pl-[25px] pr-[25px] text-[13px] leading-none select-none text-gray-900 transition-all duration-150 data-[disabled]:pointer-events-none data-[disabled]:text-purple-200 data-[highlighted]:bg-purple-100 data-[highlighted]:text-purple-900 data-[highlighted]:ring-2 data-[highlighted]:ring-purple-500 data-[highlighted]:ring-offset-1 dark:text-gray-100 dark:data-[highlighted]:bg-[#1a1d2e]/90 dark:data-[highlighted]:backdrop-blur-sm dark:data-[highlighted]:text-white dark:data-[highlighted]:ring-2 dark:data-[highlighted]:ring-purple-400 dark:data-[highlighted]:ring-offset-1 dark:data-[highlighted]:ring-offset-[#101421]',
				className,
			)}
			{...props}
			ref={forwardedRef}
		>
			<Select.ItemText>{children}</Select.ItemText>
			<Select.ItemIndicator className="absolute left-0 inline-flex w-[25px] items-center justify-center">
				<CheckIcon />
			</Select.ItemIndicator>
		</Select.Item>
	)
})

export { SelectRadix }

