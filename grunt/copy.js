module.exports = function(grunt, config) {
    "use strict";
    return {
        dist: {
            files: [ {
                expand: true,
                cwd: "<%= dir.src %>",
                src: [
                    '**',
					'!test/**',
					'!localService/**'
                ],
                dest: "<%= dir.dist %>"
            } ]
        }
    };
};
