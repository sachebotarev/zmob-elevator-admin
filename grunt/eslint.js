 /* eslint-env node */
module.exports =  function(grunt, config) {
    "use strict";
    return {
		target: ["!<%= dir.src %>/css", "<%= dir.src %>/**/*.js", "!<%= dir.src %>/thirdparty/*.js"]
    };
};
