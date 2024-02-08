import { APIRequestContext } from '@playwright/test'
import { API } from './index'
import findByStatusSchema from '../json-schema/pet/find-by-status.json'
import petSchema from '../json-schema/pet/pet.json'
import { utils } from '../utils/utils'

const url = `${utils.apiHost}/pet`

export class PetAPI extends API {
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
   * Adds a new pet by sending a POST request to the pets API.
   *
   * @param data - The pet data to add.
   * @returns A promise that resolves with the response from the API.
   */
  public async addPet(data: any) {
    const request: any = {
      url,
      method: 'POST',
      data,
    }

    return super.post(request, { schema: petSchema })
  }

  /**
   * Updates an existing pet by sending a PUT request to the pets API.
   *
   * @param data - The updated pet data.
   * @returns A promise that resolves with the response from the API.
   */
  public async updatePetUsingPutMethod(data: any) {
    const request: any = {
      url,
      method: 'PUT',
      data,
    }

    return super.put(request, { schema: petSchema })
  }

  /**
   * Updates an existing pet by sending a POST request to the pets API.
   *
   * @param data - The updated pet data.
   * @returns A promise that resolves with the response from the API.
   */
  public async updatePetUsingPostMethod(data: any) {
    const request: any = {
      url,
      method: 'POST',
      data,
    }

    return super.post(request, { schema: petSchema })
  }

  /**
   * Finds pets by status by sending a GET request to the pets API.
   *
   * @param status - The status to filter pets by. Default is 'available'.
   * @returns A promise that resolves with the response from the API.
   */
  public async findPetsByStatus(status: string = 'available') {
    const request: any = {
      url: `${url}/findByStatus?status=${status}`,
      method: 'GET',
      // headers: {
      //   Authorization: `Bearer ${token.token}`,
      // },
    }

    return super.get(request, { schema: findByStatusSchema })
  }

  /**
   * Finds a pet by ID.
   *
   * @param petId - The ID of the pet to find.
   * @returns A promise that resolves with the response from the API.
   */
  public async findPetById(petId: number) {
    const request: any = {
      url: `${url}/${petId}`,
      method: 'GET',
    }

    return super.get(request, { schema: petSchema })
  }

  /**
   * Deletes a pet by ID.
   *
   * @param petId - The ID of the pet to delete.
   */
  public async deletePetById(petId: number) {
    const request: any = {
      url: `${url}/${petId}`,
      method: 'DELETE',
      'api-key': process.env.apiKey || 123, // api key needs to updated accordingly. We can generate api key once and use multiple times wherever needed
    }

    return super.delete(request, { schema: petSchema })
  }
}
