// start of section 'this is done by the runner'
import {createSession} from "@anio-jtest/test/session"

const session = createSession({
	timeout: 100
})
// end of section 'this is done by the runner'
import {test} from "@anio-jtest/test"

test("", () => {
	return new Promise((resolve) => {
		setTimeout(resolve, 500)
	})
})

session.is_processing = false

const result = await session.runSingleTest(session.tests[0])

if (result.error.message !== `Timeout of '100ms' reached.`) {
	throw new Error(`Test failed.`)
}