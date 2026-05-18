'use strict';

// configures browsers to run test against
// any of [ 'ChromeHeadless', 'Chrome', 'Firefox' ]
var browsers = (process.env.TEST_BROWSERS || 'ChromeHeadless').split(',');


module.exports = async function(karma) {

  // use puppeteer provided Chrome for testing
  process.env.CHROME_BIN = await require('puppeteer').executablePath();

  karma.set({

    frameworks: [
      'webpack',
      'mocha'
    ],

    files: [ '*Spec.cjs' ],

    preprocessors: {
      '*Spec.cjs': [ 'webpack' ]
    },

    browsers,

    autoWatch: false,
    singleRun: true,

    webpack: {
      mode: 'development'
    }
  });
};
