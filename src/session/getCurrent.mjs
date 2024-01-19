import _getGlobalObject from "../api/_getGlobalObject.mjs"

export default function() {
	const jtest = _getGlobalObject()

	if (!jtest.current_session) {
		throw new Error(`No active anio-jtest session detected.`)
	}

	return jtest.current_session
}
