// start of section 'this is done by the runner'
import {createSession} from "../src/session/index.mjs"

const session = createSession()
// end of section 'this is done by the runner'
import {describe, test} from "../src/index.mjs"

describe("single describe", () => {
	test("single test 1", () => {

	})

	test("single test 2", () => {

	})
})

function validate() {
	if (session.tests.length !== 1) return false

	if (!("tests" in session.tests[0])) return false

	if (session.tests[0].label !== "single describe") return false

	const {tests} = session.tests[0]

	if (tests.length !== 2) return false
	if (tests[0].label !== "single test 1") return false
	if (tests[1].label !== "single test 2") return false

	return true
}

if (validate() !== true) {
	throw new Error(`Test failed.`)
}
