'use strict';

module.exports = function (grunt) {
  let path = require('path');
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
  let config = {
    pkg: grunt.file.readJSON('package.json'),
    prod: grunt.option('prod') || false,
    srcDir: path.join(__dirname, 'src'),
    buildDir: path.join(__dirname, 'server', 'public', 'app')
  };

  grunt.util._.extend(config, loadConfig('./tasks/options/'));
  grunt.initConfig(config);
  grunt.loadTasks('tasks');
  grunt.registerTask('test', ['eslint', 'mocha:console']);
  grunt.registerTask('default', ['clean', 'dev']);
  grunt.registerTask('build', ['clean', 'assets']);

  function loadConfig(path) {
    let glob = require('glob');
    let object = {};
    let key;

    glob.sync('*', {cwd: path}).forEach(option => {
      key = option.replace(/\.js$/, '');
      object[key] = require(path + option);
    });

    return object;
  }
};
