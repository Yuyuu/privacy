'use strict';

module.exports = grunt => {
  let tests = './src/js/**/*_spec.js';
  let _ = require('lodash');

  grunt.registerTask('mocha:console', function () {
    run('dot', this.async());
  });

  function run(reporter, done) {
    grunt.util.spawn({
      cmd: './node_modules/mocha/bin/mocha',
      args: _.extend([
        '--require', './test/helper.js',
        '--compilers', 'js:babel-register',
        '--reporter', reporter,
        tests
      ]),
      opts: {
        stdio: 'inherit'
      },
      grunt: false
    }, done);
  }
};
