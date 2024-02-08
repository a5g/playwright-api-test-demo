import { test, expect } from '../../../fixtures/auto.test'
import config from '../../../config'
import { storeData } from '../../../data/store/Store.data'

const list = [1, 2, 3, 4, 5]

/**
 * Tests for the Store API.
 *
 * Contains tests for:
 * - Creating orders
 * - Finding orders by ID
 * - Getting inventory
 *
 * The tests validate responses match expected values.
 */
test.describe('Store API TESTS', () => {
  /**
   * Tests creating a new order via the store API.
   */
  test('@P0 should create new order [/store/order]', async ({ storeAPI }) => {
    const payload = storeData.createRandomOrder()
    const { data } = await storeAPI.createOrder(payload)

    expect(data.id).not.toEqual(payload.id)
    expect(data.petId).toEqual(payload.petId)
    expect(data.status).toEqual(payload.status)
    expect(data.complete).toEqual(payload.complete)
  })

  /**
   * Create multiple orders
   * Loops through the provided list and creates a new test case
   * for each item, validating the order data matches the request.
   */
  list.forEach((i) => {
    test(`@P1 should create new order [${i}]`, async ({ storeAPI }) => {
      const payload = storeData.createRandomOrder()
      const { data } = await storeAPI.createOrder(payload)

      expect(data.id).not.toEqual(payload.id)
      expect(data.petId).toEqual(payload.petId)
      expect(data.status).toEqual(payload.status)
      expect(data.complete).toEqual(payload.complete)
    })
  })

  /**
   * Validate order data returned from the API matches the request for a given order ID.
   */
  test('@P0 should find order by id [/store/order/{id}]', async ({
    storeAPI,
  }) => {
    const payload = storeData.createRandomOrder()
    const d = await (await storeAPI.createOrder(payload)).data
    const { data } = await storeAPI.findOrderById(d.id)

    expect(data.id).toEqual(d.id)
    expect(data.petId).toEqual(payload.petId)
    expect(data.status).toEqual(payload.status)
  })

  /**
   * Tests getting store inventory.
   */
  test('should get store inventory [/store/inventory]', async ({
    storeAPI,
  }) => {
    const { data } = await storeAPI.getInventory()
    expect(data.sold).toBeGreaterThan(0)
    expect(data.available).toBeGreaterThan(0)
    expect(data.pending).toBeGreaterThan(0)
    expect(data.sold).toBeGreaterThan(0)
  })

  /**
   * Tests deleting an order by ID.
   */
  test('should delete order by id [/store/order/{id}]', async ({
    storeAPI,
  }) => {
    const payload = storeData.createRandomOrder()
    const d = await (await storeAPI.createOrder(payload)).data

    await storeAPI.deleteOrderById(d.id)
  })

  /**
   * Tests deleting an order by ID.
   * Calling the DELETE method directly on the API.
   * Validates the response status is 400.
   * A false positive test case
   */
  test('@P0 should fail to delete order by wrong id [/store/order/{id}]', async ({
    api,
  }) => {
    const url = `${config[config.ENVIRONMENT].apiHost}/store`
    const id = 10
    const request: any = {
      url: `${url}/order/${id}`,
      method: 'DELETE',
    }
    const { data, response } = await api.delete(request, { apiToFail: true })
    expect(data.message).toEqual('Order Not Found')
    expect(response.status()).toBe(404)
  })
})
