// start of section 'this is done by the runner'
import {createSession} from "@anio-jtest/test/session"

const session = createSession()
// end of section 'this is done by the runner'
import {describe, test} from "@anio-jtest/test"

describe("describe block 1", () => {
	test("test 1 within describe block 1", () => {})
	test("test 2 within describe block 1", () => {})
})

describe("describe block 2", () => {
	test("test 1 within describe block 2", () => {})
	test("test 2 within describe block 2", () => {})
})

describe("describe block 3", () => {
	test("test 1 within describe block 3", () => {})
	test("test 2 within describe block 3", () => {})
})

function validate() {
	if (session.tests.length !== 3) return false

	if (!("tests" in session.tests[0])) return false
	if (!("tests" in session.tests[1])) return false
	if (!("tests" in session.tests[2])) return false

	if (session.tests[0].label !== "describe block 1") return false
	if (session.tests[1].label !== "describe block 2") return false
	if (session.tests[2].label !== "describe block 3") return false

	const tests1 = session.tests[0].tests
	const tests2 = session.tests[1].tests
	const tests3 = session.tests[2].tests

	if (tests1.length !== 2) return false
	if (tests2.length !== 2) return false
	if (tests3.length !== 2) return false

	if (tests1[0].label !== "test 1 within describe block 1") return false
	if (tests1[1].label !== "test 2 within describe block 1") return false

	if (tests2[0].label !== "test 1 within describe block 2") return false
	if (tests2[1].label !== "test 2 within describe block 2") return false

	if (tests3[0].label !== "test 1 within describe block 3") return false
	if (tests3[1].label !== "test 2 within describe block 3") return false

	return true
}

if (validate() !== true) {
	throw new Error(`Test failed.`)
}
