import React, { Component } from 'react';
import "./fields.css";
interface FieldProps {
    name?: string;
    label: string;
    type: string;
    defaultValue: string;
    rows?: number;
    validation?: {
        required?: boolean;
        pattern?: string;
        minLength?: number;
        maxLength?: number;
        min?: number;
        max?: number;
    };
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onSelectionChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    onTextAreaChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}
declare class Field extends Component<FieldProps> {
    render(): React.JSX.Element | null;
}
export default Field;
