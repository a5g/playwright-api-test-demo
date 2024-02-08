import cnfg from '../config'

export class Utils {
  config() {
    return cnfg[cnfg.ENVIRONMENT]
  }

  get apiHost() {
    return cnfg[cnfg.ENVIRONMENT].apiHost
  }
}

const utils = new Utils()

export { utils }
