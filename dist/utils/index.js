"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usePDF = exports.Margin = exports.Resolution = void 0;
var tslib_1 = require("tslib");
var react_1 = require("react");
var html2canvas_1 = tslib_1.__importDefault(require("html2canvas"));
var converter_1 = tslib_1.__importDefault(require("./converter"));
var utils_1 = require("./utils");
var jspdf_1 = tslib_1.__importDefault(require("jspdf"));
var constants_1 = require("./constants");
Object.defineProperty(exports, "Resolution", { enumerable: true, get: function () { return constants_1.Resolution; } });
Object.defineProperty(exports, "Margin", { enumerable: true, get: function () { return constants_1.Margin; } });
var getTargetElement = function (targetRefOrFunction) {
    if (typeof targetRefOrFunction === "function") {
        return targetRefOrFunction();
    }
    return targetRefOrFunction === null || targetRefOrFunction === void 0 ? void 0 : targetRefOrFunction.current;
};
var usePDF = function (usePDFoptions) {
    var targetRef = (0, react_1.useRef)();
    var toPDF = (0, react_1.useCallback)(function (toPDFoptions) {
        return generatePDF(targetRef, usePDFoptions !== null && usePDFoptions !== void 0 ? usePDFoptions : toPDFoptions);
    }, [targetRef, usePDFoptions]);
    return { targetRef: targetRef, toPDF: toPDF };
};
exports.usePDF = usePDF;
var generatePDF = function (targetRefOrFunction, customOptions) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    var options, targetElement, canvas, converter, pdf, _a, pdfFilename;
    var _b, _c;
    return tslib_1.__generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                options = (0, utils_1.buildConvertOptions)(customOptions);
                targetElement = getTargetElement(targetRefOrFunction);
                if (!targetElement) {
                    console.error("Unable to get the target element.");
                    return [2 /*return*/, new jspdf_1.default()];
                }
                return [4 /*yield*/, (0, html2canvas_1.default)(targetElement, tslib_1.__assign({ useCORS: options.canvas.useCORS, logging: options.canvas.logging, scale: options.resolution }, (_b = options.overrides) === null || _b === void 0 ? void 0 : _b.canvas))];
            case 1:
                canvas = _d.sent();
                converter = new converter_1.default(canvas, options);
                pdf = converter.convert();
                _a = options.method;
                switch (_a) {
                    case "build": return [3 /*break*/, 2];
                    case "open": return [3 /*break*/, 3];
                    case "save": return [3 /*break*/, 4];
                }
                return [3 /*break*/, 4];
            case 2: return [2 /*return*/, pdf];
            case 3:
                {
                    window.open(pdf.output("bloburl"), "_blank");
                    return [2 /*return*/, pdf];
                }
                _d.label = 4;
            case 4:
                pdfFilename = (_c = options.filename) !== null && _c !== void 0 ? _c : "".concat(new Date().getTime(), ".pdf");
                return [4 /*yield*/, pdf.save(pdfFilename, { returnPromise: true })];
            case 5:
                _d.sent();
                return [2 /*return*/, pdf];
        }
    });
}); };
exports.default = generatePDF;
//# sourceMappingURL=index.js.map