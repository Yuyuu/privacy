'use strict';

module.exports = grunt => {
  grunt.registerTask('dev', () => {
    let backgroundWatch = grunt.util.spawn({grunt: true, args: ['webpack', '--watch']}, () => {
      grunt.log.writeln('done');
    });

    grunt.option.watch = true;
    backgroundWatch.stdout.pipe(process.stdout);
    backgroundWatch.stderr.pipe(process.stderr);
    grunt.task.run(['eslint', 'mocha:console', 'watch']);
  });
};
