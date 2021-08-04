"use strict";
exports.__esModule = true;
exports.install = exports.supports = void 0;
var tslib_1 = require("tslib");
var path_1 = tslib_1.__importDefault(require("path"));
var module_1 = tslib_1.__importDefault(require("module"));
var source_map_support_1 = tslib_1.__importDefault(require("source-map-support"));
var esbuild_1 = require("./esbuild");
var Module = module_1["default"];
/**
 * source map
 */
var map = {};
/**
 * adds source map support
 */
function installSourceMapSupport() {
    source_map_support_1["default"].install({
        environment: 'node',
        hookRequire: true,
        handleUncaughtExceptions: false,
        retrieveSourceMap: function (file) {
            if (map[file]) {
                return {
                    url: file,
                    map: map[file]
                };
            }
            return null;
        }
    });
}
function supports(filename) {
    if (filename.includes('node_modules'))
        return false;
    return path_1["default"].extname(filename).includes('.ts');
}
exports.supports = supports;
function install() {
    installSourceMapSupport();
    var defaultLoader = Module._extensions['.js'];
    Module._extensions['.ts'] = function (mod, filename) {
        if (supports(filename)) {
            // save raw _compile
            var defaultCompile_1 = mod._compile;
            mod._compile = function (code) {
                // transform code
                var _a = esbuild_1.compile(code, filename), js = _a.code, sourceMap = _a.map;
                map[filename] = sourceMap;
                // reset _compile
                mod._compile = defaultCompile_1;
                return mod._compile(js, filename);
            };
        }
        defaultLoader(mod, filename);
    };
}
exports.install = install;
//# sourceMappingURL=hook.js.map