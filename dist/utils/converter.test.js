"use strict";
/**
 * @jest-environment jsdom
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPageSnapshotObject = void 0;
var tslib_1 = require("tslib");
var globals_1 = require("@jest/globals");
var constants_1 = require("./constants");
var converter_1 = tslib_1.__importDefault(require("./converter"));
var utils_1 = require("./utils");
var createPageSnapshotObject = function (converter, pageNumber) {
    return {
        pageNumber: pageNumber,
        offsetY: converter.getCanvasOffsetY(pageNumber),
        heightLeft: converter.getCanvasHeightLeft(pageNumber),
        pageCanvasHeight: converter.getCanvasPageHeight(pageNumber),
        pageCanvasWidth: converter.getCanvasPageWidth(),
        canvas: {
            height: converter.canvas.height,
            width: converter.canvas.width,
            originalWidth: converter.canvas.width / converter.getScale(),
            originalHeight: converter.canvas.height / converter.getScale(),
        },
        horizontalFitFactor: converter.getHorizontalFitFactor(),
        scale: converter.getScale(),
        pageWidthMM: converter.getPageWidthMM(),
        pageHeightMM: converter.getPageHeightMM(),
        pageWidth: converter.getPageWidth(),
        pageHeight: converter.getPageHeight(),
        availableHeight: converter.getPageAvailableHeight(),
        availableWidth: converter.getPageAvailableWidth(),
        availableHeightScaled: converter.getPageAvailableHeight() * converter.getScale(),
        availableWidthScaled: converter.getPageAvailableWidth() * converter.getScale(),
        margin: converter.options.page.margin,
        numberPages: converter.getNumberPages(),
    };
};
exports.createPageSnapshotObject = createPageSnapshotObject;
var defaultCanvasDimensions = {
    width: 2000,
    height: 10000,
};
var setupConverter = function (options, canvasDimensions) {
    if (canvasDimensions === void 0) { canvasDimensions = defaultCanvasDimensions; }
    var canvas = document.createElement("canvas");
    canvas.setAttribute("width", String(canvasDimensions.width));
    canvas.setAttribute("height", String(canvasDimensions.height));
    var convertOptions = (0, utils_1.buildConvertOptions)(options);
    return new converter_1.default(canvas, convertOptions);
};
var resolutionsTestSet = Object.keys(constants_1.Resolution)
    .filter(function (key) { return isNaN(Number(key)); })
    .map(function (key) { return constants_1.Resolution[key]; });
var marginsTestTest = Object.keys(constants_1.Margin)
    .filter(function (key) { return isNaN(Number(key)); })
    .map(function (key) { return constants_1.Resolution[key]; });
var canvasDimensionsTestSet = [
    {
        width: 2000,
        height: 10000,
    },
    {
        width: 20000,
        height: 100,
    },
];
var buildTestSet = function () {
    var testSet = [];
    for (var _i = 0, resolutionsTestSet_1 = resolutionsTestSet; _i < resolutionsTestSet_1.length; _i++) {
        var resolution = resolutionsTestSet_1[_i];
        for (var _a = 0, marginsTestTest_1 = marginsTestTest; _a < marginsTestTest_1.length; _a++) {
            var margin = marginsTestTest_1[_a];
            for (var _b = 0, canvasDimensionsTestSet_1 = canvasDimensionsTestSet; _b < canvasDimensionsTestSet_1.length; _b++) {
                var canvasDimensions = canvasDimensionsTestSet_1[_b];
                testSet.push([
                    "Resolution: ".concat(resolution, ", Margin: ").concat(margin, ", Dimensions: ").concat(canvasDimensions.height, "x").concat(canvasDimensions.width),
                    {
                        resolution: resolution,
                        page: {
                            margin: margin,
                        },
                    },
                    canvasDimensions,
                ]);
            }
        }
    }
    return testSet;
};
var testSet = buildTestSet();
describe("Converter", function () {
    globals_1.test.each(testSet)("%s", function (_, options, canvasDimensions) {
        buildTestSet();
        var converter = setupConverter(options, canvasDimensions);
        var numberPages = converter.getNumberPages();
        var pageNumber = 1;
        while (pageNumber <= numberPages) {
            (0, globals_1.expect)((0, exports.createPageSnapshotObject)(converter, pageNumber)).toMatchSnapshot();
            pageNumber += 1;
        }
    });
});
//# sourceMappingURL=converter.test.js.map