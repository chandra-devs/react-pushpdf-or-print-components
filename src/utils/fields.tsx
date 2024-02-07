import React, { Component } from 'react';
import "./fields.css";

interface FieldProps {
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
}

class Field extends Component<FieldProps> {
    render() {

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
                        <input type="text" defaultValue={defaultValue} required={validation?.required} pattern={validation?.pattern} minLength={validation?.minLength} maxLength={validation?.maxLength} />
                    </div>
                );
            case 'number':
                return (
                    <div className='formField'>
                        <label>{lbl}</label>
                        <input
                            type="number"
                            defaultValue={defaultValue}
                            required={validation?.required}
                            min={validation?.min}
                            max={validation?.max}
                        />
                    </div>
                );
            case 'email':
                return (
                    <div className='formField'>
                        <label>{lbl}</label>
                        <input
                            type="email"
                            defaultValue={defaultValue}
                            required={validation?.required}
                            pattern={validation?.pattern}
                            minLength={validation?.minLength}
                            maxLength={validation?.maxLength}
                        />
                    </div>
                );
            case 'tel':
                return (
                    <div className='formField'>
                        <label>{lbl}</label>
                        <input
                            type="tel"
                            defaultValue={defaultValue}
                            required={validation?.required}
                            pattern={validation?.pattern}
                            minLength={validation?.minLength}
                            maxLength={validation?.maxLength}
                        />
                    </div>
                );
            case 'date':
                return (
                    <div className='formField'>
                        <label>{lbl}</label>
                        <input
                            type="date"
                            defaultValue={defaultValue}
                            required={validation?.required}
                            pattern={validation?.pattern}
                            minLength={validation?.minLength}
                            maxLength={validation?.maxLength}
                        />
                    </div>
                );
            case 'time':
                return (
                    <div className='formField'>
                        <label>{lbl}</label>
                        <input
                            type="time"
                            defaultValue={defaultValue}
                            required={validation?.required}
                            pattern={validation?.pattern}
                            minLength={validation?.minLength}
                            maxLength={validation?.maxLength}
                        />
                    </div>
                );
            case 'datetime-local':
                return (
                    <div className='formField'>
                        <label>{lbl}</label>
                        <input
                            type={type}
                            defaultValue={defaultValue}
                            required={validation?.required}
                            pattern={validation?.pattern}
                            minLength={validation?.minLength}
                            maxLength={validation?.maxLength}
                        />
                    </div>
                );
            case 'textarea':
                return (
                    <div className='formField'>
                        <label>{lbl}</label>
                        <textarea
                            defaultValue={defaultValue}
                            required={validation?.required}
                            minLength={validation?.minLength}
                            maxLength={validation?.maxLength}
                            rows={rows}
                        />
                    </div>
                );
            case 'select':
                const options = defaultValue.split(',');
                return (
                    <div className='formField'>
                        <label>{lbl}</label>
                        <select
                            defaultValue={defaultValue}
                            required={validation?.required}
                        >
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
                        <input type="checkbox" defaultValue={defaultValue} />
                    </div>
                );
            case 'radio':
                return (
                    <div className='formField'>
                        <label>{lbl}</label>
                        <input type="radio" defaultValue={defaultValue} />
                    </div>
                );
            default:
                return null;
        }
    }
}

export default Field;