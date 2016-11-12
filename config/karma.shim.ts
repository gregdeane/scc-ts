import '../src/vendor';
import 'angular-mocks';

const appContext = (<any>require).context('../src', true, /\.spec\.ts/);
appContext.keys().forEach(appContext);
