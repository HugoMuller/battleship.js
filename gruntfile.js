'use strict';

var watchedFiles = ['gruntfile.js', 'config/express.js', 'server/**/*.js', 'public/js/**',
  'test/karma/**/*.js', 'test/mocha/**/*.js'];

module.exports = function(grunt) {
  // Project Configuration
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    assets: grunt.file.readJSON('config/assets.json'),
    watch: {
      js: {
        files: watchedFiles,
        tasks: ['jshint'],
        options: {
          livereload: true
        }
      },
      html: {
        files: ['public/views/**', 'server/views/**'],
        options: {
          livereload: true
        }
      },
      css: {
        files: ['public/css/**/*.css'],
        tasks: ['csslint'],
        options: {
          livereload: true
        }
      }
    },
    jshint: {
      all: {
        src: watchedFiles,
        options: {
          jshintrc: true
        }
      }
    },
    uglify: {
      production: {
        files: '<%= assets.main.js %>'
      }
    },
    csslint: {
      options: {
        csslintrc: '.csslintrc'
      },
      all: {
        src: ['public/css/**/*.css']
      }
    },
    cssmin: {
      combine: {
        files: '<%= assets.main.css %>'
      }
    },
    nodemon: {
      battleship: {
        script: 'server/index.js',
        options: {
          args: [],
          ignore: ['public/**'],
          ext: 'js,html',
          nodeArgs: ['--debug'],
          delayTime: 1,
          env: {
            PORT: 3000
          },
          cwd: __dirname
        }
      }
    },
    concurrent: {
      tasks: ['nodemon', 'watch'],
      options: {
        logConcurrentOutput: true
      }
    },
    mochaTest: {
      battleship: {
        options: {
          reporter: 'spec',
          require: 'server/index.js'
        },
        src: ['test/mocha/**/*.js']
      }
    },
    env: {
      test: {
        NODE_ENV: 'test'
      }
    },
    karma: {
      unit: {
        configFile: 'test/karma/karma.conf.js'
      }
    }
  });

  //Load NPM tasks
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-csslint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-concurrent');
  grunt.loadNpmTasks('grunt-env');

  //Making grunt default to force in order not to break the project.
  grunt.option('force', true);

  //Default task(s).
  if(process.env.NODE_ENV === 'production'){
    grunt.registerTask('default', ['jshint', 'csslint', 'cssmin', 'uglify', 'concurrent']);
  }else{
    grunt.registerTask('default', ['jshint', 'csslint', 'concurrent']);
  }

  //Test task.
  grunt.registerTask('test', ['env:test', 'mochaTest', 'karma:unit']);
  grunt.registerTask('mocha-test', ['env:test', 'mochaTest']);
  grunt.registerTask('karma-test', ['env:test', 'karma:unit']);
};
