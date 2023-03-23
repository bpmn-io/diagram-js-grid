/* eslint-env node */

var singleStart = process.env.SINGLE_START;

// configures browsers to run test against
// any of [ 'ChromeHeadless', 'Chrome', 'Firefox' ]
var browsers = (process.env.TEST_BROWSERS || 'ChromeHeadless').split(',');

// use puppeteer provided Chrome for testing
process.env.CHROME_BIN = require('puppeteer').executablePath();

module.exports = function(karma) {
  var config = {

    frameworks: [
      'mocha',
      'sinon-chai',
      'webpack'
    ],

    files: [
      'test/spec/*Spec.js'
    ],

    preprocessors: {
      'test/spec/*Spec.js': [ 'webpack', 'env' ]
    },

    browsers,

    autoWatch: false,
    singleRun: true,

    webpack: {
      mode: 'development',
      module: {
        rules: [
          {
            test: /\.css$/,
            type: 'asset/source'
          }
        ]
      }
    }
  };

  if (singleStart) {
    config.browsers = [].concat(config.browsers, 'Debug');
    config.envPreprocessor = [].concat(config.envPreprocessor || [], 'SINGLE_START');
  }

  karma.set(config);
};
