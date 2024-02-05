"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var jspdf_1 = tslib_1.__importDefault(require("jspdf"));
var constants_1 = require("./constants");
var Converter = /** @class */ (function () {
    function Converter(canvas, options) {
        this.canvas = canvas;
        this.options = options;
        this.pdf = new jspdf_1.default(tslib_1.__assign(tslib_1.__assign({ format: this.options.page && this.options.page.format, orientation: this.options.page && this.options.page.orientation }, (this.options.overrides && this.options.overrides.pdf)), { unit: "mm" }));
    }
    Converter.prototype.getMarginTopMM = function () {
        if (!this.options.page) {
            return 0; // or some default value
        }
        var margin = typeof this.options.page.margin === "object"
            ? this.options.page && this.options.page.margin.top
            : this.options.page && this.options.page.margin;
        return Number(margin);
    };
    Converter.prototype.getMarginLeftMM = function () {
        if (!this.options.page) {
            return 0; // or some default value
        }
        var margin = typeof this.options.page.margin === "object"
            ? this.options.page && this.options.page.margin.left
            : this.options.page && this.options.page.margin;
        return Number(margin);
    };
    Converter.prototype.getMarginRightMM = function () {
        if (!this.options.page) {
            return 0; // or some default value
        }
        var margin = typeof this.options.page.margin === "object"
            ? this.options.page && this.options.page.margin.right
            : this.options.page && this.options.page.margin;
        return Number(margin);
    };
    Converter.prototype.getMarginBottomMM = function () {
        if (!this.options.page) {
            return 0; // or some default value
        }
        var margin = typeof this.options.page.margin === "object"
            ? this.options.page && this.options.page.margin.bottom
            : this.options.page && this.options.page.margin;
        return Number(margin);
    };
    Converter.prototype.getMarginTop = function () {
        return this.getMarginTopMM() * constants_1.MM_TO_PX;
    };
    Converter.prototype.getMarginBottom = function () {
        return this.getMarginBottomMM() * constants_1.MM_TO_PX;
    };
    Converter.prototype.getMarginLeft = function () {
        return this.getMarginLeftMM() * constants_1.MM_TO_PX;
    };
    Converter.prototype.getMarginRight = function () {
        return this.getMarginRightMM() * constants_1.MM_TO_PX;
    };
    Converter.prototype.getScale = function () {
        return this.options.resolution;
    };
    Converter.prototype.getPageHeight = function () {
        return this.getPageHeightMM() * constants_1.MM_TO_PX;
    };
    Converter.prototype.getPageHeightMM = function () {
        return this.pdf.internal.pageSize.height;
    };
    Converter.prototype.getPageWidthMM = function () {
        return this.pdf.internal.pageSize.width;
    };
    Converter.prototype.getPageWidth = function () {
        return this.getPageWidthMM() * constants_1.MM_TO_PX;
    };
    Converter.prototype.getOriginalCanvasWidth = function () {
        if (!this.canvas) {
            return 0; // or some default value
        }
        var scale = this.getScale();
        if (scale === undefined) {
            throw new Error("Scale is undefined");
        }
        return this.canvas.width / scale;
    };
    Converter.prototype.getOriginalCanvasHeight = function () {
        if (!this.canvas) {
            return 0; // or some default value
        }
        var scale = this.getScale();
        if (scale === undefined) {
            throw new Error("Scale is undefined");
        }
        return this.canvas.height / scale;
    };
    Converter.prototype.getCanvasPageAvailableHeight = function () {
        if (!this.canvas) {
            return 0; // or some default value
        }
        var scale = this.getScale();
        if (scale === undefined) {
            throw new Error("Scale is undefined");
        }
        return (this.getPageAvailableHeight() * scale * this.getHorizontalFitFactor());
    };
    Converter.prototype.getPageAvailableWidth = function () {
        return this.getPageWidth() - (this.getMarginLeft() + this.getMarginRight());
    };
    Converter.prototype.getPageAvailableHeight = function () {
        return (this.getPageHeight() - (this.getMarginTop() + this.getMarginBottom()));
    };
    Converter.prototype.getPageAvailableWidthMM = function () {
        return this.getPageAvailableWidth() / constants_1.MM_TO_PX;
    };
    Converter.prototype.getPageAvailableHeightMM = function () {
        return this.getPageAvailableHeight() / constants_1.MM_TO_PX;
    };
    Converter.prototype.getNumberPages = function () {
        return Math.ceil(this.canvas.height / this.getCanvasPageAvailableHeight());
    };
    Converter.prototype.getHorizontalFitFactor = function () {
        if (this.getPageAvailableWidth() < this.getOriginalCanvasWidth()) {
            return this.getOriginalCanvasWidth() / this.getPageAvailableWidth();
        }
        return 1;
    };
    Converter.prototype.getCanvasOffsetY = function (pageNumber) {
        return this.getCanvasPageAvailableHeight() * (pageNumber - 1);
    };
    Converter.prototype.getCanvasHeightLeft = function (pageNumber) {
        return this.canvas.height - this.getCanvasOffsetY(pageNumber);
    };
    Converter.prototype.getCanvasPageHeight = function (pageNumber) {
        if (this.canvas.height < this.getCanvasPageAvailableHeight()) {
            return this.canvas.height;
        }
        var canvasHeightPending = this.getCanvasHeightLeft(pageNumber);
        return canvasHeightPending < this.getCanvasPageAvailableHeight()
            ? canvasHeightPending
            : this.getCanvasPageAvailableHeight();
    };
    Converter.prototype.getCanvasPageWidth = function () {
        return this.canvas.width;
    };
    Converter.prototype.createCanvasPage = function (pageNumber) {
        var canvasPageWidth = this.getCanvasPageWidth();
        var canvasPageHeight = this.getCanvasPageHeight(pageNumber);
        var canvasPage = document.createElement("canvas");
        canvasPage.setAttribute("width", String(canvasPageWidth));
        canvasPage.setAttribute("height", String(canvasPageHeight));
        var ctx = canvasPage.getContext("2d");
        if (ctx === null) {
            throw new Error("Failed to get 2D context");
        }
        ctx.drawImage(this.canvas, 0, this.getCanvasOffsetY(pageNumber), this.canvas.width, canvasPageHeight, 0, 0, this.canvas.width, canvasPageHeight);
        return canvasPage;
    };
    Converter.prototype.convert = function () {
        var pageNumber = 1;
        var numberPages = this.getNumberPages();
        var scale = this.getScale();
        if (!this.options.page) {
            return this.pdf;
        }
        if (!this.options.canvas) {
            return this.pdf;
        }
        if (scale === undefined) {
            throw new Error("Scale is undefined");
        }
        while (pageNumber <= numberPages) {
            if (pageNumber > 1) {
                this.pdf.addPage(this.options.page.format, this.options.page.orientation);
            }
            var canvasPage = this.createCanvasPage(pageNumber);
            var pageImageDataURL = canvasPage.toDataURL(this.options.canvas.mimeType, this.options.canvas.qualityRatio);
            this.pdf.setPage(pageNumber);
            this.pdf.addImage({
                imageData: pageImageDataURL,
                width: canvasPage.width / (scale * constants_1.MM_TO_PX * this.getHorizontalFitFactor()),
                height: canvasPage.height /
                    (scale * constants_1.MM_TO_PX * this.getHorizontalFitFactor()),
                x: this.getMarginLeftMM(),
                y: this.getMarginTopMM(),
            });
            pageNumber += 1;
        }
        return this.pdf;
    };
    return Converter;
}());
exports.default = Converter;
//# sourceMappingURL=converter.js.map