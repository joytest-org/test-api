import createRandomIdentifier from "@anio-js-core-foundation/create-random-identifier"

export function createTestSuite(referenced_from, label = null) {
	let context = {
		suite: {
			// Will be the same if test suite is imported again
			id: createRandomIdentifier(32),
			label,
			referenced_from,
			tests: []
		}
	}

	const addTest = function(label, test_fn, additional) {
		const id = createRandomIdentifier(8)

		context.suite.tests.push({id, label, test_fn, ...additional})
	}

	context.test = function(label, test_fn) {
		return addTest(label, test_fn, {skip: false})
	}

	context.test.skip = function(label, test_fn) {
		return addTest(label, test_fn, {skip: true})
	}

	return context
}
