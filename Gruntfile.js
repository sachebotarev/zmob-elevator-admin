/*eslint-env node*/
module.exports = function(grunt) {
    "use strict";
    var path = require('path');
    require('time-grunt')(grunt);

	var sUser = grunt.option('user');
	var sPassword =  grunt.option('password');
	var sRequest =  grunt.option('request');

    var gruntData = {
		auth: {
			user: sUser || "SCHEBOTAREV",
			pwd: sPassword || "@WSX2wsx",
			req: sRequest || "FE1K900084"
		},
        dir: {
            sdk: 'sapui5-sdk',
            src: 'webapp',
            dist: 'dist'
        },
        serve: {
            host: '127.0.0.1',
            port: '8080'
        }
    };

    require('load-grunt-config')(grunt, {
        configPath: path.join(process.cwd(), 'grunt'),
        jitGrunt: {
            staticMappings:{
                'openui5_connect': 'grunt-openui5',
                'openui5_theme': 'grunt-openui5',
				'openui5_preload': 'grunt-openui5'
            }
        },
        data: gruntData
    });
};
