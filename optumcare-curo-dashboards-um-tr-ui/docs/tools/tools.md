# Netra AI Tools

Netra AI provides a set of tools to help keep your repository up to date. The tools are available through the command line interface (CLI) and can be used to perform various tasks on your monorepo.

- [Netra AI Tools](#netra-ai-tools)
  - [Usage](#usage)
  - [Tools](#tools)
    - [Update Netra AI](#update-netra-ai)
    - [Create turbo application](#create-turbo-application)
    - [Create an npm module](#create-an-npm-module)
    - [Add storybook](#add-storybook)
    - [Health check](#health-check)
      - [Check Jest config](#check-jest-config)
      - [Check TypeScript config](#check-typescript-config)
      - [Check Governance config](#check-governance-config)
      - [Clean packages](#clean-packages)
      - [Update docs](#update-docs)

## Usage

There is no manually installation required for the tools. Running the `npx` command will automatically download the latest version of the tools and run it.

```bash
npx @uhg-netra-ai/netra-ai-tools@latest netra-ai
```

The tools will be downloaded and executed. The tools will prompt you to select the tool you want to run.

## Tools

### Update Netra AI

This command will update the Netra AI to the latest version of netra.

### Create turbo application

Creates a new turbo application that will be added to the `apps` folder. It can then be run using the `turbo dev` command.

```bash
npx turbo run dev --filter <app-name>
```

### Create an npm module

Creates an npm module that can be published to the npm registry. The module will be created in the `packages` folder.

This will also walk you though the process of setting up a release strategy for the module. You can either choose to manually release the module or use the `semantic-release` package to automatically release the module using a semantic release commit message.

### Add storybook

Some projects require storybook to be added to the project. Running this command will add all the necessary config files, install storybook, and add the `storybook` script to the `package.json` file to start a dev server.

### Health check

The health check command will check the project for any issues that may be present and/or update configuration files.

You can run all of the health checks by choosing "Check Everything" or, you can select one or more of the below checks.

**Note:** Some commands have additional prompts that you will need to answer.

#### Check Jest config

This will make sure all your apps and packages have the correct Jest configuration setup in order to run tests.

#### Check TypeScript config

This will make sure all your apps and packages have the correct TypeScript configuration setup in order build/edit/manage the project.

#### Check Governance config

This will make sure your repository has the correct governance configuration setup in order to test governance locally before pushing to the repository.

This will add 4 commands that you can run to test governance locally:

```bash
# This will attempt to fix any auto-fixable issues supported by eslint and prettier
# This command will run the two other commands added: npm run eslint:fix && npm run prettier:fix
npm run format

# This will run the linter on the project and output any issues
npm run eslint
```

#### Clean packages

This will remove packages that are not longer needed in the `packages` folder.

#### Update docs

This will update all the documentation in the `docs` folder to the latest documentation available in the repository.
