import createJTestError from "../../lib/createJTestError.mjs"

export default function(session) {
	if (session.tests_timeout_timer !== null) {
		throw new Error(
			`Cannot create test timeout rejection: timer already created.`
		)
	}

	return new Promise((resolve, reject) => {
		session.tests_timeout_timer = setTimeout(() => {
			const error = createJTestError(
				`Timeout of '${session.options.timeout}ms' reached.`, "test.timeout"
			)

			reject(error)
		}, session.options.timeout)
	})
}
