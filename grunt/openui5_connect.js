/*eslint-env node*/
module.exports =  function() {
    "use strict";
    return {
        options: {
            resources: [
                "<%= dir.sdk %>/resources"
            ],
            testresources: [
                "<%= dir.sdk %>/test-resources"
            ],
            cors: {
                origin: "*"
            }
        },
        src: {
            options: {
                appresources: "<%= dir.src %>"
            }
        }
    };
};
