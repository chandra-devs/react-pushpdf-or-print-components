"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importStar(require("react"));
var index_1 = tslib_1.__importStar(require("./index"));
var fields_1 = tslib_1.__importDefault(require("./fields"));
var Preview = function (_a) {
    var _b, _c, _d, _e;
    var previewPosition = _a.previewPosition, children = _a.children, closePreview = _a.closePreview, previewOptions = _a.previewOptions, style = _a.style;
    var _f = (0, react_1.useState)([]), formFields = _f[0], setFormFields = _f[1];
    var _g = (0, react_1.useState)(null), pdfFile = _g[0], setPdfFile = _g[1];
    (0, react_1.useEffect)(function () {
        generatePdf();
    }, []);
    (0, react_1.useEffect)(function () {
        console.log('pdfFile:', pdfFile);
    }, [formFields, pdfFile]);
    var handleChange = function (e) {
        setFormFields(tslib_1.__spreadArray(tslib_1.__spreadArray([], formFields, true), [{ name: e.target.name, value: e.target.value }], false));
    };
    var handleSelectionChange = function (e) {
        setFormFields(tslib_1.__spreadArray(tslib_1.__spreadArray([], formFields, true), [{ name: e.target.name, value: e.target.value }], false));
    };
    var handleTextAreaChange = function (e) {
        setFormFields(tslib_1.__spreadArray(tslib_1.__spreadArray([], formFields, true), [{ name: e.target.name, value: e.target.value }], false));
    };
    var setFile = function (file) {
        setPdfFile(file);
    };
    var generatePdf = function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var options, EL, pdfBlob, error_1;
        var _a;
        return tslib_1.__generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    options = {
                        method: (_a = previewOptions === null || previewOptions === void 0 ? void 0 : previewOptions.mode) !== null && _a !== void 0 ? _a : "buildAndCreateFile",
                        filename: previewOptions === null || previewOptions === void 0 ? void 0 : previewOptions.pdfFileName,
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
                    EL = document.getElementById('previewScreen');
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, 4, 5]);
                    return [4 /*yield*/, (0, index_1.default)(function () { return EL; }, options)];
                case 2:
                    pdfBlob = _b.sent();
                    setFile(pdfBlob);
                    return [3 /*break*/, 5];
                case 3:
                    error_1 = _b.sent();
                    console.error('Error generating PDF:', error_1);
                    return [3 /*break*/, 5];
                case 4: return [7 /*endfinally*/];
                case 5: return [2 /*return*/];
            }
        });
    }); };
    return (react_1.default.createElement("div", { className: "preview ".concat(previewPosition), style: style },
        react_1.default.createElement("div", { className: 'header' },
            react_1.default.createElement("div", { className: 'title' },
                react_1.default.createElement("h3", null, (_b = previewOptions === null || previewOptions === void 0 ? void 0 : previewOptions.title) !== null && _b !== void 0 ? _b : '')),
            react_1.default.createElement("div", { className: 'description' },
                react_1.default.createElement("p", null, (_c = previewOptions === null || previewOptions === void 0 ? void 0 : previewOptions.description) !== null && _c !== void 0 ? _c : '')),
            react_1.default.createElement("div", { className: 'close' },
                react_1.default.createElement("button", { onClick: function () { return closePreview(); } }, "X"))),
        react_1.default.createElement("div", { className: 'view' },
            react_1.default.createElement("div", { className: "previewscreen", id: "previewScreen" }, children),
            react_1.default.createElement("div", { className: "form" },
                react_1.default.createElement(Form, { previewOptions: previewOptions !== null && previewOptions !== void 0 ? previewOptions : {}, onChangeHandlers: {
                        handleChange: handleChange,
                        handleSelectionChange: handleSelectionChange,
                        handleTextAreaChange: handleTextAreaChange
                    } }))),
        react_1.default.createElement("div", { className: 'actions' },
            react_1.default.createElement("button", { onClick: function () {
                    if (previewOptions === null || previewOptions === void 0 ? void 0 : previewOptions.onSubmit) {
                        previewOptions.onSubmit({ fields: formFields, pdf: pdfFile });
                    }
                    closePreview();
                } }, (_d = previewOptions === null || previewOptions === void 0 ? void 0 : previewOptions.submitButtonText) !== null && _d !== void 0 ? _d : 'Submit'),
            react_1.default.createElement("button", { onClick: function () { return closePreview(); } }, (_e = previewOptions === null || previewOptions === void 0 ? void 0 : previewOptions.cancelButtonText) !== null && _e !== void 0 ? _e : 'Cancel'))));
};
var Form = function (_a) {
    var _b;
    var previewOptions = _a.previewOptions, onChangeHandlers = _a.onChangeHandlers;
    (0, react_1.useEffect)(function () { }, []);
    return (react_1.default.createElement("div", { className: "form" }, (_b = previewOptions === null || previewOptions === void 0 ? void 0 : previewOptions.formFields) === null || _b === void 0 ? void 0 : _b.map(function (field, index) { return (react_1.default.createElement(fields_1.default, tslib_1.__assign({ key: index }, field, { onChange: function (e) { return onChangeHandlers.handleChange(e); }, onSelectionChange: function (e) { return onChangeHandlers.handleSelectionChange(e); }, onTextAreaChange: function (e) { return onChangeHandlers.handleTextAreaChange(e); } }))); })));
};
exports.default = Preview;
//# sourceMappingURL=Preview.js.map