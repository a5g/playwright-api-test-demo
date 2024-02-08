import { faker } from '@faker-js/faker'
import { test, expect } from '../../../fixtures/auto.test'
import { userData } from '../../../data/user/User.data'

/**
 * Tests for the User API.
 *
 * Includes tests for:
 * - Getting a user by username
 * - Creating a single user
 * - Creating multiple users with an array
 * - Creating multiple users with a list
 *
 * Uses the userAPI binding and helper functions like
 * createRandomUser() to generate test data.
 *
 * Makes assertions on the API response data to verify
 * the API is functioning correctly.
 */
test.describe('User API TESTS', () => {
  /**
   * Tests getting a user by username using the userAPI.
   */
  test('should get user by name [/user/{username}]', async ({ userAPI }) => {
    const { data } = await userAPI.getUserByName(
      userData.getCommonUser().username,
    )

    expect(data).toEqual(userData.getCommonUser())
  })

  /**
   * Tests creating a single user via the userAPI.
   */
  test('@P0 should create single user [/user]', async ({ userAPI }) => {
    const payload = userData.createRandomUser()

    await userAPI.createUser(payload)

    const { data } = await userAPI.getUserByName(payload.username)
    expect(data.username).toEqual(payload.username)
    expect(data.firstName).toEqual(payload.firstName)
    expect(data.lastName).toEqual(payload.lastName)
    expect(data.email).toEqual(payload.email)
    expect(data.password).toEqual(payload.password)
    expect(data.phone).toEqual(payload.phone)
  })

  /**
   * Tests creating multiple users with an array via the userAPI.
   */
  test('@P0 should create multiple users [/user/createWithArray]', async ({
    userAPI,
  }) => {
    const payload = faker.helpers.multiple(userData.createRandomUser, {
      count: 5,
    })

    await userAPI.createUsersWithArray(payload)

    for (let i = 0; i < payload.length; i += 1) {
      const { data } = await userAPI.getUserByName(payload[i].username)
      expect(data.username).toEqual(payload[i].username)
      expect(data.firstName).toEqual(payload[i].firstName)
      expect(data.lastName).toEqual(payload[i].lastName)
      expect(data.email).toEqual(payload[i].email)
      expect(data.password).toEqual(payload[i].password)
      expect(data.phone).toEqual(payload[i].phone)
    }
  })

  /**
   * Tests creating multiple users with a list via the userAPI.
   */
  test('should create multiple users [/user/createWithList]', async ({
    userAPI,
  }) => {
    const payload = faker.helpers.multiple(userData.createRandomUser, {
      count: 5,
    })

    await userAPI.createUsersWithList(payload)

    for (let i = 0; i < payload.length; i += 1) {
      const { data } = await userAPI.getUserByName(payload[i].username)
      expect(data.username).toEqual(payload[i].username)
      expect(data.firstName).toEqual(payload[i].firstName)
      expect(data.lastName).toEqual(payload[i].lastName)
      expect(data.email).toEqual(payload[i].email)
      expect(data.password).toEqual(payload[i].password)
      expect(data.phone).toEqual(payload[i].phone)
    }
  })

  /**
   * Tests updating a single user via the userAPI.
   */
  test('should update single user [/user/{username}]', async ({ userAPI }) => {
    const payload = userData.createRandomUser()
    await userAPI.createUser(payload)

    payload.email = faker.internet.email()
    payload.phone = faker.phone.number()
    await userAPI.updateUser(payload)

    const updatedData = await (
      await userAPI.getUserByName(payload.username)
    ).data
    expect(payload.username).toEqual(updatedData.username)
    expect(payload.firstName).toEqual(updatedData.firstName)
    expect(payload.lastName).toEqual(updatedData.lastName)
    expect(payload.email).toEqual(updatedData.email)
    expect(payload.password).toEqual(updatedData.password)
    expect(payload.phone).toEqual(updatedData.phone)
  })

  /**
   * Tests deleting a single user via the userAPI.
   */
  test('@P0 should delete single user [/user/{username}]', async ({
    userAPI,
  }) => {
    const payload = userData.createRandomUser()
    await userAPI.createUser(payload)

    const { data } = await userAPI.deleteUser(payload.username)
    expect(data.message).toEqual(payload.username)
  })

  /**
   * Tests logging in a user via the userAPI.
   */
  test('should login user [/user/login]', async ({ userAPI }) => {
    const payload = userData.createRandomUser()
    await userAPI.createUser(payload)

    const { data } = await userAPI.login(payload.username, payload.password)
    expect(data.type).toContain('unknown')
    expect(data.message).toContain('logged in user session')
  })

  /**
   * Tests logging out a user via the userAPI.
   */
  test('should logout user [/user/logout]', async ({ userAPI }) => {
    const payload = userData.createRandomUser()
    await userAPI.createUser(payload)

    await userAPI.login(payload.username, payload.password)
    await userAPI.logout()
  })
})
