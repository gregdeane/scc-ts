import '../src/vendor';
import 'angular-mocks';

// this line removes the `import` requirement in spec files.
// i.e. you no longer need to include `app.module` in any spec files.
import '../src/app/app.module';

const appContext = (<any>require).context('../src', true, /\.spec\.ts/);
appContext.keys().forEach(appContext);
