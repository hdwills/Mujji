module.exports = function (grunt) {
    grunt.initConfig({

        // Banner 注释
        banner: '/*!\n' +
            ' * <%= grunt.template.today("yyyy") %> Broadree, <%= grunt.template.today("isoDateTime") %>\n' +
            ' * Font Awesome v4.1.0 | Normalize.css v3.0.1\n' +
            ' */',

        // 清空目录
        clean: {
            // 清空发布目录
            release: {
                src: ["build/"]
            }
        },

        // 模板
        includereplace: {
            template: {
                files: [
                    {
                        expand: true,
                        cwd: "src/",
                        src: ["*.html"],
                        dest: "html/"
                    }
                ]
            }
        },

        compass: {
            dist: {
                options: {
                    config: "config/config.rb",
                    sassDir: "css",
                    cssDir: "css",
                    imagesDir: "images/",
                    // generatedImagesDir: "images/sprites/",
                    // generatedImagesPath: "images/sprites/",
                    // httpGeneratedImagesPath: "images/",
                    environment: 'development'
                }
            }
        },

        // 打包发布
        usebanner: {
            dist: {
                // banner 位置
                options: {
                    position: "top",
                    banner: "<%= banner %>"
                },
                // 要处理的文件
                // task配置说明，http://gruntjs.com/configuring-tasks
                files: {
                    src: [
                        "dist/css/style.css"
                    ]
                }
            }
        },

        // 压缩、合并 css
        cssmin: {
            minify: {
                expand: true,                          // 开启动态扩展
                cwd: "dist/",                          // 源文件目录
                src: ["**/*.css", "!*.min.css"],       // 匹配文件
                dest: "dist/"                          // 输出目录
                // ext: ".css"                         // 输出文件扩展名，可省略，常配合 ".min.css"
            }
        },

        // 配合打包发布
        copy: {
            style: {
                expand: true, // 启用动态扩展
                src: [
                    "css/style.css"
                ],
                dest: "dist/"
            }
        },

        // css 属性排序
        // https://github.com/csscomb/grunt-csscomb
        csscomb: {
            // 最终都输出到 dist 目录
            style: {
                files: {
                    "dist/css/style.css": "css/style.css"
                }
            }
        },

        // 图片压缩
        imagemin: {
            dynamic: {
                options: {
                    optimizationLevel: 3 // PNG 图片优化水平
                },
                files: [
                    {
                        expand: true, // 开启动态扩展
                        cwd: "images/", // 源文件目录 current working directory
                        src: ["**/*.{png,jpg,gif}"], // 源文件格式
                        dest: "images/" // 输出目录
                    }
                ]
            }
        },

        // 配合 livereload 使用，建立本地调试环境
        connect: {
            livereload: {
                options: {
                    port: 11011,
                    base: "./",
                    livereload: true
                }
            }
        },

        // 配合 livereload 使用，打开项目
        open: {
            livereload: {
                path: "http://localhost:11011"
            }
        },

        watch: {
            options: {
                spawn: false
            },
            style: {
                files: ["css/*.scss"],
                tasks: ["compass"],
                options: {
                    livereload: true
                }
            },
            includereplace: {
                files: ["src/**/*.html"],
                tasks: ["includereplace"],
                options: {
                    livereload: true
                }
            },
            livereload: {
                files: [
                    "html/*.html",
                    "css/*.css"
                ],
                options: {
                    livereload: true
                }
            }
        },

        jade: {
            compile: {
                options: {
                    data: {}
                },
                files: [{
                    expand: true,
                    cwd: "template/",
                    src: [ "**/*.jade" ],
                    dest: "build",
                    ext: ".html"
                }]
            }
        }


    });

    // 加载任务插件
    grunt.loadNpmTasks("grunt-contrib-clean");
    grunt.loadNpmTasks("grunt-contrib-copy");
    grunt.loadNpmTasks("grunt-contrib-compass");
    grunt.loadNpmTasks("grunt-contrib-cssmin");
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-contrib-connect");

    grunt.loadNpmTasks("grunt-open");
    grunt.loadNpmTasks("grunt-banner");
    grunt.loadNpmTasks("grunt-csscomb");
    grunt.loadNpmTasks('grunt-include-replace');

    // 配置任务
    grunt.registerTask("lr", ["connect:livereload", "open:livereload", "watch"]);
    grunt.registerTask("output", ["clean:release", "csscomb", "cssmin", "usebanner"]);
}
