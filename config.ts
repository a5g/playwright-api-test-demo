export default {
  ENVIRONMENT: process.env.ENVIRONMENT || 'prod',
  HEADLESS: !!(
    process.env.HEADLESS && process.env.HEADLESS.toLowerCase() === 'true'
  ),
  BROWSER_WIDTH: parseInt(process.env.BROWSER_WIDTH, 10) || 1400,
  BROWSER_HEIGHT: parseInt(process.env.BROWSER_HEIGHT, 10) || 1250,
  TEST_TIMEOUT: parseInt(process.env.TEST_TIMEOUT, 10) || 3,
  stateJsonFile: './state.json',

  uidemo: {
    username: 'standard_user',
    password: 'secret_sauce',
  },

  extraHTTPHeaders: {
    accept: 'application/json',
    'Content-Type': 'application/json',
    // Authorization: `token ${process.env.API_TOKEN}`,
  },
  dev: {
    apiHost: 'https://dev.petstore.swagger.io/v2',
  },
  qa: {
    apiHost: 'https://qa.petstore.swagger.io/v2',
  },
  stage: {
    apiHost: 'https://stage.petstore.swagger.io/v2',
  },
  prod: {
    apiHost: 'https://petstore.swagger.io/v2',
  },
}
