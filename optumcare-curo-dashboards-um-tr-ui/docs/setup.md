# Setup
[//]: # (This page provides information about how to run, deploy, and build applications and packages in the turbo repo)

***

## Prerequisites
[//]: # (List any secure/git accesses, credentials, libraries, and software that applications and packages in the turbo repo relies on)

- Install [Node.js (v14) for mac](https://nodejs.org/download/release/latest-v14.x/node-v14.19.0.pkg)
- Recommended upgrade to NPM v7 or higher

***

## Configuring the Component
[//]: # (List steps for getting the applications and packages in the turbo repo configured locally)

* Clone the [Turbo UI Project](https://github.com/optum-ecp/turbo-ui-starter) to your local machine.

* Open the project in an IDE

### Configure IDE

- [Setup - Intellij IDEA ](https://github.optum.com/ecp/angular-ui-component-library/blob/beta/docs/local-setup/idea_ts_setup.md)
- Visual Studio Code Plugins:
  - [Angular Template](https://marketplace.visualstudio.com/items?itemName=Angular.ng-template)
  - [Cucumber Support](https://marketplace.visualstudio.com/items?itemName=alexkrechik.cucumberautocomplete)
  - [SonarLint](https://marketplace.visualstudio.com/items?itemName=SonarSource.sonarlint-vscode)
  - [TSLint](https://marketplace.visualstudio.com/items?itemName=ms-vscode.vscode-typescript-tslint-plugin)
  - [Code Spell Checker](https://marketplace.visualstudio.com/items?itemName=streetsidesoftware.code-spell-checker)
  - [SCSS Formatter](https://marketplace.visualstudio.com/items?itemName=sibiraj-s.vscode-scss-formatter)

### Configure the Application

* Go to project folder and install dependencies:

```sh
npm i
```

***

## Building the Component
[//]: # (List steps for building the component)

The app based on [Angular 11](https://angular.io/) using [HTML5](http://whatwg.org/html), [TypeScript](http://www.typescriptlang.org) and [Sass](http://sass-lang.com).

### NPM scripts

Task automation based on [NPM scripts](https://docs.npmjs.com/misc/scripts).

| Task                                | Description                                                                                                                       |
|-------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------|
| `ng`                                | Pass-through to run an `ng` (Angular CLI) command                                                                                 |
| `start`                             | Run development server on `http://localhost:4200/`                                                                                |
| `start:dev`                         | Run development server on `http://localhost:4200/` with hot-swapping for @clinical/@ecp dependencies                              |
| `build`                             | Build web app for production in `dist/` folder                                                                                    |
| `test`                              | Local unit tests, ran once using `Chrome`, same command as `Jenkins`                                                              |
| `test:dev`                          | Local unit tests watching for code changes in `Chrome`                                                                            |
| `test:e2e`                          | `Jenkins` - Run e2e tests using [Cypress](https://docs.cypress.io/guides/overview/why-cypress)                                    |
| `cypress:open`                      | Open Cypress locally, requires server to be started already, recommend browser `Electron`                                         |
| `cypress:run `                      | Run Cypress locally headless, requires server to be started already                                                               |
| `cypress:ci`                        | Jenkins - Run development server and run cypress headless, `Jenkins` random port via `PORT_E2E`                                   |
| `cypress:ci:dev`                    | Jenkins - Run Cypress headless with `cypress/configs/cypress.dev.json` configuration                                              |
| `cypress:ci:test`                   | Jenkins - Run Cypress headless with `cypress/configs/cypress.test.json` configuration                                             |
| `cypress:ci:stage`                  | Jenkins - Run Cypress headless with `cypress/configs/cypress.stage.json` configuration                                            |
| `cypress:ci:trn`                    | Jenkins - Run Cypress headless with `cypress/configs/cypress.trn.json` configuration                                              |
| `build:single-spa:scheduling-ui` | Single spa build, used to [run docker locally](#running-docker-locally)                                                           |
| `serve:single-spa:scheduling-ui` | Single spa serve, used to [run with root-spa-ui locally](https://ocm-docs.optum.com/docs/engineering/single-spa/#running-locally) |

When building the application, you can specify the target configuration using the additional flag `--configuration <name>` (do not forget to prepend `--` to pass arguments to npm scripts, like so: `-- --configuration <name>`).

Supported configurations:
- local
- dev
- prod

***

## Running the Component
[//]: # (List steps for running this component locally)

* Launch development server, and open `localhost:4200` in your browser:

```sh
npm start
```

* This will launch the app and login with `MSID` using `auth-library` automatically. You may be asked to select a role.

> **Note:** When running with no configuration specified, the `environment.ts` file is used, which contains the same environment variables as dev but can be customized for local development.

***

## Deploying the Component
[//]: # (List steps for deploying the component)
Use the [Github Actions](https://github.com/optum-ecp/turbo-ui-starter/actions) to deploy.

***

## Integrating the Component
[//]: # (List steps for using this component in another service or instance)

### Testing

> **Note:** All available endpoints are listed in the Environments section of the Overview documentation.
