import createRandomIdentifier from "@anio-js-core-foundation/create-random-identifier"
import runTest from "./runTest.mjs"

export default function createTestSuite(referenced_from, label = null) {
	let context = {
		suite: {
			// Will be the same if test suite is imported again
			id: createRandomIdentifier(32),
			label,
			referenced_from,
			tests: [],
			next_test_id: 0,
			current_describe_block: null
		}
	}

	const addTest = function(label, test_fn, additional) {
		let target = context.suite.tests
		const id = `${referenced_from}#${context.suite.next_test_id}`

		/**
		 * When we are in a "describe" block this
		 * variable will be set.
		 *
		 * Add the test to that variable instead of global tests.
		 */
		if (context.suite.current_describe_block !== null) {
			target = context.suite.current_describe_block
		}

		target.push({
			id,
			label,
			test_fn,
			run(timeout = 0) {
				return runTest(test_fn, timeout)
			},
			...additional
		})

		/**
		 * Always increase the test id regardless if
		 * we are in a describe block or not.
		 * This makes test uniquely identifiable.
		 */
		++context.suite.next_test_id
	}

	context.test = function(label, test_fn) {
		return addTest(label, test_fn, {skip: false})
	}

	context.test.skip = function(label, test_fn) {
		return addTest(label, test_fn, {skip: true})
	}

	context.describe = function(label, describe_block_fn) {
		if (context.suite.current_describe_block !== null) {
			throw new Error(
				`You are not allowed to nest describe() blocks.`
			)
		}

		context.suite.current_describe_block = []

		describe_block_fn()
		context.suite.tests.push({
			label,
			tests: context.suite.current_describe_block
		})

		context.suite.current_describe_block = null
	}

	return context
}
