import { ENVIRONMENTS, DEFAULT_ENVIRONMENT } from './environment.constant';

describe('Constants', () => {

  beforeEach(setup);

  /////////////////////////////

  function setup(): void {
    modules();
  }

  function modules(): void {
    angular.mock.module('solutioncenter.communicator');
  }
});
