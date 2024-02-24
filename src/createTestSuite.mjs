import createRandomIdentifier from "@anio-js-core-foundation/create-random-identifier"
import runTest from "./runTest.mjs"
import convertImportURLToRelativePath from "./convertImportURLToRelativePath.mjs"

export default function createTestSuite(referenced_from, label = null) {
	const relative_reference = convertImportURLToRelativePath(referenced_from)

	let context = {
		internal: {
			next_test_id: 0,
			// starts at 1 because describe block id = 0 is global describe block
			next_describe_block_id: 1,
			next_test_id_inside_describe_block: 0,
			current_describe_block: null
		},

		suite: {
			is_anio_jtest_test_suite: true,

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
				//
				// additional_information (if set)
				// contains environment and jtest_session.
				//
				run(timeout = 0, additional_information = null) {
					return runTest(test_fn, timeout, additional_information)
				},
				...additional
			})
		}

		const is_in_describe_block = context.internal.current_describe_block !== null

		if (!is_in_describe_block) {
			const id = context.internal.next_test_id

			pushTest(`${relative_reference}#d0#t${id}`, context.suite.tests)

			++context.internal.next_test_id

			return
		}

		const did = context.internal.next_describe_block_id
		const tid = context.internal.next_test_id_inside_describe_block

		pushTest(`${relative_reference}#d${did}#t${tid}`, context.internal.current_describe_block)

		++context.internal.next_test_id_inside_describe_block
	}

	context.test = function(label, test_fn) {
		return addTest(label, test_fn, {skip: false})
	}

	context.test.skip = function(label, test_fn) {
		return addTest(label, test_fn, {skip: true})
	}

	context.describe = function(label, describe_block_fn) {
		const relative_reference = convertImportURLToRelativePath(referenced_from)

		if (context.internal.current_describe_block !== null) {
			throw new Error(
				`You are not allowed to nest describe() blocks.`
			)
		}

		context.internal.current_describe_block = []

		describe_block_fn()
		context.suite.tests.push({
			id: `${relative_reference}#d${context.internal.next_describe_block_id}`,
			label,
			tests: context.internal.current_describe_block
		})

		context.internal.current_describe_block = null
		context.internal.next_test_id_inside_describe_block = 0

		++context.internal.next_describe_block_id
	}

	context.suite.findTestById = function(test_id) {
		for (const entry of context.suite.tests) {
			if ("tests" in entry) {
				for (const test of entry.tests) {
					if (test.id === test_id) return test
				}
			} else if (entry.id === test_id) {
				return entry
			}
		}

		return null
	}

	return context
}
