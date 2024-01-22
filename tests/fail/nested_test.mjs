// start of section 'this is done by the runner'
import {createSession} from "@anio-jtest/test/session"

const session = createSession()
// end of section 'this is done by the runner'
let success = false

import {test} from "@anio-jtest/test"

test("", () => {

	test("", () => {

	})

})

session.is_processing = false

try {
	await session.tests[0].test_fn()
} catch (error) {
	success = error.message === `JTest is done processing files.
It seems like you called test() within a test(). This is not supported.`
}

if (!success) {
	throw new Error(`Test failed.`)
}
