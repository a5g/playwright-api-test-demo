import { test, expect } from '../../../fixtures/auto.test'
import { petData } from '../../../data/pet/Pet.data'

/**
 * Tests for the Pet API.
 *
 * Contains tests for:
 * - Creating pets
 * - Finding pets by ID
 * - Updating pet
 * - Deleting pet
 *
 * The tests validate responses match expected values.
 */
test.describe('Pet API TESTS', () => {
  /**
   * Tests adding a new pet using the /pet endpoint and POST method.
   * Validates the response contains the expected pet data.
   */
  test('@P0 should add new pet [/pet]', async ({ petAPI }) => {
    const payload = petData.createRandomPet()
    const { data } = await petAPI.addPet(payload)

    expect(data.name).toEqual(payload.name)
    expect(data.photoUrls).toEqual(payload.photoUrls)
    expect(data.tags).toEqual(payload.tags)
    expect(data.status).toEqual(payload.status)
  })

  /**
   * Tests updating an existing pet using the /pet endpoint and PUT method.
   * Validates the response contains the updated pet data.
   */
  test('@P0 should update existing pet [/pet] put method', async ({
    petAPI,
  }) => {
    const payload = petData.createRandomPet()
    await petAPI.addPet(payload)

    payload.name = `updated_${payload.name}`
    const { data } = await petAPI.updatePetUsingPutMethod(payload)

    expect(data.name).toEqual(payload.name)
    expect(data.photoUrls).toEqual(payload.photoUrls)
    expect(data.tags).toEqual(payload.tags)
    expect(data.status).toEqual(payload.status)
  })

  /**
   * Tests getting pets with 'available' status using the /pet/findByStatus endpoint.
   * Validates the response data length is greater than 0.
   */
  test('@P0 should get available pets [/pet/findByStatus]', async ({
    petAPI,
  }) => {
    const status = 'available'
    const { data } = await petAPI.findPetsByStatus(status)
    expect(data.length).toBeGreaterThan(0)
  })

  /**
   * Tests getting pets with 'pending' status using the /pet/findByStatus endpoint.
   * Validates the response status is 200 and returned data length is greater than 0.
   */
  test('should get pending pets [/pet/findByStatus]', async ({ petAPI }) => {
    const status = 'pending'
    const { data, response } = await petAPI.findPetsByStatus(status)
    expect(response.status()).toBe(200)
    expect(data.length).toBeGreaterThan(0)
  })

  /**
   * Tests getting pets with 'sold' status using the /pet/findByStatus endpoint.
   * Validates the response data length is greater than 0.
   */
  test('should get sold pets [/pet/findByStatus]', async ({ petAPI }) => {
    const status = 'sold'
    const { data } = await petAPI.findPetsByStatus(status)
    expect(data.length).toBeGreaterThan(0)
  })

  /**
   * Tests getting a pet by ID (existing) using the /pet/{petId} endpoint.
   * Validates the returned pet ID matches the requested ID.
   */
  test('should get pet by id (existing) [/pet/{id}]', async ({ petAPI }) => {
    const petId = petData.commonPetId

    const { data } = await petAPI.findPetById(petId)
    expect(data.id).toEqual(petId)
  })

  /**
   * Tests getting a pet by ID using the /pet/{petId} endpoint.
   * Validates the returned pet ID matches the requested ID.
   */
  test('should get pet by id [/pet/{id}]', async ({ petAPI }) => {
    // const petId = 874346253
    const payload = petData.createRandomPet()
    const pet = await (await petAPI.addPet(payload)).data

    const { data } = await petAPI.findPetById(pet.id)
    expect(data.id).toEqual(pet.id)
  })

  /**
   * Tests updating an existing pet using the /pet POST endpoint.
   * Sends a request with pet data to update name, tags, etc.
   * Validates the response data matches the request.
   * Also does a GET request to validate the update persisted.
   */
  test('should update existing pet [/pet] post', async ({ petAPI }) => {
    const payload = petData.createRandomPet()
    await petAPI.addPet(payload)

    payload.name = `updated_${payload.name}`
    const { data } = await petAPI.updatePetUsingPostMethod(payload)

    expect(data.name).toEqual(payload.name)
    expect(data.photoUrls).toEqual(payload.photoUrls)
    expect(data.tags).toEqual(payload.tags)
    expect(data.status).toEqual(payload.status)
  })

  /**
   * Tests deleting a pet by ID using the /pet/{petId} endpoint.
   * Sends a delete request for the pet ID.
   * Validates the returned response is null.
   */
  test('@P0 should delete pet [/pet/{petId}]', async ({ petAPI }) => {
    const { data } = await petAPI.deletePetById(petData.commonPetId)
    expect(data).toBeNull()
  })
})
