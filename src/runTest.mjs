import {createExpectationsContext} from "@joytest/expect"
import runFnWithTimeout from "@anio-js-foundation/run-fn-with-timeout"
import measureExecutionTime from "@anio-js-foundation/fn-measure-execution-time"
import errorObjectToString from "@anio-js-foundation/error-object-to-string"

export default async function runTest(
	test_fn,
	timeout = 0,
	additional_information = null
) {
	let error = null, test_execution_time = 0, test_timeout = false
	let result = "fail"

	//
	// this should *normally* never be true
	// this is only set if we are testing anio-jtest *itself*
	// which allows expect() errors to be swallowed during
	// unit testing
	//
	let jtest_test_mode = false

	if (additional_information !== null) {
		const {jtest_session} = additional_information

		if ("jtest_test_mode" in jtest_session) {
			jtest_test_mode = jtest_session.jtest_test_mode
		}
	}

	const expect_context = createExpectationsContext()
	const {expect, end} = expect_context

	try {
		const result = await measureExecutionTime(
			runFnWithTimeout, test_fn, timeout, expect
		)

		if (jtest_test_mode !== true) {
			end()
		}

		test_execution_time = result.execution_time
		test_timeout = result.value.timeout
	} catch (_) {
		error = _
	}

	if (test_timeout) {
		result = "timeout"
	}
	// !test_timeout is superfluous but still just to be safe
	else if (error === null && !test_timeout) {
		result = "pass"
	}

	let ret = {
		made_assertions: expect_context.madeAssertions,
		verdict: result,
		execution_time: test_execution_time
	}

	if (ret.verdict === "fail") {
		ret.error = errorObjectToString(error)
	}

	return ret
}
