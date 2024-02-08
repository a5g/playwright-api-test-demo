import { test } from '../../fixtures/auto.test'
import config from '../../config'

/**
 * Logs in to the saucedemo app using the provided credentials.
 * @param username The username to use for login
 * @param password The password to use for login
 */
test.describe('UI Tests', () => {
  test('should login to saucedemo', async ({ loginPage }) => {
    await loginPage.goto()
    await loginPage.login(config.uidemo.username, config.uidemo.password)
  })
})
