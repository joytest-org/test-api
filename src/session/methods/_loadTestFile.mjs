export default async function(session, test_file) {
	if (!session.is_processing) {
		throw new Error(`Cannot load test file after processing stage.`)
	}

	session.current_file = test_file

	await import(test_file)

	session.current_file = null
}
