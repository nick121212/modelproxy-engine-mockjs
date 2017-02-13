module.exports = function(grunt) {

    grunt.registerTask('build', ['clean:node', 'webpack', 'clean:all']);
};