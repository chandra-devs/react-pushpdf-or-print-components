"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PushPrintComponents = void 0;
var tslib_1 = require("tslib");
var React = tslib_1.__importStar(require("react"));
var ReactDOM = tslib_1.__importStar(require("react-dom"));
var dom_to_image_1 = tslib_1.__importDefault(require("dom-to-image"));
var tslib = tslib_1.__importStar(require("tslib"));
var jspdf_1 = tslib_1.__importDefault(require("jspdf"));
var PushPrintComponents = /** @class */ (function (_super) {
    tslib_1.__extends(PushPrintComponents, _super);
    function PushPrintComponents(props) {
        var _this = _super.call(this, props) || this;
        _this.rootId = 'react-components-print';
        _this.canvasRef = React.useRef(null);
        _this.handlePrint = function () {
            document.body.insertAdjacentElement('afterbegin', _this.rootEl);
            window.onafterprint = _this.onPrintClose;
            window.print();
        };
        _this.generatePdf = function () {
            // Check if this.rootEl is initialized
            if (!_this.rootEl) {
                console.error('Error: this.rootEl is not initialized.');
                return;
            }
            // Temporarily set the rootEl to display: block;
            _this.rootEl.style.display = 'block';
            // Add a slight delay to ensure the element is ready
            setTimeout(function () {
                if (_this.canvasRef.current) {
                    dom_to_image_1.default.toPng(_this.canvasRef.current)
                        .then(function (dataUrl) {
                        var img = new Image();
                        console.log('dataUrl:', dataUrl);
                        img.src = dataUrl;
                        console.log('img:', img);
                        img.onload = function () {
                            var pdf = new jspdf_1.default({
                                orientation: 'portrait',
                                unit: 'px',
                                format: [img.width, img.height]
                            });
                            pdf.addImage(dataUrl, 'PNG', 0, 0, img.width, img.height);
                            pdf.save('document.pdf'); // Optional: save locally
                            // Call the onPdf callback if it exists
                            if (_this.props.onPdf) {
                                _this.props.onPdf(pdf);
                            }
                            // Set the rootEl back to display: none;
                            _this.rootEl.style.display = 'none';
                        };
                    })
                        .catch(function (error) {
                        console.error('Error converting to image:', error);
                        // Set the rootEl back to display: none;
                        _this.rootEl.style.display = 'none';
                    });
                }
            }, 500); // Delay of 500ms
        };
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
            // add canvasref to the element if it exists
            if (_this.canvasRef.current) {
                el.appendChild(_this.canvasRef.current);
            }
            return el;
        };
        _this.createStyle = function () { return (React.createElement("style", { dangerouslySetInnerHTML: {
                __html: "\n      #".concat(_this.rootId, " {\n        display: none;\n      }\n\n      @media print {\n        body > *:not(#").concat(_this.rootId, ") {\n          display: none;\n        }\n\n        #").concat(_this.rootId, " {\n          display: block;\n        }\n      }\n    ")
            } })); };
        _this.rootEl = _this.createDivElement(_this.rootId, props.className);
        return _this;
    }
    PushPrintComponents.prototype.render = function () {
        var _a = this.props, children = _a.children, trigger = _a.trigger, generatePdfTrigger = _a.generatePdfTrigger;
        var content = (React.createElement(React.Fragment, null,
            this.createStyle(),
            children,
            React.createElement("div", { ref: this.canvasRef })));
        return (React.createElement(React.Fragment, null,
            React.cloneElement(trigger, tslib.__assign({}, trigger.props, { onClick: this.handlePrint })),
            React.cloneElement(generatePdfTrigger, tslib.__assign({}, generatePdfTrigger.props, { onClick: this.generatePdf })),
            ReactDOM.createPortal(content, this.rootEl)));
    };
    return PushPrintComponents;
}(React.Component));
exports.PushPrintComponents = PushPrintComponents;
exports.default = PushPrintComponents;
//# sourceMappingURL=index.js.map