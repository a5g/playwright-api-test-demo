// import fs from 'fs'
import { faker } from '@faker-js/faker'

type Category = {
  id: number
  name: string
}

/** PhotoUrls type for pet photos */
type PhotoUrls = string[]

/** Tags type for pet tags */
type Tags = {
  id: number
  name: string
}

/**
 * User type with all the required fields for user creation
 */
type Pet = {
  id: number
  category: Category
  name: string
  photoUrls: PhotoUrls
  tags: Tags[]
  status: string
}

export class PetData {
  petNames: string[]

  /**
   * Initializes the petNames array with common pet names.
   */
  constructor() {
    this.petNames = ['doggie', 'kitty', 'puppy', 'cat', 'fish', 'bird', 'horse']
  }

  /**
   * Creates a random pet object with fake data for testing.
   */
  createRandomPet(): Pet {
    return {
      id: 0,
      name: this.petNames[
        faker.number.int({ max: this.petNames.length - 1, min: 0 })
      ],
      category: {
        id: 0,
        name: 'string',
      },
      photoUrls: [faker.image.url()],
      tags: [
        {
          id: 0,
          name: 'demo',
        },
      ],
      status: 'available',
    }
  }

  /**
   * Returns a common test pet object.
   */
  getCommonPet(): Pet {
    return {
      id: this.commonPetId,
      name: 'doggie',
      category: {
        id: 0,
        name: 'string',
      },
      photoUrls: ['string'],
      tags: [
        {
          id: 0,
          name: 'string',
        },
      ],
      status: 'available',
    }
  }

  /**
   * Returns a common pet id.
   */
  get commonPetId() {
    return 9223372036854252000
  }
}

const petData = new PetData()

export { petData }
