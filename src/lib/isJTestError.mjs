export default function(error, id = null) {
	if (!("anio_jtest_error_id" in error)) {
		return false
	}

	if (id === null) return true

	return error.anio_jtest_error_id === id
}
