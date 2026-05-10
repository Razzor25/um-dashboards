import path from 'path';
const __dirname = new URL('.', import.meta.url).pathname;

/** @type {import('jest').Config} */
export default {
  moduleFileExtensions: ['tsx', 'ts', 'jsx', 'js', 'json', 'node'],
  clearMocks: true,
  testMatch: ['<rootDir>/__test(s)?__/**/*.(spec|test).[jt]s?(x)'],
  collectCoverage: true,
  coverageDirectory: 'coverage',
  // on node 14.x coverage provider v8 offers good speed and more or less good report
  coverageProvider: 'v8',
  collectCoverageFrom: [
    '{app,src}/**/*.{js,jsx,ts,tsx}',
    '!**/*.d.ts',
    '!**/node_modules/**',
    '!<rootDir>/out/**',
    '!<rootDir>/.next/**',
    '!<rootDir>/*.config.js',
    '!<rootDir>/coverage/**',
  ],
  coverageReporters: ['json', 'lcov', 'text', 'clover'],
  rootDir: './',
  moduleNameMapper: {
    // Handle CSS imports (with CSS modules)
    // https://jestjs.io/docs/webpack#mocking-css-modules
    '^.+\\.module\\.(css|sass|scss)$': 'identity-obj-proxy',

    // Handle CSS imports (without CSS modules)
    '^.+\\.(css|sass|scss)$': '<rootDir>/styleMock.js',

    // Handle image imports
    // https://jestjs.io/docs/webpack#handling-static-assets
    '^.+\\.(png|jpg|jpeg|gif|webp|avif|ico|bmp|svg)$/i': `<rootDir>/__mocks__/fileMock.js`,

    // Handle module aliases
    '^@/components/(.*)$': '<rootDir>/components/$1',
    // Handle module aliases
    '^@/lib/(.*)$': '<rootDir>/lib/$1',
    '^@/app/(.*)$': '<rootDir>/app/$1',
    // Handle @next/font
    '@next/font/(.*)': `<rootDir>/nextFontMock.js`,
    // Handle next/font
    'next/font/(.*)': `<rootDir>/nextFontMock.js`,
    // Disable server-only
    'server-only': `<rootDir>/__mocks__/empty.js`,
  },
  // Add more setup options before each test is run
  setupFilesAfterEnv: [path.join(__dirname, 'jest.setup.ts')],
  testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/.next/', '^.*\\.cy\\.test\\.tsx$'],
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': [
      'babel-jest',
      {
        configFile: path.join(__dirname, 'babel.config.cjs'),
      },
    ],
    //   [
    //   'babel-jest',
    //   {
    //     presets: ['@babel/preset-env', { presets: ['next/babel'] }],
    //   },
    //   '@babel/preset-typescript',
    // ],
  },
  transformIgnorePatterns: [
    '/node_modules/(?!next-auth|@uhg-netra-ai/.+?|jose|@panva/hkdf|uuid|preact-render-to-string|preact)',
    '^.+\\.module\\.(css|sass|scss)$',
  ],
};
