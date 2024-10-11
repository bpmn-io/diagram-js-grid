import bpmnIoPlugin from 'eslint-plugin-bpmn-io';

const files = {
  build: [
    '*.js',
    '*.mjs',
    'test/distro/karma.conf.js'
  ],
  dist: [
    'dist'
  ],
  test: [
    'test/**/*.js'
  ]
};

export default [
  {
    ignores: files.dist
  },
  ...bpmnIoPlugin.configs.browser.map(config => {
    return {
      ...config,
      ignores: files.build
    };
  }),
  ...bpmnIoPlugin.configs.node.map(config => {
    return {
      ...config,
      files: files.build
    };
  }),
  ...bpmnIoPlugin.configs.mocha.map(config => {
    return {
      ...config,
      files: files.test
    };
  }),
  {
    languageOptions: {
      globals: {
        require: false,
        sinon: false
      }
    },
    files: files.test
  }
];
