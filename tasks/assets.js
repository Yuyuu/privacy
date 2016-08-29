'use strict';

module.exports = grunt => {
  grunt.registerTask('assets', () => {
    grunt.task.run(['webpack']);
  });
};
