export default function() {
	let id = ""

	for (let i = 0; i < 16; ++i) {
		const r = Math.floor(Math.random() * 17)

		id += r.toString(16).slice(0, 1)
	}

	return id
}
