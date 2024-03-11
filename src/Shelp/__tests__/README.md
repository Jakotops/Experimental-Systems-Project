# Troubleshooting
__Screenshot__ your unit test results and attach them to your Pull Request with a short __justification__ on why you tested them with reference to the requirements

Creating tests - Look at [this test file](./Id_To_Object_Mapper.test.js)
 as a reference

Creating Mocks - Look at this [mock file](../Firebase/__mocks__/FirestoreFunctions.js) for reference ([real file](../Firebase/FirestoreFunctions.js) for comparison) - <https://jestjs.io/docs/manual-mocks>

Common matchers - <https://jestjs.io/docs/using-matchers>

Asynchronous function testing - <https://jestjs.io/docs/tutorial-async>

Start a test  - __npm run test__

Test with console log statements - __npm run test-verbose__


If you have trouble with module imports you may have to create a mock file to stimulate the import methods  - you could also add the import to "transformIgnorePatterns" in packjage.json

Aim for no more than one expect method per test per test file

If you have any questions on testing let me know on Discord (Jason)