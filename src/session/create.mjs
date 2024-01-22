import _getGlobalObject from "../api/_getGlobalObject.mjs"
import getDefaultOptions from "../api/getDefaultOptions.mjs"

import loadTestFile from "./methods/_loadTestFile.mjs"
import runSingleTest from "./methods/_runSingleTest.mjs"
import findTestById from "./methods/_findTestById.mjs"

export default function(options = {}) {
	const jtest = _getGlobalObject()

	if (jtest.current_session !== false) {
		throw new Error(
			`Cannot create a new anio-jtest session. Reason: session already created.`
		)
	}

	jtest.current_session = {
		test_mode: false,

		/* Used to keep track of the current file that is being processed */
		current_file: null,
		/* This flag will be turned off once processing is done */
		/* This is used to detect nested calls to test() */
		is_processing: true,
		/* Used to keep track of the current "describe" block */
		current_describe_block: null,

		next_test_id: 0,

		current_file_tests: null,

		/* Used to keep track of statistical data */
		statistics: {
			num_failed_tests: 0,
			num_passed_tests: 0
		},

		/* Stored here so it can be returned by {expect} in a test later */
		current_expectations_context: null,

		/* Used to keep track of test timeout timer */
		tests_timeout_timer: null,

		tests: [],

		options: Object.assign({}, getDefaultOptions(), options)
	}

	jtest.current_session.addTestFile = (test_file) => {
		return loadTestFile(jtest.current_session, test_file)
	}

	jtest.current_session.runSingleTest = (test) => {
		return runSingleTest(jtest.current_session, test)
	}

	jtest.current_session.findTestById = (test_id) => {
		return findTestById(jtest.current_session, test_id)
	}

	return jtest.current_session
}
