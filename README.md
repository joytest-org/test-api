# @anio-jtest/test

API for test cases for anio-jtest.

## Examples

### Basic 1

```js
import {createTestSuite} from "@anio-jtest/test"

const {test, describe, suite} = createTestSuite(import.meta.url, "name of test suite")

test("this is a test", (expect) => {

})

test.skip("this test will be skipped", (expect) => {

})

describe("this is a collection of tests", () => {
	test("this is a test", (expect) => {

	})

	test("this is another test", (expect) => {

	})
})

export default suite
```

### Basic 2

```js
import {createTestSuite} from "@anio-jtest/test"

const {test, describe, suite} = createTestSuite(import.meta.url) /* label is optional */

test("this is a test", (expect) => {

})

test.skip("this test will be skipped", (expect) => {

})

describe("this is a collection of tests", () => {
	test("this is a test", (expect) => {

	})

	test("this is another test", (expect) => {

	})
})

export default suite
```
