"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importStar(require("react"));
require("./fields.css");
var Field = /** @class */ (function (_super) {
    tslib_1.__extends(Field, _super);
    function Field() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Field.prototype.render = function () {
        var name = this.props.name;
        var lbl = this.props.label;
        var type = this.props.type;
        var defaultValue = this.props.defaultValue;
        var rows = this.props.rows;
        var validation = this.props.validation;
        switch (type) {
            case 'text':
                return (react_1.default.createElement("div", { className: 'formField' },
                    react_1.default.createElement("label", null, lbl),
                    react_1.default.createElement("input", { name: name, type: "text", defaultValue: defaultValue, required: validation === null || validation === void 0 ? void 0 : validation.required, pattern: validation === null || validation === void 0 ? void 0 : validation.pattern, minLength: validation === null || validation === void 0 ? void 0 : validation.minLength, maxLength: validation === null || validation === void 0 ? void 0 : validation.maxLength, onBlur: this.props.onChange })));
            case 'number':
                return (react_1.default.createElement("div", { className: 'formField' },
                    react_1.default.createElement("label", null, lbl),
                    react_1.default.createElement("input", { name: name, type: "number", defaultValue: defaultValue, required: validation === null || validation === void 0 ? void 0 : validation.required, min: validation === null || validation === void 0 ? void 0 : validation.min, max: validation === null || validation === void 0 ? void 0 : validation.max, onBlur: this.props.onChange })));
            case 'email':
                return (react_1.default.createElement("div", { className: 'formField' },
                    react_1.default.createElement("label", null, lbl),
                    react_1.default.createElement("input", { name: name, type: "email", defaultValue: defaultValue, required: validation === null || validation === void 0 ? void 0 : validation.required, pattern: validation === null || validation === void 0 ? void 0 : validation.pattern, minLength: validation === null || validation === void 0 ? void 0 : validation.minLength, maxLength: validation === null || validation === void 0 ? void 0 : validation.maxLength, onBlur: this.props.onChange })));
            case 'tel':
                return (react_1.default.createElement("div", { className: 'formField' },
                    react_1.default.createElement("label", null, lbl),
                    react_1.default.createElement("input", { name: name, type: "tel", defaultValue: defaultValue, required: validation === null || validation === void 0 ? void 0 : validation.required, pattern: validation === null || validation === void 0 ? void 0 : validation.pattern, minLength: validation === null || validation === void 0 ? void 0 : validation.minLength, maxLength: validation === null || validation === void 0 ? void 0 : validation.maxLength, onBlur: this.props.onChange })));
            case 'date':
                return (react_1.default.createElement("div", { className: 'formField' },
                    react_1.default.createElement("label", null, lbl),
                    react_1.default.createElement("input", { name: name, type: "date", defaultValue: defaultValue, required: validation === null || validation === void 0 ? void 0 : validation.required, pattern: validation === null || validation === void 0 ? void 0 : validation.pattern, minLength: validation === null || validation === void 0 ? void 0 : validation.minLength, maxLength: validation === null || validation === void 0 ? void 0 : validation.maxLength, onBlur: this.props.onChange })));
            case 'time':
                return (react_1.default.createElement("div", { className: 'formField' },
                    react_1.default.createElement("label", null, lbl),
                    react_1.default.createElement("input", { name: name, type: "time", defaultValue: defaultValue, required: validation === null || validation === void 0 ? void 0 : validation.required, pattern: validation === null || validation === void 0 ? void 0 : validation.pattern, minLength: validation === null || validation === void 0 ? void 0 : validation.minLength, maxLength: validation === null || validation === void 0 ? void 0 : validation.maxLength, onBlur: this.props.onChange })));
            case 'datetime-local':
                return (react_1.default.createElement("div", { className: 'formField' },
                    react_1.default.createElement("label", null, lbl),
                    react_1.default.createElement("input", { name: name, type: type, defaultValue: defaultValue, required: validation === null || validation === void 0 ? void 0 : validation.required, pattern: validation === null || validation === void 0 ? void 0 : validation.pattern, minLength: validation === null || validation === void 0 ? void 0 : validation.minLength, maxLength: validation === null || validation === void 0 ? void 0 : validation.maxLength, onBlur: this.props.onChange })));
            case 'textarea':
                return (react_1.default.createElement("div", { className: 'formField' },
                    react_1.default.createElement("label", null, lbl),
                    react_1.default.createElement("textarea", { name: name, defaultValue: defaultValue, required: validation === null || validation === void 0 ? void 0 : validation.required, minLength: validation === null || validation === void 0 ? void 0 : validation.minLength, maxLength: validation === null || validation === void 0 ? void 0 : validation.maxLength, rows: rows, onBlur: this.props.onTextAreaChange })));
            case 'select':
                var options = defaultValue.split(',');
                return (react_1.default.createElement("div", { className: 'formField' },
                    react_1.default.createElement("label", null, lbl),
                    react_1.default.createElement("select", { name: name, defaultValue: defaultValue, required: validation === null || validation === void 0 ? void 0 : validation.required, onChange: this.props.onSelectionChange },
                        react_1.default.createElement("option", { value: "" }, "Select"),
                        options.map(function (option, index) { return (react_1.default.createElement("option", { key: index }, option)); }))));
            case 'checkbox':
                return (react_1.default.createElement("div", { className: 'formField' },
                    react_1.default.createElement("label", null, lbl),
                    react_1.default.createElement("input", { name: name, type: "checkbox", defaultValue: defaultValue, onBlur: this.props.onChange })));
            case 'radio':
                return (react_1.default.createElement("div", { className: 'formField' },
                    react_1.default.createElement("label", null, lbl),
                    react_1.default.createElement("input", { name: name, type: "radio", defaultValue: defaultValue, onBlur: this.props.onChange })));
            default:
                return null;
        }
    };
    return Field;
}(react_1.Component));
exports.default = Field;
//# sourceMappingURL=fields.js.map