// Just use  `grunt` from the command line to do a build

// Use `grunt watch` to watch the entire directory

// Use `grunt server` for live reload, then open browser to localhost:9000

module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    clean: ['dist', 'tmp'],
    processhtml: {
      // Swaps the urls from dev files like jquery.js to minified production files like jquery.min.js
      dist: {
        files: {
          'tmp/index.html': ['dev/index.html'],
        }
      }
    },
    jshint: {
        all: ['Gruntfile.js', 'dev/*.js']
    },
    requirejs: {
      compile: {
        options: {
          name: './bower_components/almond/almond',
          baseUrl: '.',
          out: './dist/main.min.js',
          include: './dev/app.js',
          optimize: 'none'
        }
      }
    },
    copy: {
      main: {
        files: [
          // jQuery
          {expand: true, flatten: true, src: ['bower_components/jquery/dist/jquery.min.js'], dest: 'dist/js', filter: 'isFile'},
          // Underscore
          {expand: true, flatten: true, src: ['bower_components/underscore/underscore-min.js'], dest: 'dist/js', filter: 'isFile'},
          // Backbone
          {expand: true, flatten: true, src: ['bower_components/backbone/backbone-min.js'], dest: 'dist/js', filter: 'isFile'},
          // Marionette
          {expand: true, flatten: true, src: ['bower_components/backbone.marionette/lib/backbone.marionette.min.js'], dest: 'dist/js', filter: 'isFile'},
          // Bootstrap JS
          {expand: true, flatten: true, src: ['bower_components/bootstrap/dist/js/bootstrap.min.js'], dest: 'dist/js', filter: 'isFile'},
          // Bootstrap CSS 
          {expand: true, flatten: true, src: ['bower_components/bootstrap/dist/css/bootstrap.min.css'], dest: 'dist/css', filter: 'isFile'} ,
          // Bootstrap Fonts
          {expand: true, flatten: true, src: ['bower_components/bootstrap/dist/fonts/*'], dest: 'dist/fonts', filter: 'isFile'},
          // HTML files with URL's swapped
          {expand: true, flatten: true, src: ['tmp/*'], dest: 'dist/', filter: 'isFile'},
          // Images
          {expand: true, flatten: true, src: ['dev/*.jpg'], dest: 'dist', filter: 'isFile'},
          // Other CSS
          {expand: true, flatten: true, src: ['dev/css/*.css'], dest: 'dist/css', filter: 'isFile'},
        ],
      }
    },

    // NOT NEEDED, since we are developing for educational purposes
    // uglify: {
    //   build: {
    //     src: 'dev/js/*.js',
    //     dest: 'dist/js/main.min.js'
    //   }
    // },

    // NOT NEEDED, since we are developing for educational purposes
    // htmlmin: { 
    //   dist: { 
    //     options: { 
    //       removeComments: true,
    //       collapseWhitespace: true
    //     },
    //     files: { 
    //      // Place your html files here so that they can be copied to dist
    //      'dist/index.html': 'tmp/index.html', 
    //     }
    //   }    
    // },

    cssmin: {
      target: {
        files: {
          'dist/css/style.min.css': ['dev/css/*'] 
        }
      }
    },
    express: {
      all: {
        options: {
          port:9000,
          hostname: 'localhost',
          bases: ['./dist'],
          livereload: true
        }
      }
    },
    watch: {      
      files: ['dev/**'],
      tasks: ['clean', 'processhtml', 'jshint', 'requirejs', 'copy', 'cssmin'],
      options: {
        livereload: true,
      },
    },
  }); // grunt.initConfig
  
  // Load in Grunt's plugins
  grunt.loadNpmTasks('grunt-processhtml');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-express');

  // Default tasks
  grunt.registerTask('default', ['clean', 'processhtml', 'jshint', 'requirejs', 'copy', 'cssmin']);
  grunt.registerTask('server', ['express', 'watch']);
};

