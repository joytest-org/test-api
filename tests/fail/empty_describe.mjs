// start of section 'this is done by the runner'
import {createSession} from "@anio-jtest/test/session"

const session = createSession()
// end of section 'this is done by the runner'
let success = false

import {describe} from "@anio-jtest/test"

try {
	describe("", () => {

	})
} catch (error) {
	success = error.message === "Cannot have empty describe() block."
}

if (!success) {
	throw new Error(`Test failed.`)
}
