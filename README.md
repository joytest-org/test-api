# @anio-jtest/test

API for test cases for anio-jtest.

## Examples

### Basic 1

```js
import {createTestSuite} from "@anio-jtest/test"

const {test, suite} = createTestSuite(import.meta.url, "name of test suite")

test("this is a test", (expect) => {

})

test.skip("this test will be skipped", (expect) => {

})

export default suite
```

### Basic 2

```js
import {createTestSuite} from "@anio-jtest/test"

const {test, suite} = createTestSuite(import.meta.url) /* label is optional */

test("this is a test", (expect) => {

})

test.skip("this test will be skipped", (expect) => {

})

export default suite
```

### With array

```js
import {createTestSuite} from "@anio-jtest/test"

const s1 = createTestSuite(import.meta.url, "suite 1")
const s2 = createTestSuite(import.meta.url, "suite 2")

s1.test("this is a test (suite 1)", (expect) => {

})

s2.test("this is a test (suite 2)", (expect) => {

})

export default [s1.suite, s2.suite]
```

### With async function

```js
import {createTestSuite} from "@anio-jtest/test"

const s1 = createTestSuite(import.meta.url, "suite 1")
const s2 = createTestSuite(import.meta.url, "suite 2")

s1.test("this is a test (suite 1)", (expect) => {

})

s2.test("this is a test (suite 2)", (expect) => {

})

export default async function(/* maybe test context will be passed here */) {
	return [s1.suite, s2.suite]
}
```
