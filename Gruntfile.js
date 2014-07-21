module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('_public/package.json'),
    nodewebkit: {
      options: {
        version: "0.9.2",
        build_dir: './dist',
        // specifiy what to build
        mac: true,
        win: true,
        linux32: true,
        linux64: true
      },
      src: './_public/**/*'
    },
    'gh-pages': {
      options: {
        base: '_public'
      },
      src: ['**']
    }
  });

  grunt.loadNpmTasks('grunt-node-webkit-builder');
  grunt.loadNpmTasks('grunt-gh-pages');

  grunt.registerTask('default', ['nodewebkit']);

};
