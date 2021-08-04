"use strict";
exports.__esModule = true;
exports.compile = void 0;
var tslib_1 = require("tslib");
var esbuild_1 = require("esbuild");
/**
 * transform typescript to javascript
 */
var compile = function (code, filename, options) {
    // node target
    var target = ["node" + process.version.slice(1)];
    return esbuild_1.transformSync(code, tslib_1.__assign({ target: target, loader: 'ts', format: 'cjs', sourcemap: 'both', sourcefile: filename }, options));
};
exports.compile = compile;
//# sourceMappingURL=esbuild.js.map