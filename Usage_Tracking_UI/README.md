# UX Aspects Seed - Micro Focus Theme

This is a starter project, suitable for building a new Micro Focus branded application using [UX Aspects](https://uxaspects.github.io/UXAspects). Since it is built with Angular CLI, it is easy to extend with new pages and components. It is configured as a hybrid application, allowing use of both Angular and AngularJS components.

## Getting Started

1. Ensure that the `@micro-focus` scope has been configured in NPM. This is a one-time setup task. **Note:** If the internal NPM registry is not accessible from your network, please contact us and we will be glad to provide the required packages along with instructions for use.

2. Clone the repository.
````bash
git clone git@github.houston.softwaregrp.net:caf/ux-aspects-micro-focus-seed.git my-project
````

3. Switch to the directory which was downloaded.

4. Install the dependencies.
````bash
npm install
````

5. Build the project and start the development server. This will automatically rebuild when source changes are made.
````bash
ng serve
````

6. The documentation site is hosted at http://localhost:4200/. This will automatically reload when changes are made.

Design guidelines for Micro Focus applications are available at [everythingux.net](http://everythingux.net/styleguide/overview/get-started/).

## Using Angular Components

To use an Angular component from UX Aspects it first must be imported into your application. You must identify the appropriate module to import which can be found in the `Usage` dropdown on the top right of the component's documentation. For example, if we want to use the Dashboard component you need to add the following to your application:

```
import { DashboardModule } from '@ux-aspects/ux-aspects';

@NgModule({
    imports: [
        DashboardModule
    ]
})
export class ExampleModule {}
```

## Using AngularJS Components

The seed project is a hybrid application which enables us to use AngularJS components in our Angular application. A complete guide on upgrading components can be [found here](https://github.com/UXAspects/UXAspects/blob/develop/guides/angular-upgrade-guide.md).

### Upgrading Services

To upgrade a service you can simply add a new entry to the providers section of your module. If we wanted to upgrade the `$navigationMenu` service we can use the following code:

```
providers: [{
    provide: '$navigationMenu',
    useFactory: (injector: Injector) => injector.get('$navigationMenu'),
    deps: ['$injector']
}]
```

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component.

You can find all possible generation options in the table below:

Scaffold  | Usage
---       | ---
[Component](https://github.com/angular/angular-cli/wiki/generate-component) | `ng g component my-new-component`
[Directive](https://github.com/angular/angular-cli/wiki/generate-directive) | `ng g directive my-new-directive`
[Pipe](https://github.com/angular/angular-cli/wiki/generate-pipe)           | `ng g pipe my-new-pipe`
[Service](https://github.com/angular/angular-cli/wiki/generate-service)     | `ng g service my-new-service`
[Class](https://github.com/angular/angular-cli/wiki/generate-class)         | `ng g class my-new-class`
[Guard](https://github.com/angular/angular-cli/wiki/generate-guard)         | `ng g guard my-new-guard`
[Interface](https://github.com/angular/angular-cli/wiki/generate-interface) | `ng g interface my-new-interface`
[Enum](https://github.com/angular/angular-cli/wiki/generate-enum)           | `ng g enum my-new-enum`
[Module](https://github.com/angular/angular-cli/wiki/generate-module)       | `ng g module my-module`

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io). Tests are implemented alongside each component in the corresponding `.spec.ts` file.

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/). End-to-end tests are implemented in the e2e directory, found at the project root.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## License

UX Aspects code is released under the Apache 2.0 License.