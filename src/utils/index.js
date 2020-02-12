export const debounce = (fn, time = 100, ctx = null) => {
	let timer

	return (...args) => {
		clearTimeout(timer)

		return new Promise(resolve => {
			timer = setTimeout(() => {
				resolve(fn.apply(ctx, args))
			}, time)
		})
	}
}
