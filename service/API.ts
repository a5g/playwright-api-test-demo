import { APIRequestContext, expect } from '@playwright/test'
import config from '../config'

const Ajv = require('ajv')

export class API {
  request: APIRequestContext

  constructor(request: APIRequestContext) {
    this.request = request
  }

  getcURL(options: any) {
    let curl = ''

    curl += `curl -X ${options.method} `
    curl += `'${options.url}'`

    // add common headers
    if (config.extraHTTPHeaders) {
      Object.keys(config.extraHTTPHeaders).forEach((header) => {
        curl += `\n -H '${header}: ${config.extraHTTPHeaders[header]}'`
      })
    }

    // add request specific headers
    if (options.headers) {
      Object.keys(options.headers).forEach((header) => {
        curl += `\n -H '${header}: ${options.headers[header]}'`
      })
    }

    if (options.data) {
      curl += `\n -d '${JSON.stringify(options.data)}'`
    }

    return curl
  }

  printcURL(options: any) {
    console.log(
      `Request:\n----------------------------------\n${this.getcURL(options)}`,
    )
  }

  printResponse(response: any) {
    console.log(`\n\nResponse:\n----------------------------------`)
    console.log(`Response Time: ${response.time}`)
    console.log(`Status Code: ${response.status}`)
    console.log(`Status Text: ${response.statusText}`)
    console.log(`Body: ${JSON.stringify(response.data, null, 2)}`)
    console.log(`\n--------------- END OF DATA ---------------\n\n`)
  }

  public verifySchema(schema: any, data: any) {
    const ajv = new Ajv({ allErrors: true })
    const validate = ajv.compile(schema)
    const valid = validate(data)

    if (!valid) {
      console.log(
        `\n\nSchema Validation Error\n----------------------------------`,
      )
      console.log(validate.errors)
      expect(valid).toBeTruthy()
    }
  }

  public millisecondsToSeconds(time: number) {
    return time > 1000 ? `${(time / 1000).toFixed(2)}s` : `${time}ms`
  }

  public async get(options: any, { apiToFail = false, schema = {} } = {}) {
    this.printcURL(options)

    const start = new Date().getTime()
    const response = await this.request.get(options.url, {
      headers: options.headers,
      data: options.data,
    })

    return this.validation(start, response, apiToFail, schema)
  }

  public async post(options: any, { apiToFail = false, schema = {} } = {}) {
    this.printcURL(options)

    const start = new Date().getTime()
    const response = await this.request.post(options.url, {
      headers: options.headers,
      data: options.data,
    })

    return this.validation(start, response, apiToFail, schema)
  }

  public async put(options: any, { apiToFail = false, schema = {} } = {}) {
    this.printcURL(options)

    const start = new Date().getTime()
    const response = await this.request.put(options.url, {
      headers: options.headers,
      data: options.data,
    })

    return this.validation(start, response, apiToFail, schema)
  }

  public async delete(options: any, { apiToFail = false, schema = {} } = {}) {
    this.printcURL(options)

    const start = new Date().getTime()
    const response = await this.request.delete(options.url, {
      headers: options.headers,
      data: options.data,
    })

    return this.validation(start, response, apiToFail, schema)
  }

  public async validation(
    start: number,
    response: any,
    apiToFail: boolean,
    schema: any,
  ) {
    const timeTaken = new Date().getTime() - start

    let data

    try {
      data = await response.json()
    } catch (e) {
      data = ''
    }

    this.printResponse({
      time: this.millisecondsToSeconds(timeTaken),
      status: response.status(),
      statusText: response.statusText(),
      data,
    })

    if (!apiToFail) {
      expect(response.ok()).toBeTruthy()
    } else {
      expect(response.ok()).not.toBeTruthy()
    }

    if (Object.keys(schema).length > 0) {
      this.verifySchema(schema, data)
    }

    return { response, data }
  }
}
