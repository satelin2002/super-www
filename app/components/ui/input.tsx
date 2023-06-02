import * as React from 'react'

import { cn } from '~/utils/misc.ts'

export interface InputProps
	extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
	({ className, type, ...props }, ref) => {
		return (
			<input
				type={type}
				className={cn(
					// 'border-input ring-offset-background placeholder:text-muted-foreground h-16 w-full rounded-lg bg-gray-100 px-4 pt-4 text-body-xs caret-gray-500 outline-none  focus-visible:outline-none  focus-visible:ring-2 focus-visible:ring-gray-800 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:bg-gray-400 disabled:opacity-50',
					'border-input ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-10 w-full rounded-md border bg-transparent px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
					className,
				)}
				ref={ref}
				{...props}
			/>
		)
	},
)
Input.displayName = 'Input'

export { Input }
