"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var react_bootstrap_1 = require("react-bootstrap");
var index_1 = tslib_1.__importDefault(require("../src/index")); // Import the missing PushComponent module
var App = function () {
    return (react_1.default.createElement("div", null,
        react_1.default.createElement("h1", null, "Hello, Kishore!"),
        react_1.default.createElement("p", null, "Welcome to your React application with TypeScript."),
        react_1.default.createElement(index_1.default, { trigger: react_1.default.createElement(react_bootstrap_1.Button, null, "Print"), generatePdfTrigger: react_1.default.createElement(react_bootstrap_1.Button, null, "Generate PDF"), onPdf: function (pdf) {
                pdf.save('test.pdf');
            } },
            react_1.default.createElement("div", null, "Content to print or save as PDF."))));
};
exports.default = App;
//# sourceMappingURL=App.js.map