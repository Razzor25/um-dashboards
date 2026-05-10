# Jest

Jest is a JavaScript/TypeScript testing framework that is used to test JavaScript/TypeScript code. It is a popular choice for testing React components and applications, but can be used to test any JavaScript/TypeScript code.

When you create another app within your turbo repo, you need to setup jest alongside it. This guide will help you setup jest in your app when adding another app to your turbo repo.

- [Jest](#jest)
  - [Jest Configuration File](#jest-configuration-file)
    - [Additional Aliases](#additional-aliases)
  - [Jest Setup File](#jest-setup-file)
  - [Testing Files](#testing-files)
    - [Mocking](#mocking)
  - [Running Jest Tests](#running-jest-tests)

## Jest Configuration File

In your new app, you need to copy the jest configuration file from [here](/apps/sample-app/jest.config.js). This file is a basic jest configuration file that you can use to get started with jest in your app.

### Additional Aliases

Most aliases are already setup in the jest configuration file. However, if you have additional aliases that you want to setup, you can add them to the `moduleNameMapper` object in the jest configuration file.

Each item is a key/value pair where the `key` is a regular expression that matches the alias and the `value` is the path to the alias. Use `<rootDir>` to refer to the root directory of the app (this is almost always needed). For example, if the jest configuration file is in the `apps/sample-app` directory, then `<rootDir>/example` would point to `apps/sample-app/example`.

Here is an example of how to add an alias to the `moduleNameMapper` object:

```js
module.exports = {
  moduleNameMapper: {
    '^@example/(.*)$': '<rootDir>/src/example/$1',
  },
};
```

## Jest Setup File

In your new app, you need to copy the jest setup file from [here](/apps/sample-app/jest.setup.ts). This file is used to setup jest before running the tests. You can add any setup code that you need to this file.

## Testing Files

Jest test files are files that end with `.test.ts` or `.test.tsx`. These files contain the tests that you want to run. You can create as many test files as you need in your app. The default config looks for these files in the `__test__` or `__tests__` directories within the `app/<app-name>` directory. So, for example it will look for test files in `apps/sample-app/__test__` or `apps/sample-app/__tests__` and if you have another app called `another-app`, it will look for test files in `apps/another-app/__test__` or `apps/another-app/__tests__`.

### Mocking

Make sure to mock http requests in your tests. You usually don't want to make real http requests especially ones that modify a database as this can lead to unexpected results.

## Running Jest Tests

To run the tests add a "test" script to the `package.json` file in your app (if it doesn't already exist). The script should run the `jest` command. Here is an example of what the `package.json` file should look like with the "test" script:

```json
{
  "name": "sample-app",
  "scripts": {
    "test": "jest"
  }
}
```

Then when you want to run your tests, you can run the following command from the root of the turbo repo:

```sh
npx turbo run test --filter=<sample-app>
```
