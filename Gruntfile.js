"use strict";

var webpack_cfg = require('./webpack.config')
//var extend = require('util')._extend

module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json')
        , tag: {
            banner: '/*!\n'
            + ' * <%= pkg.name %>\n'
            + ' * @version <%= pkg.version %>\n'
            + ' */\n'
        }
        , sass: {
            dev: {
                options: {
                    style: 'expanded'
                    , sourcemap: 'none'
                    , compass: true
                }
                , files: [
                    {
                        expand: true
                        , cwd: './scss'
                        , src: [ 'demo.scss' ]
                        , dest: './examples'
                        , ext: '.css'
                    }
                ]
            }
            , dist: {
                options: {
                    style: 'expanded' //'compressed'
                    , sourcemap: 'none'
                    , compass: true
                }
                , files: [
                    { './css/month-picker.css': './scss/pack-month-picker.scss' }
                ]
            }
        }
        , babel: {
            options: {
                //sourceMap: true
            }
            , dist: {
                files: [
                    {
                        expand: true
                        , cwd: './src'
                        , src: [ '**/*.jsx', '**/*.es6' ]
                        , dest: './lib'
                        , ext: '.js'
                    }
                ]
            }
        }
        , watch: {
            css: {
                files: './scss/*.scss'
                , tasks: ['sass:dev']
            }
            , react: {
                files: ['./src/*.jsx', './src/*.es6', './src/*.js', './examples/*.jsx']
                , tasks: ['webpack:demo']
            }
        }
        , clean: {
            options: {
                force: true
            }
            //, all: ["examples/demo.js", "examples/*.css.*"]
            , js: "examples/demo.js"
            , css: [ "examples/*.css"]
            , lib: "lib/*"
        }
        , webpack: {
            demo: webpack_cfg
        }
    })

    grunt.loadNpmTasks('grunt-contrib-watch')
    grunt.loadNpmTasks('grunt-contrib-sass')
    grunt.loadNpmTasks('grunt-contrib-clean')
    grunt.loadNpmTasks('grunt-babel')
    grunt.loadNpmTasks('grunt-webpack')


    grunt.registerTask('default', ['sass:dev', 'webpack:demo', 'babel'])
    grunt.registerTask('dev', ['sass:dev', 'webpack:demo', 'babel', 'watch'])
    grunt.registerTask('build', ['sass:dist', 'babel'])

    grunt.registerTask('wp', ['webpack:demo'])

}