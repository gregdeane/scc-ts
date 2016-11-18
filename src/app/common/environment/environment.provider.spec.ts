import { DEFAULT_ENVIRONMENT } from './environment.constant';

describe('ScEnvironments', () => {
  let ScEnvironmentsProvider: any;
  let mock: any;

  beforeEach(setup);

  /**
   * setCurrentEnvironment()
   */
  describe('setCurrentEnvironment', () => {
    it('should set environment based on valid environment string', () => {
      mock.environment.names.forEach((name: string) => {
        let env = ScEnvironmentsProvider.setCurrentEnvironment(name);
        expect(env.NAME).toBe(name);
      });
    });

    it('should set environment based on custom config', () => {
      let fake = getFakeMock('PRODUCTION');
      let env = ScEnvironmentsProvider.setCurrentEnvironment(fake);
      expect(env.NAME).toBe(fake.NAME);
      expect(env.CUSTOM_VALUE).toBe(true);
    });

    it('should set LOCAL environment if custom config `NAME` contains "$" sign', () => {
      let fake = getFakeMock('${NAME}');
      let env = ScEnvironmentsProvider.setCurrentEnvironment(fake);
      expect(env.NAME).toBe('LOCAL');
    });

    it('should set default environment if custom config `NAME` is an empty string', () => {
      let fake = getFakeMock('');
      let env = ScEnvironmentsProvider.setCurrentEnvironment(fake);
      expect(env.NAME).toBe(DEFAULT_ENVIRONMENT);
    });

    it('should set default environment if invalid environment value is passed', () => {
      mock.environment.invalid.forEach((invalid: string) => {
        let env = ScEnvironmentsProvider.setCurrentEnvironment(invalid);
        expect(env.NAME).toBe(DEFAULT_ENVIRONMENT);
      });
    });
  });

  /**
   * getCurrentEnvironment()
   */
  describe('getCurrentEnvironment', () => {
    it('should return default environment if environment has not been set', () => {
      let env = ScEnvironmentsProvider.getCurrentEnvironment();
      expect(env.NAME).toBe(DEFAULT_ENVIRONMENT);
    });

    it('should return specific environment if it was previously set', () => {
      ScEnvironmentsProvider.setCurrentEnvironment('STAGE');
      let env = ScEnvironmentsProvider.getCurrentEnvironment();
      expect(env.NAME).toBe('STAGE');
    });
  });

  /**
   * getSpecificEnvironment()
   */
  describe('getSpecificEnvironment', () => {
    it('should return specific environment if valid environment string is passed', () => {
      let env = ScEnvironmentsProvider.getSpecificEnvironment('INTEGRATION');
      expect(env.NAME).toBe('INTEGRATION');
    });

    it('should return default environment if invalid environment is passed', () => {
      mock.environment.invalid.forEach((invalid: string) => {
        let env = ScEnvironmentsProvider.getSpecificEnvironment(invalid);
        expect(env.NAME).toBe(DEFAULT_ENVIRONMENT);
      });
    });
  });

  /////////////////////////////

  function setup(): void {
    mocks();
    modules();
    injectors();
  }

  function modules(): void {
    angular.mock.module('common');
  }

  function injectors(): void {
    angular.mock.inject(($injector: any) => {
      ScEnvironmentsProvider = $injector.get('ScEnvironments');
    });
  }

  function mocks(): void {
    mock = {
      environment: {
        names: ['PRODUCTION', 'STAGE', 'INTEGRATION', 'DEVELOPMENT', 'LOCAL', 'TESTING'],
        invalid: [{}, [], 2, '@', null, undefined, 1.2, true, false]
      }
    };
  }

  function getFakeMock(env: string): any {
    return {
      NAME: env,
      CUSTOM_VALUE: true
    };
  }
});
