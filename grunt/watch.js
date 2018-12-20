 /* eslint-env node */
module.exports = function(grunt, config){
    "use strict";
    return {
        src: {
            options: {
                livereload: true
            },
            files: [
                "<%= dir.src %>/**"
            ],
            tasks : ["eslint"]
        }
    };
};
