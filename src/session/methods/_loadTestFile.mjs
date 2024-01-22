export default async function(session, test_file) {
	let imported_tests = []

	if (!session.is_processing) {
		throw new Error(`Cannot load test file after processing stage.`)
	}

	session.current_file = test_file
	session.current_file_tests = []

	await import(test_file)

	imported_tests = session.current_file_tests

	session.current_file = null
	session.current_file_tests = null

	return imported_tests
}
