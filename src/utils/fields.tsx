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

class Field extends Component<FieldProps> {
    render() {
        const name = this.props.name;
        const lbl = this.props.label;
        const type = this.props.type;
        const defaultValue = this.props.defaultValue;
        const rows = this.props.rows;
        const validation = this.props.validation;

        switch (type) {
            case 'text':
                return (
                    <div className='formField'>
                        <label>{lbl}</label>
                        <input
                            name={name}
                            type="text"
                            defaultValue={defaultValue}
                            required={validation?.required}
                            pattern={validation?.pattern}
                            minLength={validation?.minLength}
                            maxLength={validation?.maxLength}
                            onBlur={this.props.onChange}
                        />
                    </div>
                );
            case 'number':
                return (
                    <div className='formField'>
                        <label>{lbl}</label>
                        <input
                            name={name}
                            type="number"
                            defaultValue={defaultValue}
                            required={validation?.required}
                            min={validation?.min}
                            max={validation?.max}
                            onBlur={this.props.onChange}
                        />
                    </div>
                );
            case 'email':
                return (
                    <div className='formField'>
                        <label>{lbl}</label>
                        <input
                            name={name}
                            type="email"
                            defaultValue={defaultValue}
                            required={validation?.required}
                            pattern={validation?.pattern}
                            minLength={validation?.minLength}
                            maxLength={validation?.maxLength}
                            onBlur={this.props.onChange}
                        />
                    </div>
                );
            case 'tel':
                return (
                    <div className='formField'>
                        <label>{lbl}</label>
                        <input
                            name={name}
                            type="tel"
                            defaultValue={defaultValue}
                            required={validation?.required}
                            pattern={validation?.pattern}
                            minLength={validation?.minLength}
                            maxLength={validation?.maxLength}
                            onBlur={this.props.onChange}
                        />
                    </div>
                );
            case 'date':
                return (
                    <div className='formField'>
                        <label>{lbl}</label>
                        <input
                            name={name}
                            type="date"
                            defaultValue={defaultValue}
                            required={validation?.required}
                            pattern={validation?.pattern}
                            minLength={validation?.minLength}
                            maxLength={validation?.maxLength}
                            onBlur={this.props.onChange}
                        />
                    </div>
                );
            case 'time':
                return (
                    <div className='formField'>
                        <label>{lbl}</label>
                        <input
                            name={name}
                            type="time"
                            defaultValue={defaultValue}
                            required={validation?.required}
                            pattern={validation?.pattern}
                            minLength={validation?.minLength}
                            maxLength={validation?.maxLength}
                            onBlur={this.props.onChange}
                        />
                    </div>
                );
            case 'datetime-local':
                return (
                    <div className='formField'>
                        <label>{lbl}</label>
                        <input
                            name={name}
                            type={type}
                            defaultValue={defaultValue}
                            required={validation?.required}
                            pattern={validation?.pattern}
                            minLength={validation?.minLength}
                            maxLength={validation?.maxLength}
                            onBlur={this.props.onChange}
                        />
                    </div>
                );
            case 'textarea':
                return (
                    <div className='formField'>
                        <label>{lbl}</label>
                        <textarea
                            name={name}
                            defaultValue={defaultValue}
                            required={validation?.required}
                            minLength={validation?.minLength}
                            maxLength={validation?.maxLength}
                            rows={rows}
                            onBlur={this.props.onTextAreaChange}
                        />
                    </div>
                );
            case 'select':
                const options = defaultValue.split(',');
                return (
                    <div className='formField'>
                        <label>{lbl}</label>
                        <select
                            name={name}
                            defaultValue={defaultValue}
                            required={validation?.required}
                            onChange={this.props.onSelectionChange}
                        >
                            <option value="">Select</option>
                            {options.map((option: string, index: number) => (
                                <option key={index}>{option}</option>
                            ))}
                        </select>
                    </div>
                );
            case 'checkbox':
                return (
                    <div className='formField'>
                        <label>{lbl}</label>
                        <input name={name} type="checkbox" defaultValue={defaultValue}
                            onBlur={this.props.onChange}
                        />
                    </div>
                );
            case 'radio':
                return (
                    <div className='formField'>
                        <label>{lbl}</label>
                        <input name={name} type="radio" defaultValue={defaultValue}
                            onBlur={this.props.onChange}
                        />
                    </div>
                );
            default:
                return null;
        }
    }
}

export default Field;