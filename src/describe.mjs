import getCurrentSession from "./session/getCurrent.mjs"

export default function(label, describe_fn) {
	const session = getCurrentSession()

	if (!session.is_processing) {
		throw new Error(
			`JTest is done processing files.\n` +
			`It seems like you called describe() within a test(). This is not supported.`
		)
	} else if (session.current_describe_block !== null) {
		throw new Error(
			`You cannot nest describe() blocks.`
		)
	}

	// initialize current describe block
	session.current_describe_block = []
	describe_fn()

	if (!session.current_describe_block.length) {
		throw new Error(`Cannot have empty describe() block.`)
	}

	session.tests.push({
		label,
		tests: session.current_describe_block
	})

	session.current_describe_block = null
}
