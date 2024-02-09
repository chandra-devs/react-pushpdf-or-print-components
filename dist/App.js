"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var react_bootstrap_1 = require("react-bootstrap");
var index_1 = tslib_1.__importDefault(require("../src/index")); // Import the missing PushComponent module
// import PushComponent from '../dist/index'; // Import the missing PushComponent module
var App = function () {
    return (react_1.default.createElement("div", null,
        react_1.default.createElement("div", null,
            react_1.default.createElement("p", { style: { fontSize: "1em" } }, "Main Content")),
        react_1.default.createElement(index_1.default, { printTrigger: react_1.default.createElement(react_bootstrap_1.Button, null, "Print"), generatePdfTrigger: react_1.default.createElement(react_bootstrap_1.Button, null, "Get PDF"), showPreviewTrigger: react_1.default.createElement(react_bootstrap_1.Button, null, "Share"), previewOptions: {
                title: 'Share Sample Page',
                formFields: [
                    { name: 'title', label: 'Title', type: 'text', validation: { required: true } },
                    { name: 'reportType', label: 'Report Type', type: 'select', defaultValue: 'Discharge Report, Doctor Notes', validation: { required: true } },
                    {
                        name: 'notes',
                        label: 'Notes',
                        type: 'textarea',
                        rows: 5,
                        validation: { required: true }
                    }
                ],
                description: 'The following content will be shared with the patient. Please fill in the required fields.',
                pdfFileName: '454687465.pdf',
                submitButtonText: 'Share to Patient',
                cancelButtonText: 'Cancel',
                onSubmit: function (data) {
                    console.log('Submitted Data:', data);
                },
                width: '70%',
                left: '15%'
            }, onPdf: function (pdf) {
                pdf.save('test.pdf');
            }, style: { fontSize: "15px" } },
            react_1.default.createElement("div", null,
                react_1.default.createElement("h1", null, "Sample Page"),
                react_1.default.createElement("p", { style: { fontSize: "1em" } }, "This is a sample page to demonstrate the usage of the PushComponent")))));
};
exports.default = App;
//# sourceMappingURL=App.js.map