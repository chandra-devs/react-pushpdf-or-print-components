"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PushPrintComponents = void 0;
var tslib_1 = require("tslib");
var React = tslib_1.__importStar(require("react"));
var ReactDOM = tslib_1.__importStar(require("react-dom"));
require("./PushPrintComponents.css");
var index_1 = tslib_1.__importStar(require("./utils/index"));
var Preview_1 = tslib_1.__importDefault(require("./utils/Preview"));
var tslib = tslib_1.__importStar(require("tslib"));
var PushPrintComponents = /** @class */ (function (_super) {
    tslib_1.__extends(PushPrintComponents, _super);
    function PushPrintComponents(props) {
        var _this = _super.call(this, props) || this;
        _this.rootId = 'react-components-print';
        _this.handlePrint = function () {
            document.body.insertAdjacentElement('afterbegin', _this.rootEl);
            window.onafterprint = _this.onPrintClose;
            window.print();
        };
        _this.showPreview = function () {
            _this.setState({ showPreview: true });
        };
        _this.closePreview = function () {
            _this.setState({ showPreview: false });
        };
        _this.generatePdf = function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var options, pdfBlob, error_1;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        options = {
                            filename: "output.pdf",
                            resolution: index_1.Resolution.EXTREME,
                            page: {
                                margin: index_1.Margin.SMALL,
                                format: "a4",
                                orientation: "portrait"
                            },
                            canvas: {
                                mimeType: "image/jpeg",
                                qualityRatio: 1
                            },
                            overrides: {
                                pdf: {
                                    compress: true
                                },
                                canvas: {
                                    useCORS: true
                                }
                            }
                        };
                        // Ensure the element is in the DOM before generating the PDF
                        document.body.appendChild(this.rootEl);
                        // enable element to display before generating pdf
                        this.rootEl.style.display = 'block';
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, 4, 5]);
                        return [4 /*yield*/, (0, index_1.default)(function () { return _this.rootEl; }, options)];
                    case 2:
                        pdfBlob = _a.sent();
                        if (typeof this.props.onPdf === 'function') {
                            this.props.onPdf(pdfBlob);
                        }
                        // disable element after generating pdf
                        this.rootEl.style.display = 'none';
                        return [3 /*break*/, 5];
                    case 3:
                        error_1 = _a.sent();
                        console.error('Error generating PDF:', error_1);
                        // disable element on error
                        this.rootEl.style.display = 'none';
                        return [3 /*break*/, 5];
                    case 4:
                        // Remove the element from the DOM when done
                        document.body.removeChild(this.rootEl);
                        // disable element after removing from the DOM
                        this.rootEl.style.display = 'none';
                        return [7 /*endfinally*/];
                    case 5: return [2 /*return*/];
                }
            });
        }); };
        _this.onPrintClose = function () {
            window.onafterprint = function () { return null; };
            _this.rootEl.remove();
        };
        _this.createDivElement = function (id, className) {
            var el = document.createElement('div');
            if (id)
                el.setAttribute('id', id);
            if (className)
                el.setAttribute('class', className);
            return el;
        };
        _this.createStyle = function () { return (React.createElement("style", { dangerouslySetInnerHTML: {
                __html: "\n      #".concat(_this.rootId, " {\n        display: none;\n      }\n\n      @media print {\n        body > *:not(#").concat(_this.rootId, ") {\n          display: none;\n        }\n\n        #").concat(_this.rootId, " {\n          display: block;\n        }\n      }\n    ")
            } })); };
        _this.rootEl = _this.createDivElement(_this.rootId, props.className);
        _this.state = {
            showPreview: false
        };
        return _this;
    }
    PushPrintComponents.prototype.render = function () {
        var _a = this.props, children = _a.children, printTrigger = _a.printTrigger, generatePdfTrigger = _a.generatePdfTrigger, showPreviewTrigger = _a.showPreviewTrigger, previewOptions = _a.previewOptions;
        var content = (React.createElement(React.Fragment, null,
            this.createStyle(),
            children));
        return (React.createElement("div", { className: 'react-components-print' },
            printTrigger && React.cloneElement(printTrigger, tslib.__assign({}, printTrigger.props, { onClick: this.handlePrint })),
            generatePdfTrigger && React.cloneElement(generatePdfTrigger, tslib.__assign({}, generatePdfTrigger.props, { onClick: this.generatePdf })),
            showPreviewTrigger && React.cloneElement(showPreviewTrigger, tslib.__assign({}, showPreviewTrigger.props, { onClick: this.showPreview })),
            ReactDOM.createPortal(content, this.rootEl),
            this.state.showPreview && React.createElement(Preview_1.default, { style: tslib_1.__assign(tslib_1.__assign({}, this.props.style), { width: (previewOptions === null || previewOptions === void 0 ? void 0 : previewOptions.width) || "50%", left: (previewOptions === null || previewOptions === void 0 ? void 0 : previewOptions.left) || "25%" }), previewPosition: 'right', closePreview: this.closePreview, children: children, previewOptions: previewOptions })));
    };
    return PushPrintComponents;
}(React.Component));
exports.PushPrintComponents = PushPrintComponents;
exports.default = PushPrintComponents;
//# sourceMappingURL=index.js.map