/*
 * grunt
 * http://gruntjs.com/
 *
 * Copyright (c) 2012 "Cowboy" Ben Alman
 * Licensed under the MIT license.LiveReload
 * https://github.com/gruntjs/grunt/blob/master/LICENSE-MIT
 */

module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-reload');
  // Project configuration.
  grunt.initConfig({
    test: {
      all: ['test/**/*.js']
    },
    lint: {
      all: [
        'grunt.js',
        'col/js/*.js',
        'tasks/*.js',
        'tasks/*/*.js',
        'test/{grunt,tasks,util}/*.js'
      ]
    },
    watch: {
      files:['*.html', '*.css', '*.js'],
      tasks:'reload'

    },
    server: {
      port: 8081,
      base:".",
      keepalive:true
    },
    reload: {
        port: 8081,
        proxy: {
            host: 'localhost'
        }
    },

    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        boss: true,
        eqnull: true,
        node: true,
        es5: true,
        strict: false
      },
      globals: {}
    }
  });

grunt.registerTask('wait', 'Wait for a set amount of time.', function(delay) {
  var d = delay ? delay + ' second' + (delay === '1' ? '' : 's') : 'forever';
  grunt.log.write('Waiting ' + d + '...');
  // Make this task asynchronous. Grunt will not continue processing
  // subsequent tasks until done() is called.
  var done = this.async();
  // If a delay was specified, call done() after that many seconds.
  if (delay) { setTimeout(done, delay * 1000); }
});
  // Default task.
 // grunt.registerTask('develop', 'server wait watch reload');
  grunt.registerTask('develop', 'reload server');
  grunt.registerTask('default', 'lint server watch test');

};
