export default function(session) {
	if (0 >= session.options.timeout) {
		return
	}

	if (session.tests_timeout_timer === null) {
		throw new Error(
			`Cannot reset test timeout timer: timer was not created.`
		)
	}

	clearTimeout(session.tests_timeout_timer)
	session.tests_timeout_timer = null
}
