import { APIRequestContext } from '@playwright/test'
import { API } from './index'
import userSchema from '../json-schema/user/user.json'
import userAddedSchema from '../json-schema/user/user-added.json'
import { utils } from '../utils/utils'

const url = `${utils.apiHost}/user`

export class UserAPI extends API {
  request: APIRequestContext

  /**
   * Constructs a new PetAPI instance with the provided APIRequestContext.
   *
   * @param request - The APIRequestContext to use for making API requests.
   */
  constructor(request: APIRequestContext) {
    super(request)
    this.request = request
  }

  /**
   * Finds an order by ID.
   *
   * @param id - The ID of the order to find.
   * @returns A promise that resolves to the order, if found.
   */
  public async getUserByName(name: string) {
    const request: any = {
      url: `${url}/${name}`,
      method: 'GET',
    }
    return super.get(request, { schema: userSchema })
  }

  /**
   * Creates a new user.
   *
   * @param data - The user data to create the user with.
   * @returns A promise that resolves to the created user.
   */
  public async createUser(data: any) {
    const request: any = {
      url: `${url}`,
      method: 'POST',
      data,
    }
    return super.post(request, { schema: userAddedSchema })
  }

  /**
   * Creates multiple new users from an array.
   *
   * @param data - Array of user data objects to create users from.
   * @returns Promise resolving to the created users.
   */

  public async createUsersWithArray(data: any) {
    const request: any = {
      url: `${url}/createWithArray`,
      method: 'POST',
      data,
    }
    return super.post(request, { schema: userAddedSchema })
  }

  /**
   * Creates multiple new users from a list.
   *
   * @param data - List of user data objects to create users from.
   * @returns Promise resolving to the created users.
   */
  public async createUsersWithList(data: any) {
    const request: any = {
      url: `${url}/createWithList`,
      method: 'POST',
      data,
    }
    return super.post(request, { schema: userAddedSchema })
  }

  /**
   * Updates a user by username.
   *
   * @param data - User data containing username and updates.
   * @returns Promise resolving to updated user.
   */
  public async updateUser(data: any) {
    const request: any = {
      url: `${url}/${data.username}`,
      method: 'PUT',
      data,
    }
    return super.put(request, { schema: userAddedSchema })
  }

  /**
   * Deletes a user by username.
   *
   * @param username - The username of the user to delete.
   */
  public async deleteUser(username: string) {
    const request: any = {
      url: `${url}/${username}`,
      method: 'DELETE',
    }
    return super.delete(request, { schema: userAddedSchema })
  }

  /**
   * Logs in a user.
   *
   * @param username - The username of the user.
   * @param password - The password of the user.
   * @returns A promise resolving to the logged in user.
   */
  public async login(username: string, password: string) {
    const request: any = {
      url: `${url}/login?username=${username}&password=${password}`,
      method: 'GET',
    }
    return super.get(request, { schema: userAddedSchema })
  }

  /**
   * Logs out the current logged in user.
   *
   * @returns A promise resolving when the user is logged out.
   */
  public async logout() {
    const request: any = {
      url: `${url}/logout`,
      method: 'GET',
    }
    return super.get(request, { schema: userAddedSchema })
  }
}
