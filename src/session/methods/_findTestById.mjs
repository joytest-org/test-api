export default function(session, test_id) {
	let current_test_id = 0

	for (const entry of session.tests) {
		if ("tests" in entry) {
			for (const test of entry.tests) {
				if (test.id === test_id) {
					return test
				}
			}
		} else if (entry.id === test_id) {
			return entry
		}

	}

	throw new Error(`No such test with id '${test_id}'.`)
}
