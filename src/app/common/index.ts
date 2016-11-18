import ScEnvironments from './environment/environment.provider';

const CommonModule = angular.module('common', [])
  .provider(ScEnvironments.name, ScEnvironments);

export default CommonModule.name;
