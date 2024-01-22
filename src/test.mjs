import getCurrentSession from "./session/getCurrent.mjs"
import generateTestCaseId from "./lib/generateTestCaseId.mjs"

function addTest(label, test_fn, skip = false) {
	const session = getCurrentSession()

	if (!session.is_processing) {
		throw new Error(
			`JTest is done processing files.\n` +
			`It seems like you called test() within a test(). This is not supported.`
		)
	}

	let context = session.tests

	/**
	 * When we are in a "describe" block this
	 * variable will be set.
	 * 
	 * Add the test to that variable instead of global tests.
	 */
	if (session.current_describe_block !== null) {
		context = session.current_describe_block
	}

	const test_id = generateTestCaseId()

	const test = {
		id: test_id,
		label,
		test_fn,
		file: session.current_file,
		skip
	}

	context.push(test)

	if (session.current_file_tests !== null) {
		session.current_file_tests.push(test)
	}
}

function test(label, test_fn) {
	addTest(label, test_fn)
}

test.skip = function(label, test_fn) {
	addTest(label, test_fn, true)
}

export default test
