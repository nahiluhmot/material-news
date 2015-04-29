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
  css: {
    src: [
      $(bower, 'materialize', 'dist', 'css', 'materialize.css'),
    ],
    dest: $(build, 'public', 'css')
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
        $(bower, 'reqwest', 'reqwest.js'),
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
    src: $(scss, '**', '*.scss'),
    dest: $(build, 'public', 'css'),
    sourceMaps: !isProductionBuild
  },
  serve: {
    src: $(build, 'public'),
    port: 3000
  }
};

module.exports = config;
