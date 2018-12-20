 /* eslint-env node */
module.exports = function(grunt, config) {
    "use strict";
    var getChromeName = function(){
        var chrome;
        switch (process.platform){
            case 'win32':
                chrome = "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe";
                break;
            case 'darwin':
                chrome = 'Google Chrome';
                break;
            case 'linux':
                chrome = 'google-chrome';
                break;
            default:
                chrome = 'Google Chrome';
        }
        return chrome;
    };
    return {
        src: {
            path: 'http://<%= serve.host %>:<%= serve.port %>/test',
            options: {
                delay: 5
            },
            app: getChromeName()
        }
    };
};
