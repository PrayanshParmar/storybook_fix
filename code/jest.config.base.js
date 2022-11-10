const os = require('os');
const path = require('path');

// TODO Revisit this test later, when we have a windows machine @valentinpalkovic
const skipOnWindows = [
  'lib/core-server/src/utils/stories-json.test.ts',
  'lib/core-server/src/utils/StoryIndexGenerator.test.ts',
  'lib/cli/src/helpers.test.ts',
  'lib/core-server/src/utils/__tests__/server-statics.test.ts',
  'lib/core-common/src/utils/__tests__/template.test.ts',
  'addons/storyshots/storyshots-core/src/frameworks/configure.test.ts',
  'lib/core-common/src/utils/__tests__/interpret-files.test.ts',
  'lib/builder-manager/src/utils/files.test.ts',
  'lib/cli/src/helpers.test.ts',
  'lib/core-server/src/utils/__tests__/server-statics.test.ts',
  'lib/core-common/src/utils/__tests__/template.test.ts',
  'addons/storyshots/storyshots-core/src/frameworks/configure.test.ts',
  'lib/core-common/src/utils/__tests__/interpret-files.test.ts',
  'lib/builder-manager/src/utils/files.test.ts',
];

module.exports = {
  cacheDirectory: path.resolve('.cache/jest'),
  clearMocks: true,
  moduleNameMapper: {
    // non-js files
    '\\.(jpg|jpeg|png|apng|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      path.resolve('./__mocks__/fileMock.js'),
    '\\.(css|scss|stylesheet)$': path.resolve('./__mocks__/styleMock.js'),
    '\\.(md)$': path.resolve('./__mocks__/htmlMock.js'),

    // core-js v2 to v3 mapping
    'core-js/modules/es6.(.*)': 'core-js/modules/es.$1',
    'core-js/modules/es7.(.*)': 'core-js/modules/esnext.$1',
    'core-js/library/fn/(.*)': `core-js/features/$1`,
    'core-js/es5/(.*)': `core-js/es/$1`,
    'core-js/es6/(.*)': `core-js/es/$1`,
    'core-js/es7/reflect': `core-js/proposals/reflect-metadata`,
    'core-js/es7/(.*)': `core-js/proposals/$1`,
    'core-js/object$/': `core-js/es/object`,
    'core-js/object/(.*)': `core-js/es/object/$1`,
    'babel-runtime/core-js/(.*)': `core-js/es/$1`,
    // 'babel-runtime/core-js/object/assign'
    'core-js/library/fn/object/assign': 'core-js/es/object/assign',
  },
  transform: {
    '^.+\\.[jt]sx?$': path.resolve('../scripts/utils/jest-transform-js.js'),
    '^.+\\.mdx$': '@storybook/addon-docs/jest-transform-mdx',
  },
  transformIgnorePatterns: ['/node_modules/(?!@angular|rxjs|nanoid|uuid|lit-html|@mdx-js)'],
  testMatch: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],
  testPathIgnorePatterns: [
    '/storybook-static/',
    '/node_modules/',
    '/dist/',
    '/prebuilt/',
    '/template/',
    'addon-jest.test.js',
    '/examples/*/src/*.*',
    '/examples/*/src/*/*.*',
    '/examples/*/src/*/*/*.*',
    // TODO: Can not get svelte-jester to work, but also not necessary for this test, as it is run by tsc/svelte-check.
    '/renderers/svelte/src/public-types.test.ts',
    '/renderers/vue/src/public-types.test.ts',
    '/renderers/vue3/src/public-types.test.ts',
    ...(process.platform === 'win32' ? skipOnWindows : []),
  ],
  collectCoverage: false,
  collectCoverageFrom: [
    'frameworks/*/src/**/*.{js,jsx,ts,tsx}',
    'lib/*/src/**/*.{js,jsx,ts,tsx}',
    'renderers/*/src/**/*.{js,jsx,ts,tsx}',
    'addons/*/src/**/*.{js,jsx,ts,tsx}',
  ],
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '/cli/test/',
    '/dist/',
    '/prebuilt/',
    '/generators/',
    '/template/',
    '/dll/',
    '/__mocks__ /',
    '/__mockdata__/',
    '/__mocks-ng-workspace__/',
    '/__testfixtures__/',
    '^.*\\.stories\\.[jt]sx?$',
    'typings.d.ts$',
  ],
  globals: {
    PREVIEW_URL: undefined,
    SNAPSHOT_OS: os.platform() === 'win32' ? 'windows' : 'posix',
  },
  snapshotSerializers: [
    '@emotion/jest/serializer',
    'enzyme-to-json/serializer',
    'jest-serializer-html',
  ],
  coverageDirectory: 'coverage',
  coverageReporters: ['lcov'],
  testEnvironmentOptions: {
    url: 'http://localhost',
  },
  modulePathIgnorePatterns: [
    //
    '/dist/.*/__mocks__/',
    '/storybook-static/',
    '/template/',
  ],
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'json', 'node'],
  watchPlugins: ['jest-watch-typeahead/filename', 'jest-watch-typeahead/testname'],
  reporters: ['default', 'jest-junit'],
  snapshotFormat: {
    escapeString: true,
    printBasicPrototype: true,
  },
};
