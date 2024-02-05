"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildConvertOptions = void 0;
var tslib_1 = require("tslib");
var constants_1 = require("./constants");
var buildConvertOptions = function (options) {
    if (!options) {
        return constants_1.DEFAULT_OPTIONS;
    }
    return tslib_1.__assign(tslib_1.__assign(tslib_1.__assign({}, constants_1.DEFAULT_OPTIONS), options), { canvas: tslib_1.__assign(tslib_1.__assign({}, constants_1.DEFAULT_OPTIONS.canvas), options.canvas), page: tslib_1.__assign(tslib_1.__assign({}, constants_1.DEFAULT_OPTIONS.page), options.page) });
};
exports.buildConvertOptions = buildConvertOptions;
//# sourceMappingURL=utils.js.map