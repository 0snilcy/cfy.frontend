export const debounce = (fn: any, time = 100, ctx: any = null) => {
	let timer: NodeJS.Timeout

	return (...args: any[]) => {
		clearTimeout(timer)

		return new Promise(resolve => {
			timer = setTimeout(() => {
				resolve(fn.apply(ctx, args))
			}, time)
		})
	}
}
