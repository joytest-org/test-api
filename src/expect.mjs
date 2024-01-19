import getCurrentSession from "./session/getCurrent.mjs"

function checkForExpectationsContext(session) {
	if (session.current_expectations_context === null) {
		throw new Error(
			`Expectations context was not set by JTest runner. This is a bug.`
		)
	}
}

const expect = function(...args) {
	const session = getCurrentSession()

	checkForExpectationsContext(session)

	return session.current_expectations_context.expect(...args)
}

expect.assertions = function(n) {
	const session = getCurrentSession()

	checkForExpectationsContext(session)

	session.current_expectations_context.expect.assertions(n)
}

export default expect
