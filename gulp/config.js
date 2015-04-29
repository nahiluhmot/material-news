var path = require('path');
var $ = path.join;

/**
 * Enable production-only features.
 */
var isProductionBuild = process.env.NODE_ENV === 'production';

/**
 * Absolute path of current directory.
 */
var base = path.resolve('.');

/**
 * Top level application and build directories.
 */
var app = $(base, 'app');
var bower = $(base, 'bower_components');
var build = $(base, 'build');
var gulp = $(base, 'gulp');
var html = $(base, 'html');
var scss = $(base, 'scss');

/**
 * This object holds the configuration for each task, keyed by task name.
 */
var config = {
  clean: {
    dir: build
  },
  compress: {
    src: [
      $(build, 'public', '**', '*.css'),
      $(build, 'public', '**', '*.html'),
      $(build, 'public', '**', '*.js')
    ],
    dest: $(build, 'public')
  },
  fonts: {
    vendored: {
      src: [
        $(bower, 'materialize', 'dist', 'font', '**', '*')
      ],
      dest: $(build, 'public', 'font')
    }
  },
  html: {
    src: $(html, '**', '*.html'),
    dest: $(build, 'public')
  },
  js: {
    sourceMaps: !isProductionBuild,
    compile: {
      src: $(app, '**', '*.js'),
      dest: $(build, 'compile', 'src'),
      modules: 'common'
    },
    bundle: {
      src: $(build, 'compile', 'src', 'main.js'),
      file: 'app.js',
      paths: [$(build, 'compile', 'src')],
      dest: $(build, 'compile')
    },
    min: {
      src: $(build, 'compile', 'app.js'),
      dest: $(build, 'public', 'js')
    },
    vendored: {
      src: [
        $(bower, 'aviator', 'aviator.js'),
        $(bower, 'jquery', 'dist', 'jquery.js'),
        $(bower, 'materialize', 'dist', 'js', 'materialize.js'),
        $(bower, 'react', 'react.js'),
        $(bower, 'axios', 'dist', 'axios.js'),
        $(bower, 'underscore', 'underscore.js')
      ],
      dest: $(build, 'public', 'js')
    }
  },
  lint: {
    src: [
      $(base, 'gulpfile.js'),
      $(gulp, '**', '*.js'),
      $(app, '**', '*.js'),
      $(app, '**', '*.js')
    ],
    reporter: 'jshint-stylish'
  },
  scss: {
    copy: [
      {
        src: $(scss, '**', '*.scss'),
        dest: $(build, 'scss')
      },
      {
        src: $(bower, 'materialize', 'sass', 'components', '**', '*.scss'),
        dest: $(build, 'scss', 'materialize')
      }
    ],
    compile: {
      src: $(build, 'scss', '*.scss'),
      dest: $(build, 'public', 'css'),
      sourceMaps: !isProductionBuild
    }
  },
  serve: {
    src: $(build, 'public'),
    crossOrigin: 'https://hacker-news.firebaseio.com',
    port: 3000
  }
};

module.exports = config;
