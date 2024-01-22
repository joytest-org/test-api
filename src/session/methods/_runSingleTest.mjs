import {createExpectationsContext} from "@anio-js-foundation/expect"
import measureExecutionTime from "../../lib/measureExecutionTime.mjs"
import createJTestError from "../../lib/createJTestError.mjs"

import createTestTimeoutRejection from "./_createTestTimeoutRejection.mjs"
import resetRejectionTimeout from "./_resetRejectionTimeout.mjs"

function rewriteExpectationError(error) {
	if (error.message.startsWith("<@anio-js-foundation/expect> ")) {
		return createJTestError(
			error.message.slice("<@anio-js-foundation/expect> ".length), "test.expect_error"
		)
	}

	return error
}

function runTestWithTimeout(session, fn) {
	if (0 >= session.options.timeout) {
		return fn()
	}

	const rejection = createTestTimeoutRejection(session)

	return Promise.race([fn(), rejection])
}

export default async function(session, test) {
	let test_error = null, execution_time = 0

	const expect_context = createExpectationsContext()

	session.current_expectations_context = expect_context

	try {
		execution_time = await measureExecutionTime(
			runTestWithTimeout, session, test.test_fn
		)

		/**
		 * End the expectations context to possibly
		 * catch swallowed errors.
		 *
		 * Also this validates number of assertions made.
		 */
		if (!session.test_mode) {
			expect_context.end()
		}
	} catch (_) {
		test_error = rewriteExpectationError(_)
	}

	resetRejectionTimeout(session)

	session.current_expectations_context = null

	const result = test_error === null ? "pass" : "fail"

	if (result === "pass") {
		session.statistics.num_passed_tests++
	} else {
		session.statistics.num_failed_tests++
	}

	return {
		result,
		error: test_error,
		time: execution_time
	}
}
