import * as React from 'react';
import jsPDF from 'jspdf';
export interface IProps {
    trigger: JSX.Element;
    generatePdfTrigger: JSX.Element;
    children: JSX.Element | JSX.Element[] | string;
    className?: string;
    onPdf?: (pdf: jsPDF) => void;
}
export declare class PushPrintComponents extends React.Component<IProps, {}> {
    private rootId;
    private rootEl;
    constructor(props: IProps);
    render(): React.JSX.Element;
    private handlePrint;
    private generatePdf;
    private onPrintClose;
    private createDivElement;
    private createStyle;
}
export default PushPrintComponents;
