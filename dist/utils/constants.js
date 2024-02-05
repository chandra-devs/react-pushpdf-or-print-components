"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DEFAULT_OPTIONS = exports.Margin = exports.Resolution = exports.MM_TO_PX = void 0;
exports.MM_TO_PX = 3.77952755906;
var Resolution;
(function (Resolution) {
    Resolution[Resolution["LOW"] = 1] = "LOW";
    Resolution[Resolution["NORMAL"] = 2] = "NORMAL";
    Resolution[Resolution["MEDIUM"] = 3] = "MEDIUM";
    Resolution[Resolution["HIGH"] = 7] = "HIGH";
    Resolution[Resolution["EXTREME"] = 12] = "EXTREME";
})(Resolution || (exports.Resolution = Resolution = {}));
var Margin;
(function (Margin) {
    Margin[Margin["NONE"] = 0] = "NONE";
    Margin[Margin["SMALL"] = 5] = "SMALL";
    Margin[Margin["MEDIUM"] = 10] = "MEDIUM";
    Margin[Margin["LARGE"] = 25] = "LARGE";
})(Margin || (exports.Margin = Margin = {}));
exports.DEFAULT_OPTIONS = {
    method: "save",
    resolution: Resolution.MEDIUM,
    page: {
        margin: Margin.NONE,
        format: "A4",
        orientation: "portrait",
    },
    canvas: {
        mimeType: "image/jpeg",
        qualityRatio: 1,
        useCORS: true,
        logging: false,
    },
    overrides: {},
};
//# sourceMappingURL=constants.js.map