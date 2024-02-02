"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PushPrintComponents = void 0;
var tslib_1 = require("tslib");
var React = require("react");
var ReactDOM = require("react-dom");
var dom_to_image_1 = require("dom-to-image");
var tslib = require("tslib");
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
            dom_to_image_1.default.toPng(_this.rootEl)
                .then(function (dataUrl) {
                var img = new Image();
                img.src = dataUrl;
                img.onload = function () {
                    var pdf = new jspdf_1.default({
                        orientation: 'portrait',
                        unit: 'px',
                        format: [img.width, img.height]
                    });
                    pdf.addImage(dataUrl, 'PNG', 0, 0, img.width, img.height);
                    pdf.save('document.pdf'); // Optional: save locally
                    var blob = pdf.output('blob');
                    var formData = new FormData();
                    formData.append("file", blob, "document.pdf");
                    // Perform the API call
                    fetch(url, {
                        method: method,
                        headers: headers,
                        body: formData,
                    })
                        .then(function (response) { return response.json(); })
                        .then(function (data) { return console.log(data); })
                        .catch(function (error) { return console.error(error); });
                };
            })
                .catch(function (error) {
                console.error('Error converting to image:', error);
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
            React.cloneElement(trigger, tslib.__assign({}, trigger.props, { onClick: this.handlePrint })),
            React.cloneElement(pushTrigger, tslib.__assign({}, pushTrigger.props, { onClick: this.pushPdfToApi })),
            ReactDOM.createPortal(content, this.rootEl)));
    };
    return PushPrintComponents;
}(React.Component));
exports.PushPrintComponents = PushPrintComponents;
exports.default = PushPrintComponents;
//# sourceMappingURL=index.js.map