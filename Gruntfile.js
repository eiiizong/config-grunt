module.exports = function (grunt) {
	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		uglify: {
			options: {
				banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
			},
			build: {
				src: 'src/<%= pkg.name %>.js',
				dest: 'build/<%= pkg.name %>.min.js'
			}
		},
		less: {
			development: {
				options: {
					paths: ['src/less']
				},
				files: {
					'src/css/*.css': 'src/less/*.less'
				}
			},
		},
		postcss: {
			options: {
				processors: [
					require('pixrem')(), // add fallbacks for rem units
					require('autoprefixer')({
						browsers: 'last 2 versions'
					}), // add vendor prefixes
					require('cssnano')() // minify the result
				]
			},
			dist: {
				src: 'src/css/*.css',
				dest: 'dist/css/index.css'
			}
		},
		watch: {
            client: {    //用于监听less文件,当改变时自动编译成css文件
                files: ['src/less/*.less'],
                tasks: ['less'],
                options: {
                    livereload: true
                }
            },
            clientcss: {    //用于监听css文件,当改变时自动压缩css文件
                files: ['src/css/*.css'],
                tasks: ['postcss'],
                options: {
                    livereload: true
                }
            }
        }
	});

	// 加载包含 "uglify" 任务的插件。
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-postcss');
	grunt.loadNpmTasks('grunt-contrib-watch');

	// 默认被执行的任务列表。
	grunt.registerTask('default', ['less', 'postcss', 'watch']);

};
