import { Locator, Page } from '@playwright/test'
import BasePage from './Base.page'

/**
 * Logs the user in with the provided credentials.
 *
 * @param email - The user's email address
 * @param password - The user's password
 */

export default class LoginPage extends BasePage {
  page: Page
  readonly emailTxt: Locator
  readonly passwordTxt: Locator
  readonly loginBtn: Locator
  readonly sortContainer: Locator

  constructor(page: Page) {
    super(page)
    this.page = page
    this.emailTxt = this.page.locator('[data-test="username"]')
    this.passwordTxt = this.page.locator('[data-test="password"]')
    this.loginBtn = this.page.locator('[data-test="login-button"]')
    this.sortContainer = this.page.locator(
      '[data-test="product_sort_container"]',
    )
  }

  public async goto() {
    await super.goto('')
  }

  /**
   * Logs in the user with the provided credentials.
   *
   * @param email - The user's email address
   * @param password - The user's password
   */
  public async login(email: string, password: string) {
    await this.emailTxt.fill(email)
    await this.passwordTxt.fill(password)
    await this.page.waitForTimeout(1000)
    await this.loginBtn.click()
    await this.page.waitForTimeout(2000)
    await this.sortContainer.waitFor()
  }
}
