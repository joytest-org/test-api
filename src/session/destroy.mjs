import _getGlobalObject from "../api/_getGlobalObject.mjs"

export default function() {
	const jtest = _getGlobalObject()

	if (jtest.current_session === false) {
		throw new Error(
			`Cannot destory anio-jtest session. Reason: session does not exist.`
		)
	}

	jtest.current_session = false
}
