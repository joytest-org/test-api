import _getGlobalObjectKey from "./_getGlobalObjectKey.mjs"

export default function() {
	const key = _getGlobalObjectKey()

	if (!(key in globalThis)) {
		globalThis[key] = {
			current_session: false
		}
	}

	return globalThis[key]
}
