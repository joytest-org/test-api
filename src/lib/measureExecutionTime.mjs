export default async function(fn, ...args) {
	const start = performance.now()

	await fn(...args)

	return performance.now() - start
}
