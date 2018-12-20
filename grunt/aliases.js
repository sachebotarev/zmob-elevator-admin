/* eslint-env node */
module.exports = {
    'default': ['openui5_connect', 'open', 'watch'],
	'build': ['eslint', 'clear', 'copy' ],
	//'build': [ 'clear', 'copy' ],
    'clear': ['clean'],
	'lint': ['eslint'],
	'deploy': ['build','nwabap_ui5uploader']
};
