/* eslint-env node */
module.exports =  function(grunt, config) {
    "use strict";
    return {
        component: {
            options: {
				compatVersion: "1.52",
                resources: {
                    cwd: "<%= dir.src %>",
                    prefix: "rusagro/elevator/weight",
                    src: [
                        '**/*.js',
                        '**/*.fragment.html',
                        '**/*.fragment.json',
                        '**/*.fragment.xml',
                        '**/*.view.html',
                        '**/*.view.json',
                        '**/*.view.xml',
                        '**/*.properties',
                        'manifest.json',
                        '!test/**'
                    ]
                },
                dest:  "<%= dir.dist %>"
			},
            components: true,
            compress: true
        }
    };
};
