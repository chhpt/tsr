"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
exports.compile = void 0;
var esbuild_1 = require("esbuild");
/**
 * transform typescript to javascript
 */
var compile = function (code, filename, options) {
    // node target
    var target = ["node" + process.version.slice(1)];
    return esbuild_1.transformSync(code, __assign({ target: target, loader: 'ts', format: 'cjs', sourcemap: 'both', sourcefile: filename }, options));
};
exports.compile = compile;
//# sourceMappingURL=esbuild.js.map