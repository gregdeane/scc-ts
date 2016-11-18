import { ENVIRONMENTS, DEFAULT_ENVIRONMENT } from './environment/environment.constant';
import ScEnvironmentService from './environment/environment.provider';

const CommonModule = angular.module('common', [])
  .constant('DEFAULT_ENVIRONMENT', DEFAULT_ENVIRONMENT)
  .constant('ENVIRONMENTS', ENVIRONMENTS)
  .provider('ScEnvironments', [ScEnvironmentService]);

export default CommonModule.name;
