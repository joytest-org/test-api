import createRandomIdentifier from "@anio-js-core-foundation/create-random-identifier"
import runTest from "./runTest.mjs"

export default function createTestSuite(referenced_from, label = null) {
	let context = {
		internal: {
			next_test_id: 0,
			// starts at 1 because describe block id = 0 is global describe block
			next_describe_block_id: 1,
			next_test_id_inside_describe_block: 0,
			current_describe_block: null
		},

		suite: {
			// Will be the same if test suite is imported again
			id: createRandomIdentifier(32),
			label,
			referenced_from,
			tests: []
		}
	}

	const addTest = function(label, test_fn, additional) {
		/**
		 * Pushes the test to the destination array 'target'.
		 */
		const pushTest = (id, target) => {
			target.push({
				id,
				referenced_from,
				label,
				test_fn,
				run(timeout = 0) {
					return runTest(test_fn, timeout)
				},
				...additional
			})
		}

		const is_in_describe_block = context.internal.current_describe_block !== null

		if (!is_in_describe_block) {
			const id = context.internal.next_test_id

			pushTest(`${referenced_from}#d0#t${id}`, context.suite.tests)

			++context.internal.next_test_id

			return
		}

		const did = context.internal.next_describe_block_id
		const tid = context.internal.next_test_id_inside_describe_block

		pushTest(`${referenced_from}#d${did}#t${tid}`, context.internal.current_describe_block)

		++context.internal.next_test_id_inside_describe_block
	}

	context.test = function(label, test_fn) {
		return addTest(label, test_fn, {skip: false})
	}

	context.test.skip = function(label, test_fn) {
		return addTest(label, test_fn, {skip: true})
	}

	context.describe = function(label, describe_block_fn) {
		if (context.internal.current_describe_block !== null) {
			throw new Error(
				`You are not allowed to nest describe() blocks.`
			)
		}

		context.internal.current_describe_block = []

		describe_block_fn()
		context.suite.tests.push({
			id: `${referenced_from}#d${context.internal.next_describe_block_id}`,
			label,
			tests: context.internal.current_describe_block
		})

		context.internal.current_describe_block = null
		context.internal.next_test_id_inside_describe_block = 0

		++context.internal.next_describe_block_id
	}

	return context
}
