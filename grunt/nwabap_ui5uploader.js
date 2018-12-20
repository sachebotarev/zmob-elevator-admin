/* eslint-env node */
/* eslint camelcase: 0*/
/* eslint quote-props: ["error", "as-needed", { "keywords": false }] */
module.exports = function (grunt, config) {
	"use strict";
	return {
			options: {
				conn: {
					server: 'http://srvsap83.rainvest.local:8000'
				},
				auth: {
					user:  "<%= auth.user %>",
					pwd: "<%= auth.pwd %>"
				}
			},
			upload_build: {
				options: {
					ui5: {
						language: "RU",
						package: "ZMOB002_20",
						bspcontainer: "ZMOB002_WEIGNT",
						bspcontainer_text: "Весовая",
						transportno: "<%= auth.req %>",
						calc_appindex: true
					},
					resources: {
						cwd: "<%= dir.dist %>",
						src: [
								'**/*.*',
								'!test/**'
						]
					}
				}
			}
	};
};
