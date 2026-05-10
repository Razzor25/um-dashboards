# Monorepo Semantic Release

This document describes how to setup semantic release for a monorepo.

- [Monorepo Semantic Release](#monorepo-semantic-release)
  - [Prerequisites](#prerequisites)
  - [Setup](#setup)
    - [Add the dependencies](#add-the-dependencies)
    - [Add the release config](#add-the-release-config)
    - [Adding the GitHub workflow](#adding-the-github-workflow)
    - [Updating the `tsconfig.json` or `tsconfig.lib.json`](#updating-the-tsconfigjson-or-tsconfiglibjson)
  - [Doing a release](#doing-a-release)
  - [Convert a repo to semantic release that already has releases](#convert-a-repo-to-semantic-release-that-already-has-releases)
  - [References](#references)

## Prerequisites

1. You have a basic understanding of how to create a library. (See: the [README](./README.md) for more information).
2. Your project is a monorepo, this means that you have multiple `package.json` files in the same repository.
3. You have a GitHub repository setup for your project, as tags are used to determine the version of the package that will be released.
4. You have a `package.json` file in the root of your project that contains a `workspaces` field that lists all the packages in the monorepo.
5. Your `package.json` doesn't contain the `private` field.
6. Your project should no longer link to other files outside of the package using relative paths.
   - You will need to change it to import from `node_modules` instead.
   - Example: `import { Button } from '@uhg-netra-ai/other-package/button';` instead of `import { Button } from '../../../ui/button';`
     - Possible fixes:
       - Convert the other project into a package as well (e.g. `@uhg-netra-ai/other-package`).
       - Move the imported file into the same package.

## Setup

### Add the dependencies

In your root `package.json` (The one containing the `workspaces`), add the following packages by running the following command:

```bash
npm i -D semantic-release semantic-release-monorepo @semantic-release/changelog
```

### Add the release config

For each module that will be released via semantic-release, add a `release.config.mjs`. This file should be a sibling of the `package.json` file for the module you are releasing. The Github workflow will look for the `release.config.{mjs,cjs,js}` to determine if this folder should be released.

Here is an example of what the directory structure could look like (The `packages` directory is the most important part of this structure):

```plaintext
├── package.json
├── tsconfig.base.json
├── packages
│   ├── example-module
│   │   ├── package.json
│   │   ├── release.config.mjs
│   │   ├── tsconfig.json
│   │   └── src
│   │       ├── entry-1.ts
│   │       └── entry-2.ts
│   └── another-module
│       ├── package.json
│       ├── release.config.mjs
│       ├── tsconfig.json
│       └── src
│           ├── entry-1.ts
│           └── entry-2.ts
```

the `release.config.mjs` should look like the code below:

> [!TIP]
>
> You will need to change the `pkgRoot` to the path in which the package you are releasing is located (after it was built from TypeScript to JavaScript). This is a relative path from the `release.config.mjs` file.

```js
import { makeUploadCommand, makePackCommand, semanticReleaseNpm } from '@uhg-netra-ai/netra-ai-tools/jfrog/cli';

export default {
  extends: 'semantic-release-monorepo',
  plugins: [
    [
      '@semantic-release/commit-analyzer',
      {
        preset: 'angular',
        releaseRules: [{ scope: 'storybook', release: false }],
      },
    ],
    '@semantic-release/release-notes-generator',
    [
      '@semantic-release/changelog',
      {
        changelogFile: 'docs/CHANGELOG.md',
      },
    ],
    [
      '@semantic-release/github',
      {
        assets: ['docs/CHANGELOG.md'],
      },
    ],
    ...semanticReleaseNpm(['dist/example-module']),
    [
      '@semantic-release/exec',
      {
        publishCmd: [
          // Creates a tarball for each package that will be published to Artifactory
          ...makePackCommand(['dist/example-module']),
          // Upload each package tarball to Artifactory
          makeUploadCommand('<artifactory-id>', '@uhg-example', 'example-module', 'dist/example-module'),
        ].join(' && '),
      },
    ],
  ],
  branches: [{ name: 'beta', prerelease: true }, { name: '+([0-9])?(.{+([0-9]),x}).x', channel: 'latest' }, { name: 'main' }],
};
```

### Adding the GitHub workflow

In order for GitHub to release the package, you will need to add a GitHub workflow to the `default` branch, this is usually `main`. This workflow will then run every time code is merged into the `main`, `beta`, or any `*.x` branch, or however you decide to trigger the workflow. Here are some common options:

- On push to `main`, `beta`, or any `*.x` branch.
- On a schedule (e.g. every day at midnight).
- Manually via the GitHub Actions UI.

Create a new file in the `.github/workflows` directory called `mono-repo-semantic-release-ci.yml` (or whatever you want to name it) and add the following code. This current workflow will run on push to `main`, `beta`, or any `*.x` branch. Modify the `on` section to change how you want to trigger the workflow.

Create a script in your `package.json` (not the root, but the one in the package you are releasing) called `publish-semantic-release` that runs `semantic-release`:

```json
{
  "scripts": {
    "publish-semantic-release": "npx semantic-release"
  }
}
```

> [!TIP]
>
> You can change the name of `run-name` to whatever you want to call the workflow. This is what will be displayed for each individual run of the workflow.
>
> This will display as `Publish main to NPM` in the GitHub Actions UI under the `Publish NPM Package via Semantic Release` workflow.

**Note:** Replace anything in `<angle-brackets>` with your actual values.

```yaml
name: Publish Packages
run-name: Publish ${{ github.ref_name }} to Artifactory

on:
  push:
    branches:
      - main
      - beta
      - '*.x'

jobs:
  release-npm-package:
    uses: optum-ecp/ecp-actions-workflows/.github/workflows/turbo-repo-ci-package.yml@main
    with:
      jfrog-project-key: <artifactory-id>
      custom-publish-script: publish:packages
    secrets: inherit
```

### Updating the `tsconfig.json` or `tsconfig.lib.json`

In your `tsconfig.json` or `tsconfig.lib.json` file, you will need set up the `outDir` to be the to match that of the `pkgRoot` in the `release.config.mjs` file. This is the path to the built JavaScript files that will be released.

Here is a good starting point for the `tsconfig.json` file:

```json
{
  "extends": "../../tsconfig.base.json",
  "compilerOptions": {
    "strict": true,
    "jsx": "react-jsx",
    "module": "preserve",
    "moduleResolution": "bundler",
    "outDir": "./dist/example-module"
  },
  "include": ["src/**/*.ts", "src/**/*.tsx"],
  "exclude": ["__tests__"],
  "files": ["package.json"]
}
```

> [!TIP]
>
> For a more flexible setup, you can take a look at the [Example Module](https://github.com/optum-ecp/turbo-ui-starter/tree/main/packages/ui/example-module) on GitHub.
>
> This splits the configs into multiple configurations, one for the library and one for testing. You can then add more for different purposes, such as one for storybook.

## Doing a release

To do a release, you will need to do the following:

1. Branch off of `main`, `beta`, or a `*.x` branch.
2. Make your changes.
3. Commit your changes into the branch you created.
4. Create a pull request to merge back into the branch you branched off of (e.g. `main`).
   - Title the pull request with the type of change you are making (e.g. `feat(ui): Add new button component`).
   - See: [Commit message format](https://semantic-release.gitbook.io/semantic-release#commit-message-format) for valid commit message formats.
5. Squash and merge the pull request.
   - GitHub will ask for a new commit message, use the same format as the pull request title, which GitHub will automatically populate.
   - Git hub will automatically also append a `#<pull-request-number>` to the commit message which is used to link the commit to the pull request (e.g. `feat(ui): Add new button component (#123)`). It is recommended to keep this in the commit message.

## Convert a repo to semantic release that already has releases

If you have a repo that already has releases, you can convert it to use semantic release by doing the above steps except for the [Doing a release](#doing-a-release) section (for now). Without this step, semantic release will attempt to release version `1.0.0` of the package which has already been released since the tag doesn't exist. So here we will create the tag that semantic release will use to determine the next version to release.

1. In the code section of the GitHub repository, click on the `Tags` button to the right of the current branch dropdown.
2. If there arn't any tags, click on the `Create a new release` button.
3. In the `Choose a tag` dropdown, create a new tag for the project you want to release.
   - The tag should be in the formatted as `@uhg-netra-ai/<my-package>-vX.Y.Z` where `<my-package>` is the name of the package you are releasing and `X.Y.Z` is the version of the package you have already released.
4. Next select the target branch you want to release from (e.g. `main`).
5. Add a title and description for the release.
6. Click the `Publish release` button.

> [!NOTE]
>
> - A tag for the `main` branch is formatted as `@uhg-netra-ai/<my-package>-vX.Y.Z`
> - A tag for the `beta` branch is formatted as `@uhg-netra-ai/<my-package>-vX.Y.Z-beta.123` where `123` is the build number.

If you have more than one package in the monorepo, you will need to repeat the above steps for each package.

Now you can follow the [Doing a release](#doing-a-release) section to release the next version of the package as it will use this newly created tag to determine the next version that should be released.

## References

- [Semantic Release Mono Repo](https://www.npmjs.com/package/semantic-release-monorepo)
- [Semantic Release](https://www.npmjs.com/package/semantic-release)
