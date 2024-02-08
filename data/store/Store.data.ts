// import fs from 'fs'
import { faker } from '@faker-js/faker'

/**
 * User type with all the required fields for user creation
 */
type Order = {
  id: number
  petId: number
  quantity: number
  shipDate: Date
  status: string
  complete: boolean
}

export class StoreData {
  /**
   * Creates a random store object with fake data for testing.
   */
  createRandomOrder(): Order {
    return {
      id: 0,
      petId: faker.number.int({ min: 1, max: 50 }),
      quantity: faker.number.int({ min: 1, max: 10 }),
      shipDate: faker.date.past(),
      status: 'placed',
      complete: true,
    }
  }

  /**
   * Returns a common test order object.
   */
  getCommonOrder(): Order {
    return {
      id: 0,
      petId: faker.number.int({ min: 1, max: 50 }),
      quantity: faker.number.int({ min: 1, max: 10 }),
      shipDate: faker.date.past(),
      status: 'placed',
      complete: true,
    }
  }
}

const storeData = new StoreData()

export { storeData }
