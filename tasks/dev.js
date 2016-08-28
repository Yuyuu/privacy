'use strict';

module.exports = function (grunt) {
  grunt.registerTask('dev', function () {
    let backgroundWatch = grunt.util.spawn({grunt: true, args: ['webpack', '--watch']}, function () {
      grunt.log.writeln('done');
    });

    grunt.option.watch = true;
    backgroundWatch.stdout.pipe(process.stdout);
    backgroundWatch.stderr.pipe(process.stderr);
    grunt.task.run(['eslint', 'mocha:console', 'watch']);
  });
};
