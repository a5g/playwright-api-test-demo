import { Page } from '@playwright/test'
import fs from 'fs'
import cnfg from '../config'

export default class BasePage {
  page: Page

  constructor(page: Page) {
    this.page = page
  }

  public get config() {
    return cnfg
  }

  public async goto(path: string = '') {
    await this.page.goto(path)
  }

  public async removeSession(filePath: string = cnfg.stateJsonFile) {
    fs.writeFile(filePath, JSON.stringify({ cookies: [] }, null, 2), (err) => {
      if (err) {
        console.log(err)
      }
    })
  }

  public async storeSession(filePath: string = cnfg.stateJsonFile) {
    await this.page.context().storageState({ path: filePath })
  }
}
