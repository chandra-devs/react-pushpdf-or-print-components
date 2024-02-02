import * as React from 'react';
export interface IProps {
    trigger: JSX.Element;
    pushTrigger: JSX.Element;
    children: JSX.Element | JSX.Element[] | string;
    className?: string;
    pushPdfTo: {
        url: string;
        method: 'GET' | 'POST' | 'PUT' | 'DELETE';
        headers?: Record<string, string>;
    };
}
export declare class PushPrintComponents extends React.Component<IProps, {}> {
    private rootId;
    private rootEl;
    constructor(props: IProps);
    render(): React.JSX.Element;
    private handlePrint;
    private pushPdfToApi;
    private onPrintClose;
    private createDivElement;
    private createStyle;
}
export default PushPrintComponents;
