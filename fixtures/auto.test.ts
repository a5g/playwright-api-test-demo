import { test as baseTest } from '@playwright/test'
import { BasePage, LoginPage } from '../pages'
import { API, PetAPI, StoreAPI, UserAPI } from '../service'

/**
 * Extends the base Playwright test fixture to add test-specific fixtures:
 *
 * - UI page objects like BasePage and LoginPage
 * - API clients like API, PetAPI, etc
 *
 * This allows tests to access these objects via the `test.page` and
 * `test.api` properties.
 */
const fixture = baseTest.extend<{
  // UI
  basePage: BasePage
  loginPage: LoginPage

  // API
  api: API
  petAPI: PetAPI
  storeAPI: StoreAPI
  userAPI: UserAPI
}>({
  // UI
  basePage: async ({ page }, use) => {
    await use(new BasePage(page))
  },
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page))
  },

  // API
  api: async ({ request }, use) => {
    await use(new API(request))
  },
  petAPI: async ({ request }, use) => {
    await use(new PetAPI(request))
  },
  storeAPI: async ({ request }, use) => {
    await use(new StoreAPI(request))
  },
  userAPI: async ({ request }, use) => {
    await use(new UserAPI(request))
  },
})

export const test = fixture
export const expect = fixture.expect
