import {createExpectationsContext} from "@anio-js-foundation/expect"
import runFnWithTimeout from "@anio-js-core-foundation/run-fn-with-timeout"
import measureExecutionTime from "@anio-js-core-foundation/fn-measure-execution-time"

export default async function runTest(test_fn, timeout = 0) {
	let error = null, test_execution_time = 0, test_timeout = false
	let result = "fail"

	const {expect, end} = createExpectationsContext()

	try {
		const result = await measureExecutionTime(
			runFnWithTimeout, test_fn, timeout, expect
		)

		end()

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

	return {
		result,
		error,
		execution_time: test_execution_time
	}
}
