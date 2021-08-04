"use strict";
exports.__esModule = true;
exports.main = void 0;
var tslib_1 = require("tslib");
var fs_1 = tslib_1.__importDefault(require("fs"));
var path_1 = tslib_1.__importDefault(require("path"));
var module_1 = tslib_1.__importDefault(require("module"));
var hook_1 = require("./hook");
function help() {
    console.log("Usage: tsr <ts-file>\n  --help, -h     Display help message");
    process.exit(1);
}
function parseArgs() {
    var nodePath = process.argv[0];
    var args = process.argv.slice(2);
    var options = { debug: false };
    for (var i = 0; i < args.length; i++) {
        var arg = args[i];
        switch (arg) {
            case '-h':
            case '--help':
                help();
                continue;
            default:
                args = args.slice(i);
                args.unshift(nodePath);
                return { options: options, args: args };
        }
    }
    return { options: options, args: [nodePath] };
}
function main() {
    /**
     * args[0] node path
     * args[1] ts file path
     */
    var args = parseArgs().args;
    if (args.length >= 2 && fs_1["default"].existsSync(args[1])) {
        process.argv = args;
        process.argv[1] = path_1["default"].resolve(process.argv[1]);
        hook_1.install();
        module_1["default"].runMain();
    }
    else {
        help();
    }
}
exports.main = main;
//# sourceMappingURL=cli.js.map