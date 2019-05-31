"use strict";

const sass = require('node-sass')

var webpack_cfg = require('./webpack.config')
//var extend = require('util')._extend

module.exports = function(grunt) {
    require('load-grunt-tasks')(grunt)

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        project: {
            react: 'examples/react/16.x',
            modules: 'node_modules',
        },
        tag: {
            banner: '/*!\n'
            + ' * <%= pkg.name %>\n'
            + ' * @version <%= pkg.version %>\n'
            + ' */\n'
        },
        concat: {
            react: {
                options: {
                    separator: '\n'
                },
                files: {
                    '<%= project.react %>/react.min.js': [
                        '<%= project.modules %>/react/umd/react.production.min.js',
                    ],
                    '<%= project.react %>/react-dom.min.js': [
                        '<%= project.modules %>/react-dom/umd/react-dom.production.min.js',
                    ],
                    '<%= project.react %>/prop-types.min.js': [
                        '<%= project.modules %>/prop-types/prop-types.min.js',
                    ],
                },
            },
        },
        sass: {
            options: {
                implementation: sass,
                style: 'expanded',
                compass: true,
                //sourcemap: 'none',
                //for grunt-sass
                sourceMap: false,
            },
            dev: {
                files: [
                    {
                        expand: true,
                        cwd: './scss',
                        src: [ 'demo.scss' ],
                        dest: './examples',
                        ext: '.css',
                    },
                ],
            },
            dist: {
                files: [
                    { './css/month-picker.css': './scss/pack-month-picker.scss' },
                ],
            },
        },
        babel: {
            options: {
                //sourceMap: true,
            },
            dist: {
                files: [
                    {
                        expand: true,
                        cwd: './src',
                        src: [ '**/*.jsx', '**/*.es6' ],
                        dest: './lib',
                        ext: '.js',
                    }
                ]
            },
        },
        watch: {
            css: {
                files: './scss/*.scss',
                tasks: ['sass:dev'],
            },
            react: {
                files: ['./src/*.jsx', './src/*.es6', './src/*.js', './examples/*.jsx'],
                tasks: ['webpack:demo'],
            }
        },
        clean: {
            options: {
                force: true,
            },
            //all: ["examples/demo.js", "examples/*.css.*"],
            js: "examples/demo.js",
            css: [ "examples/*.css"],
            lib: "lib/*",
        },
        webpack: {
            demo: webpack_cfg,
        }
    })

    // grunt.loadNpmTasks('grunt-contrib-watch')
    // grunt.loadNpmTasks('grunt-sass')
    // grunt.loadNpmTasks('grunt-contrib-clean')
    // grunt.loadNpmTasks('grunt-contrib-concat')
    // grunt.loadNpmTasks('grunt-babel')
    // grunt.loadNpmTasks('grunt-webpack')


    grunt.registerTask('default', ['sass:dev', 'webpack:demo', 'babel'])
    grunt.registerTask('dev', ['sass:dev', 'webpack:demo', 'babel', 'watch'])
    grunt.registerTask('build', ['sass:dist', 'babel'])

    grunt.registerTask('wp', ['webpack:demo'])

}