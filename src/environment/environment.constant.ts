import { IScEnvironments } from './environment.model';

export const DEFAULT_ENVIRONMENT = 'INTEGRATION';
export const ENVIRONMENTS: IScEnvironments = {
  PRODUCTION: {
    NAME: 'PRODUCTION',
    URL: 'https://www.solutions.zalando.com',
    DOMAIN: 'solutions.zalando.com',
    PORT: '',
    USER_SERVICE: 'https://user-management.norris.zalan.do',
    TOKEN_SERVICE: 'https://token-management.norris.zalan.do',
    MERCHANT_SERVICE: 'https://merchant-management.norris.zalan.do',
    GOODDATA_SERVICE: 'https://gooddata.norris.zalan.do',
    MODULE_SERVICE: 'https://module-service.norris.zalan.do',
    USER_SERVICE_NEW: 'https://user-service.norris.zalan.do'
  },
  STAGE: {
    NAME: 'STAGE',
    URL: 'https://sc-stage.norris.zalan.do',
    DOMAIN: '.zalan.do',
    PORT: '',
    USER_SERVICE: 'https://um-stage.norris.zalan.do',
    TOKEN_SERVICE: 'https://tm-stage.norris.zalan.do',
    MERCHANT_SERVICE: 'https://merchant-stage.norris.zalan.do',
    GOODDATA_SERVICE: 'https://gooddata-stage.norris.zalan.do',
    MODULE_SERVICE: 'https://ms-stage.norris.zalan.do',
    USER_SERVICE_NEW: 'https://us2-stage.norris.zalan.do'
  },
  INTEGRATION: {
    NAME: 'INTEGRATION',
    URL: 'https://sc-integration.norris.zalan.do',
    DOMAIN: '.zalan.do',
    PORT: '',
    USER_SERVICE: 'https://um-integration.norris.zalan.do',
    TOKEN_SERVICE: 'https://tm-integration.norris.zalan.do',
    MERCHANT_SERVICE: 'https://merchant-integration.norris.zalan.do',
    GOODDATA_SERVICE: 'https://gooddata-integration.norris.zalan.do',
    MODULE_SERVICE: 'https://ms-integration.norris.zalan.do',
    USER_SERVICE_NEW: 'https://us2-integration.norris.zalan.do'
  },
  DEVELOPMENT: {
    NAME: 'DEVELOPMENT',
    URL: 'https://sc-development.norris.zalan.do',
    DOMAIN: '.zalan.do',
    PORT: '',
    USER_SERVICE: 'https://um-development.norris.zalan.do',
    TOKEN_SERVICE: 'https://tm-development.norris.zalan.do',
    MERCHANT_SERVICE: 'https://merchant-development.norris.zalan.do',
    GOODDATA_SERVICE: 'https://gooddata-development.norris.zalan.do',
    MODULE_SERVICE: 'https://ms-development.norris.zalan.do',
    USER_SERVICE_NEW: 'https://us2-development.norris.zalan.do'
  },
  LOCAL: {
    NAME: 'LOCAL',
    URL: 'http://localhost',
    DOMAIN: 'localhost',
    PORT: 3333,
    USER_SERVICE: 'https://um-development.norris.zalan.do',
    TOKEN_SERVICE: 'https://tm-development.norris.zalan.do',
    MERCHANT_SERVICE: 'https://merchant-development.norris.zalan.do',
    GOODDATA_SERVICE: 'https://gooddata-development.norris.zalan.do',
    MODULE_SERVICE: 'https://ms-development.norris.zalan.do',
    USER_SERVICE_NEW: 'https://us2-development.norris.zalan.do'
  },
  TESTING: {
    NAME: 'TESTING',
    URL: '',
    DOMAIN: '',
    PORT: '',
    USER_SERVICE: '',
    TOKEN_SERVICE: '',
    MERCHANT_SERVICE: '',
    GOODDATA_SERVICE: '',
    MODULE_SERVICE: '',
    USER_SERVICE_NEW: ''
  }
};
