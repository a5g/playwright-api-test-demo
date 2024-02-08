// import fs from 'fs'
import { faker } from '@faker-js/faker'

/**
 * User type with all the required fields for user creation
 */
type User = {
  id: number
  username: string
  firstName: string
  lastName: string
  email: string
  password: string
  phone: string
  userStatus: number
}

export class UserData {
  /**
   * Creates a random user object with fake data for testing.
   */
  createRandomUser(): User {
    return {
      id: 0,
      username: faker.person.firstName(),
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      phone: faker.phone.number(),
      userStatus: 0,
    }
  }

  /**
   * Returns a common test user object.
   */
  getCommonUser(): User {
    return {
      id: 286649646,
      username: 'abc',
      firstName: 'ab',
      lastName: 'c',
      email: 'a@b.com',
      password: 'a',
      phone: '987766',
      userStatus: 0,
    }
  }
}

const userData = new UserData()

export { userData }
