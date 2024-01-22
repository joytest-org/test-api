// start of section 'this is done by the runner'
import {createSession} from "../../src/session/index.mjs"

const session = createSession()
// end of section 'this is done by the runner'
let success = false

import {describe} from "../../src/index.mjs"

try {
	describe("", () => {

		describe("", () => {
			
		})

	})
} catch (error) {
	success = error.message === "You cannot nest describe() blocks."
}

if (!success) {
	throw new Error(`Test failed.`)
}
