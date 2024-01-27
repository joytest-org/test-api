# @anio-jtest/test

API for test cases for anio-jtest.

```js
import {createTestSuite} from "@anio-jtest/test"

const {test, suite} = createTestSuite(import.meta.url, "name of test suite")

test("this is a test", (expect) => {

})

test.skip("this test will be skipped", (expect) => {

})
```
