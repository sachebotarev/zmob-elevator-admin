/*eslint-env node*/
module.exports =  function(grunt, config) {
    "use strict";
    return {
        src: {
            options: {
                port: "<%= serve.port %>",
                hostname: "<%= serve.host %>"
            }
        }
    };
};
