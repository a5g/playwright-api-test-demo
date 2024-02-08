import { APIRequestContext } from '@playwright/test'
import { API } from './index'
import orderSchema from '../json-schema/store/order.json'
import { utils } from '../utils/utils'

const url = `${utils.apiHost}/store`

export class StoreAPI extends API {
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
   * Creates a new order.
   *
   * @param data - The order data to create.
   * @returns A promise that resolves to the created order.
   */
  public async createOrder(data: any) {
    const request: any = {
      url: `${url}/order`,
      method: 'POST',
      data,
    }

    return super.post(request, { schema: orderSchema })
  }

  /**
   * Finds an order by ID.
   *
   * @param id - The ID of the order to find.
   * @returns A promise that resolves to the order, if found.
   */
  public async findOrderById(id: number) {
    const request: any = {
      url: `${url}/order/${id}`,
      method: 'GET',
    }
    return super.get(request, { schema: orderSchema })
  }

  /**
   * Gets the store's inventory.
   *
   * @returns A promise that resolves to the inventory.
   */
  public async getInventory() {
    const request: any = {
      url: `${url}/inventory`,
      method: 'GET',
    }
    return super.get(request)
  }

  public async deleteOrderById(id: number) {
    const request: any = {
      url: `${url}/order/${id}`,
      method: 'DELETE',
    }
    return super.delete(request)
  }
}
