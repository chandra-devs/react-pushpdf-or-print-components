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
    var options, targetElement, canvas, converter, pdf, _a, pdfOutput, filename, file, pdfFilename;
    var _b, _c, _d;
    return tslib_1.__generator(this, function (_e) {
        switch (_e.label) {
            case 0:
                options = (0, utils_1.buildConvertOptions)(customOptions);
                targetElement = getTargetElement(targetRefOrFunction);
                if (!targetElement) {
                    console.error("Unable to get the target element.");
                    return [2 /*return*/, new jspdf_1.default()];
                }
                return [4 /*yield*/, new Promise(function (resolve) {
                        targetElement.addEventListener('load', resolve); // Check for images, iframes, etc.
                        targetElement.style.overflow = "visible"; // Change overflow to visible
                        setTimeout(resolve, 2000); // A failsafe timeout 
                    })];
            case 1:
                _e.sent();
                targetElement.style.backgroundColor = "white";
                console.log('targetElement:', targetElement);
                console.log('height:', targetElement.scrollHeight);
                return [4 /*yield*/, (0, html2canvas_1.default)(targetElement, tslib_1.__assign({ useCORS: options.canvas.useCORS, 
                        // logging: options.canvas.logging,
                        allowTaint: true, scale: 2, backgroundColor: "white", height: targetElement.scrollHeight }, (_b = options.overrides) === null || _b === void 0 ? void 0 : _b.canvas))];
            case 2:
                canvas = _e.sent();
                converter = new converter_1.default(canvas, options);
                pdf = converter.convert();
                _a = options.method;
                switch (_a) {
                    case "build": return [3 /*break*/, 3];
                    case "open": return [3 /*break*/, 4];
                    case "buildAndCreateFile": return [3 /*break*/, 5];
                    case "save": return [3 /*break*/, 6];
                }
                return [3 /*break*/, 6];
            case 3: return [2 /*return*/, pdf];
            case 4:
                {
                    window.open(pdf.output("bloburl"), "_blank");
                    targetElement.style.overflow = "scroll"; // Change overflow to visible
                    return [2 /*return*/, pdf];
                }
                _e.label = 5;
            case 5:
                {
                    pdfOutput = pdf.output("blob");
                    filename = (_c = options.filename) !== null && _c !== void 0 ? _c : "".concat(new Date().getTime(), ".pdf");
                    file = new File([pdfOutput], filename, { type: 'application/pdf' });
                    targetElement.style.overflow = "scroll"; // Change overflow to visible
                    return [2 /*return*/, file];
                }
                _e.label = 6;
            case 6:
                pdfFilename = (_d = options.filename) !== null && _d !== void 0 ? _d : "".concat(new Date().getTime(), ".pdf");
                return [4 /*yield*/, pdf.save(pdfFilename, { returnPromise: true })];
            case 7:
                _e.sent();
                return [2 /*return*/, pdf];
        }
    });
}); };
var generatePDFFile = function (targetRefOrFunction, customOptions) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    var options, targetElement, A4_HEIGHT, A4_WIDTH, contentHeight, pageCount, pdf, i, top_1, canvas, imgData, pdfOutput, filename, file, pdfFilename;
    var _a, _b;
    return tslib_1.__generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                options = (0, utils_1.buildConvertOptions)(customOptions);
                targetElement = getTargetElement(targetRefOrFunction);
                if (!targetElement) {
                    console.error("Unable to get the target element.");
                    return [2 /*return*/, new jspdf_1.default()];
                }
                return [4 /*yield*/, new Promise(function (resolve) {
                        targetElement.addEventListener('load', resolve);
                        targetElement.style.overflow = "visible";
                        setTimeout(resolve, 2000);
                    })];
            case 1:
                _c.sent();
                targetElement.style.backgroundColor = "white";
                console.log('targetElement:', targetElement);
                console.log('height:', targetElement.scrollHeight);
                A4_HEIGHT = 595 * 2;
                A4_WIDTH = 842 * 2;
                contentHeight = targetElement.scrollHeight;
                pageCount = Math.ceil(contentHeight / A4_HEIGHT);
                pdf = new jspdf_1.default('p', 'px', 'a4');
                targetElement.style.overflow = 'hidden';
                i = 0;
                _c.label = 2;
            case 2:
                if (!(i < pageCount)) return [3 /*break*/, 5];
                top_1 = i * A4_HEIGHT;
                return [4 /*yield*/, (0, html2canvas_1.default)(targetElement, {
                        y: top_1,
                        height: A4_HEIGHT,
                        width: A4_WIDTH,
                        // useCORS: options.canvas.useCORS,
                        // logging: options.canvas.logging,
                        allowTaint: true,
                        scale: 0.98,
                        backgroundColor: "white",
                        // ...options.overrides?.canvas,
                    })];
            case 3:
                canvas = _c.sent();
                // Logging for analysis
                // console.log(`Page ${i+1}:`, top, height); 
                console.log('Canvas Preview:', canvas.toDataURL().substring(0, 50));
                imgData = canvas.toDataURL('image/png');
                if (i > 0) {
                    pdf.addPage();
                }
                pdf.addImage(imgData, 'PNG', 0, 0, A4_WIDTH, A4_HEIGHT);
                if (i < pageCount - 1) {
                    targetElement.style.overflow = 'visible';
                }
                _c.label = 4;
            case 4:
                i++;
                return [3 /*break*/, 2];
            case 5:
                if (!(options.method === "build")) return [3 /*break*/, 6];
                return [2 /*return*/, pdf];
            case 6:
                if (!(options.method === "open")) return [3 /*break*/, 7];
                window.open(pdf.output("bloburl"), "_blank");
                targetElement.style.overflow = "scroll";
                return [2 /*return*/, pdf];
            case 7:
                if (!(options.method === "buildAndCreateFile")) return [3 /*break*/, 8];
                pdfOutput = pdf.output("blob");
                filename = (_a = options.filename) !== null && _a !== void 0 ? _a : "".concat(new Date().getTime(), ".pdf");
                file = new File([pdfOutput], filename, { type: 'application/pdf' });
                targetElement.style.overflow = "scroll";
                return [2 /*return*/, file];
            case 8:
                pdfFilename = (_b = options.filename) !== null && _b !== void 0 ? _b : "".concat(new Date().getTime(), ".pdf");
                return [4 /*yield*/, pdf.save(pdfFilename, { returnPromise: true })];
            case 9:
                _c.sent();
                return [2 /*return*/, pdf];
        }
    });
}); };
exports.default = generatePDFFile;
//# sourceMappingURL=index.js.map