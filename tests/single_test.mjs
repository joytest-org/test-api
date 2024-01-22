// start of section 'this is done by the runner'
import {createSession} from "../src/session/index.mjs"

const session = createSession()
// end of section 'this is done by the runner'
import {test} from "../src/index.mjs"

test("single test", () => {

})

function validate() {
	if (session.tests.length !== 1) return false

	if (session.tests[0].label !== "single test") return false

	return true
}

if (validate() !== true) {
	throw new Error(`Test failed.`)
}
