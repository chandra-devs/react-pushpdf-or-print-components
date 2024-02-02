"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PushPrintComponents = void 0;
var tslib_1 = require("tslib");
var React = require("react");
var ReactDOM = require("react-dom");
var html2canvas_1 = require("html2canvas");
var jspdf_1 = require("jspdf");
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
        _this.pushPdfToApi = function () {
            var _a = _this.props.pushPdfTo, url = _a.url, method = _a.method, headers = _a.headers;
            (0, html2canvas_1.default)(_this.rootEl).then(function (canvas) {
                var imgData = canvas.toDataURL('image/png');
                var pdf = new jspdf_1.default();
                // A4 size page of PDF
                var imgWidth = 210;
                var imgHeight = canvas.height * imgWidth / canvas.width;
                pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
                var blob = pdf.output('blob');
                // Make the API call here
                fetch(url, {
                    method: method,
                    headers: headers,
                    body: blob
                });
            });
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
            return el;
        };
        _this.createStyle = function () { return (React.createElement("style", { dangerouslySetInnerHTML: { __html: "\n      #".concat(_this.rootId, " {\n        display: none;\n      }\n\n      @media print {\n        body > *:not(#").concat(_this.rootId, ") {\n          display: none;\n        }\n\n        #").concat(_this.rootId, " {\n          display: block;\n        }\n      }\n    ") } })); };
        _this.rootEl = _this.createDivElement(_this.rootId, props.className);
        return _this;
    }
    PushPrintComponents.prototype.render = function () {
        var _a = this.props, children = _a.children, trigger = _a.trigger, pushTrigger = _a.pushTrigger;
        var content = (React.createElement(React.Fragment, null,
            this.createStyle(),
            children));
        return (React.createElement(React.Fragment, null,
            React.cloneElement(trigger, tslib_1.__assign(tslib_1.__assign({}, trigger.props), { onClick: this.handlePrint })),
            React.cloneElement(pushTrigger, tslib_1.__assign(tslib_1.__assign({}, pushTrigger.props), { onClick: this.pushPdfToApi })),
            ReactDOM.createPortal(content, this.rootEl)));
    };
    return PushPrintComponents;
}(React.Component));
exports.PushPrintComponents = PushPrintComponents;
exports.default = PushPrintComponents;
//# sourceMappingURL=index.js.map