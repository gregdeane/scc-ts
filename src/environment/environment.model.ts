export interface IScEnvironment {
  NAME: string;
  URL: string;
  DOMAIN: string;
  PORT?: string;
  USER_SERVICE?: string;
  TOKEN_SERVICE?: string;
  MERCHANT_SERVICE?: string;
  GOODDATA_SERVICE?: string;
  MODULE_SERVICE?: string;
  USER_SERVICE_NEW?: string;
}

export interface IScEnvironments {
  [propName: string]: IScEnvironment;
}

export interface IScEnvironmentsProvider {
  getCurrentEnvironment(): IScEnvironment;
  getSpecificEnvironment(name: string): IScEnvironment;
  setCurrentEnvironment(env: string|IScEnvironment): IScEnvironment;
}
