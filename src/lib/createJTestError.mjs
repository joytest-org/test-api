export default function(message, id) {
	let error = new Error(message)

	error.anio_jtest_error_id = id

	return error
}
