import { toast } from '@pheralb/toast'

const ShowToast = (message: string) => {
	toast.default({
		text: message,
	})
}

export { ShowToast }

