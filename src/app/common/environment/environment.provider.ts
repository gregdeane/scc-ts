import { IServiceProvider } from 'angular';
import { IScEnvironment, IScEnvironmentsProvider } from './environment.model';
import { ENVIRONMENTS, DEFAULT_ENVIRONMENT } from './environment.constant';

class ScEnvironments implements IServiceProvider {
  private defaultEnvironment: IScEnvironment;
  private localEnvironment: IScEnvironment;
  private environment: IScEnvironment;

  constructor() {
    this.defaultEnvironment = ENVIRONMENTS[DEFAULT_ENVIRONMENT];
    this.localEnvironment = ENVIRONMENTS['LOCAL'];
  }

  private getCustomEnvironment(env?: IScEnvironment): IScEnvironment {
    let name = (env && env.NAME) || '';
    let dollar = name.indexOf('$') === -1;
    let custom = name.length && dollar && env;
    let local = name.length && !dollar && this.localEnvironment;

    return custom || local || this.defaultEnvironment;
  }

  private getNamedEnvironment(name: string): IScEnvironment {
    return ENVIRONMENTS[name] || this.defaultEnvironment;
  }

  private getCurrentEnvironment(): IScEnvironment {
    return this.environment || this.defaultEnvironment;
  }

  private getSpecificEnvironment(name?: string): IScEnvironment {
    return (name && this.getNamedEnvironment(name)) || this.defaultEnvironment;
  }

  private setCurrentEnvironment(env: string|IScEnvironment): IScEnvironment {
    this.environment = (typeof env === 'string' && this.getNamedEnvironment(env)) || this.getCustomEnvironment(<IScEnvironment>env);
    return this.environment;
  }

  $get(): IScEnvironmentsProvider {
    return {
      getCurrentEnvironment: (): IScEnvironment => {
        return this.getCurrentEnvironment();
      },
      getSpecificEnvironment: (name: string): IScEnvironment => {
        return this.getSpecificEnvironment(name);
      },
      setCurrentEnvironment: (env: string|IScEnvironment): IScEnvironment => {
        return this.setCurrentEnvironment(env);
      }
    };
  }
}

export default ScEnvironments;
