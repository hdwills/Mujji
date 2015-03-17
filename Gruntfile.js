module.exports = function (grunt) {
    grunt.initConfig({

        config: {
            src: 'source',
            dest: 'dist',
            tmp: '.tmp'
        },

        banner: '/*!\n' +
        ' * <%= grunt.template.today("yyyy-mm-dd HH:MM:ss Z") %> by @Harry\n' +
        ' * Font Awesome v4.2.0 | Normalize.css v3.0.2\n' +
        ' */',

        clean: {
            dist: {
                src: ['<%= config.dest %>', '<%= config.tmp %>']
            }
        },

        copy: {
            dist: {
                files: [
                    {
                        expand: true,
                        cwd: '<%= config.src %>',
                        src: 'img/**/*.*',
                        dest: '<%= config.dest %>'
                    },
                    {
                        expand: true,
                        cwd: '<%= config.src %>',
                        src: 'files/**/*.*',
                        dest: '<%= config.dest %>'
                    },
                    {
                        expand: true,
                        cwd: '<%= config.src %>',
                        src: ['scripts/**/{*min*,*pack*}.js'],
                        dest: '<%= config.dest %>'
                    }
                ]
            }
        },

        includereplace: {
            dist: {
                files: [
                    {
                        expand: true,
                        cwd: '<%= config.src %>',
                        src: '*.html',
                        dest: '<%= config.dest %>'
                    }
                ]
            }
        },

        compass: {
            dist: {
                options: {
                    // config: 'config/config.rb',
                    sassDir: '<%= config.src %>/sass',
                    cssDir: '<%= config.src %>/css',
                    imagesDir: '<%= config.src %>/img',
                    // environment: 'development production',
                    environment: 'production',
                    outputStyle: 'expanded',
                    sourcemap: true
                }
            }
        },

        autoprefixer: {
            options: {
                browsers: [
                    "Android 2.3",
                    "Android >= 4",
                    "Chrome >= 20",
                    "Firefox >= 24",
                    "Explorer >= 8",
                    "iOS >= 6",
                    "Opera >= 12",
                    "Safari >= 6"
                ]
            },
            core: {
                options: {
                    map: true
                },
                src: '<%= concat.core.dest %>'
            }
        },

        concat: {
            core: {
                src: '<%= config.src %>/css/style.css',
                dest: '<%= config.dest %>/css/style.min.css'
            }
        },

        cssmin: {
            options: {
                compatibility: 'ie8',
                keepSpecialComments: 0
            },
            core: {
                src: '<%= concat.core.dest %>',
                dest: '<%= concat.core.dest %>'
            }
        },

        csscomb: {
            core: {
                files: {
                    '<%= concat.core.dest %>': '<%= concat.core.dest %>'
                }
            }
        },

        usebanner: {
            dist: {
                options: {
                    position: 'top',
                    banner: '<%= banner %>'
                },
                files: {
                    src: [
                        '<%= config.dest %>/css/*.min.css'
                    ]
                }
            }
        },

        imagemin: {
            dynamic: {
                options: {
                    optimizationLevel: 3
                },
                files: [
                    {
                        expand: true,
                        cwd: '<%= config.dest %>/img',
                        src: ['**/*.{png,jpg,gif}'],
                        dest: '<%= config.dest %>/img'
                    }
                ]
            }
        },

        connect: {
            options: {
                port: 11011,
                hostname: 'localhost',
                base: '.',
                livereload: 35729
            },
            all: {
                options: {
                    open: true,
                    base: '<%= config.dest %>'
                }
            }
        },

        watch: {
            options: {
                spawn: false,
                livereload: '<%= connect.options.livereload %>'
            },
            dev: {
                files: [
                    '<%= config.src %>/**'
                ],
                tasks: 'dev'
            }
        },

        useminPrepare: {
            html: '<%= config.dest %>/index.html',
            options: {
                dest: '<%= config.dest %>',
                root: '<%= config.dest %>'
            }
        },

        usemin: {
            html: ['<%= config.dest %>/**/*.html'],
            css: ['<%= config.dest %>/css/*.min.css']
        }

    });

    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);

    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);

    // registerTask
    grunt.registerTask('dev', [
        'clean',
        'compass',
        'copy',
        'includereplace',
        'concat',
        'autoprefixer'
    ]);
    grunt.registerTask('build', [
        'clean',
        'copy',
        'includereplace',
        'useminPrepare',
        'concat',
        'autoprefixer',
        'csscomb',
        'cssmin',
        'usemin',
        'usebanner'
    ]);
    grunt.registerTask('default', [
        'dev',
        'connect',
        'watch:dev'
    ])
}
