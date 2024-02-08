# playwright-api-test-demo

A @playwright/test based API test automation framework

- A sample automation framework to test the APIs for [petstore](https://petstore.swagger.io/)
- Does all levels of API validation
- In built wrappers to reduce the test creation and validation time

## Prerequisites

- Nodejs 12.x and above [Install Nodejs 12.x or later version using [nvm](https://github.com/creationix/nvm) or [Node.js](https://nodejs.org/en/)]
- Java 1.8 and above [Install Java 1.8 or later version using [jdk](https://www.oracle.com/in/java/technologies/downloads/) [This is optional required for allure report generation only. Otherwise this can be ignored]

## Setup

$ git clone git@github.com:a5g/playwright-api-test-demo.git  
\$ cd playwright-api-test-demo  
\$ npm install  
\$ npx playwright install

## Run Tests

Watch [video]()

```
To run all api tests [Pet, Store and User]
$ npm run test

To run all Pet api tests
$ npm run test:pet

To run all Store api tests
$ npm run test:store

To run all User api tests
$ npm run test:user

To run all P0 api tests
$ npm run test:p0
```

## Test Reports

To view the Playwright HTML Test reports  
$ npm run report [or]  
\$ npx playwright show-report

To view the Allure HTML Test reports  
$ npm run report:allure

## Preferred Editor

[VSCode](https://code.visualstudio.com/download) with below extensions

- [Prettier - Code Formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- [Playwright Test](https://marketplace.visualstudio.com/items?itemName=ms-playwright.playwright)

## Support

For any support please reach out to gani.anand@gmail.com
