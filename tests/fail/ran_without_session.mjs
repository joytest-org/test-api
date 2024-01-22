import {describe, test} from "../../src/index.mjs"

let success = false, success2 = false

try {
	test("", () => {

	})
} catch (error) {
	success = error.message === "No active anio-jtest session detected."
}

try {
	describe("", () => {

	})
} catch (error) {
	success2 = error.message === "No active anio-jtest session detected."
}

if (!success || !success2) {
	throw new Error(`Test failed.`)
}
