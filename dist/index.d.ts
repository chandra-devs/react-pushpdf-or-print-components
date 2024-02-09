import * as React from 'react';
import './PushPrintComponents.css';
import jsPDF from 'jspdf';
interface FormField {
    name: string;
    type: 'text' | 'number' | 'email' | 'tel' | 'date' | 'time' | 'datetime-local' | 'textarea' | 'select' | 'checkbox' | 'radio';
    label: string;
    defaultValue?: string;
    rows?: number;
    validation?: {
        required?: boolean;
        pattern?: string;
        minLength?: number;
        maxLength?: number;
    };
}
export interface previewOptions {
    formFields?: FormField[];
    className?: string;
    title?: string;
    description?: string;
    pdfFileName?: string;
    submitButtonText?: string;
    cancelButtonText?: string;
    onSubmit?: (data: any) => void;
    onCancel?: () => void;
    width?: string;
}
export interface IProps {
    printTrigger?: JSX.Element;
    generatePdfTrigger?: JSX.Element;
    showPreviewTrigger?: JSX.Element;
    previewOptions?: previewOptions;
    children: JSX.Element | JSX.Element[] | string;
    className?: string;
    onPdf?: (pdf: jsPDF) => void;
    style?: React.CSSProperties;
}
export declare class PushPrintComponents extends React.Component<IProps, {
    showPreview: boolean;
}> {
    private rootId;
    private rootEl;
    constructor(props: IProps);
    render(): React.JSX.Element;
    private handlePrint;
    private showPreview;
    private closePreview;
    private generatePdf;
    private onPrintClose;
    private createDivElement;
    private createStyle;
}
export default PushPrintComponents;
