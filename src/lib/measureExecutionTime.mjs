export default async function(fn, ...args) {
	const start = performance.now()

	const value = await fn(...args)

	return {
		value,
		execution_time: performance.now() - start
	}
}
