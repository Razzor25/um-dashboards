const { makeUploadCommand, makePackCommand, semanticReleaseNpm } = require('@uhg-netra-ai/netra-ai-tools/jfrog/cli');

module.exports = {
  extends: 'semantic-release-monorepo',
  plugins: [
    '@semantic-release/commit-analyzer',
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
