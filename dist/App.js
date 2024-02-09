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
            }, onPdf: function (pdf) {
                pdf.save('test.pdf');
            }, style: { fontSize: "15px" } },
            react_1.default.createElement("div", null,
                react_1.default.createElement("h1", null, "Sample Page"),
                react_1.default.createElement("p", { style: { fontSize: "1em" } }, "This is a sample page to demonstrate the usage of the PushComponent"),
                react_1.default.createElement("p", null, "Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium ipsam at maiores asperiores optio accusamus molestias quod, reprehenderit cupiditate dicta facere natus cumque reiciendis assumenda sit animi illum dignissimos pariatur?"),
                react_1.default.createElement("p", null, "Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit non iusto ipsam quidem officia sint quasi optio odit eaque nostrum excepturi illo voluptas, architecto asperiores incidunt eligendi, libero laudantium. Veritatis."),
                react_1.default.createElement("p", null, "Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium ipsam at maiores asperiores optio accusamus molestias quod, reprehenderit cupiditate dicta facere natus cumque reiciendis assumenda sit animi illum dignissimos pariatur?"),
                react_1.default.createElement("p", null, "Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit non iusto ipsam quidem officia sint quasi optio odit eaque nostrum excepturi illo voluptas, architecto asperiores incidunt eligendi, libero laudantium. Veritatis."),
                react_1.default.createElement("p", null, "Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium ipsam at maiores asperiores optio accusamus molestias quod, reprehenderit cupiditate dicta facere natus cumque reiciendis assumenda sit animi illum dignissimos pariatur?"),
                react_1.default.createElement("p", null, "Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit non iusto ipsam quidem officia sint quasi optio odit eaque nostrum excepturi illo voluptas, architecto asperiores incidunt eligendi, libero laudantium. Veritatis."),
                react_1.default.createElement("p", null, "Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium ipsam at maiores asperiores optio accusamus molestias quod, reprehenderit cupiditate dicta facere natus cumque reiciendis assumenda sit animi illum dignissimos pariatur?"),
                react_1.default.createElement("p", null, "SQLite plugin for Flutter. Supports iOS, Android and MacOS. Support transactions and batches Automatic version managment during open Helpers for insert/query/update/delete queries DB operation executed in a background thread on iOS and Android Other platforms support: Linux/Windows/DartVM support using sqflite_common_ffi Experimental Web support using sqflite_common_ffi_web. Usage example: notepad_sqflite: Simple flutter notepad working on iOS/Android/Windows/linux/Mac"),
                react_1.default.createElement("p", null, "Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit non iusto ipsam quidem officia sint quasi optio odit eaque nostrum excepturi illo voluptas, architecto asperiores incidunt eligendi, libero laudantium. Veritatis."),
                react_1.default.createElement("p", null, "Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium ipsam at maiores asperiores optio accusamus molestias quod, reprehenderit cupiditate dicta facere natus cumque reiciendis assumenda sit animi illum dignissimos pariatur?"),
                react_1.default.createElement("p", null, "Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit non iusto ipsam quidem officia sint quasi optio odit eaque nostrum excepturi illo voluptas, architecto asperiores incidunt eligendi, libero laudantium. Veritatis."),
                react_1.default.createElement("p", null, "Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium ipsam at maiores asperiores optio accusamus molestias quod, reprehenderit cupiditate dicta facere natus cumque reiciendis assumenda sit animi illum dignissimos pariatur?"),
                react_1.default.createElement("p", null, "Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit non iusto ipsam quidem officia sint quasi optio odit eaque nostrum excepturi illo voluptas, architecto asperiores incidunt eligendi, libero laudantium. Veritatis."),
                react_1.default.createElement("p", null, "Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium ipsam at maiores asperiores optio accusamus molestias quod, reprehenderit cupiditate dicta facere natus cumque reiciendis assumenda sit animi illum dignissimos pariatur?"),
                react_1.default.createElement("p", null, "SQLite plugin for Flutter. Supports iOS, Android and MacOS. Support transactions and batches Automatic version managment during open Helpers for insert/query/update/delete queries DB operation executed in a background thread on iOS and Android Other platforms support: Linux/Windows/DartVM support using sqflite_common_ffi Experimental Web support using sqflite_common_ffi_web. Usage example: notepad_sqflite: Simple flutter notepad working on iOS/Android/Windows/linux/Mac")))));
};
exports.default = App;
//# sourceMappingURL=App.js.map