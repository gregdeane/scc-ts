import { IScEnvironment } from './environment.model';
import { ENVIRONMENTS, DEFAULT_ENVIRONMENT } from './environment.constant';

describe('Constants', () => {
  let mock: any;

  beforeEach(setup);

  it('should contain the correct number of environments', () => {
    let names = Object.keys(ENVIRONMENTS);
    expect(names.length).toEqual(mock.environment.names.length, `ENVIRONMENTS does not contain the correct number of environments`);
  });

  it('should contain a correctly named object for each environment', () => {
    mock.environment.names.forEach((name: string) => {
      let env: IScEnvironment = ENVIRONMENTS[name];
      expect(env).toEqual(jasmine.any(Object), `${env.NAME} is not of type Object`);
      expect(env.NAME).toBe(name, `env.NAME: ${env.NAME} did not match name: ${name}`);
    });
  });

  it('should contain the correct number of environment properties', () => {
    mock.environment.names.forEach((name: string) => {
      let props = Object.keys(ENVIRONMENTS[name]);
      expect(props.length).toEqual(mock.environment.props.length, `${name} does not contain the correct number of properties`);
    });
  });

  it('should contain the correct properties for each environment', () => {
    mock.environment.names.forEach((name: string) => {
      let env: IScEnvironment = ENVIRONMENTS[name];
      mock.environment.props.forEach((prop: string) => {
        expect(env[prop]).toBeDefined(`${name} => ${prop} was not defined`);
      });
    });
  });

  it('should contain a default environment name', () => {
    expect(DEFAULT_ENVIRONMENT).toEqual(jasmine.any(String));
  });

  /////////////////////////////

  function setup(): void {
    mocks();
  }

  function mocks(): void {
    mock = {
      environment: {
        names: ['PRODUCTION', 'STAGE', 'INTEGRATION', 'DEVELOPMENT', 'LOCAL', 'TESTING'],
        props: [
          'NAME', 'URL', 'DOMAIN', 'PORT', 'USER_SERVICE', 'TOKEN_SERVICE',
          'MERCHANT_SERVICE', 'GOODDATA_SERVICE', 'MODULE_SERVICE', 'USER_SERVICE_NEW'
        ]
      }
    };
  }
});
