import * as React from 'react';
import * as ReactDOM from 'react-dom';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

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

export class PushPrintComponents extends React.Component<IProps, {}> {
  private rootId: string = 'react-components-print';
  private rootEl: HTMLElement;

  public constructor(props: IProps) {
    super(props);

    this.rootEl = this.createDivElement(this.rootId, props.className);
  }

  public render() {
    const { children, trigger, pushTrigger } = this.props;
    const content = (
      <React.Fragment>
        { this.createStyle() }
        { children }
      </React.Fragment>
    );

    return (
      <React.Fragment>
        { React.cloneElement(trigger, {...trigger.props, onClick: this.handlePrint}) }
        { React.cloneElement(pushTrigger, {...pushTrigger.props, onClick: this.pushPdfToApi}) }
        { ReactDOM.createPortal(content, this.rootEl) }
      </React.Fragment>
    );
  }

  private handlePrint = () => {
    document.body.insertAdjacentElement('afterbegin', this.rootEl);
    window.onafterprint = this.onPrintClose;
    window.print();
  }

  private pushPdfToApi = () => {
    const { url, method, headers } = this.props.pushPdfTo;
    html2canvas(this.rootEl).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      // A4 size page of PDF
      const imgWidth = 210;
      const imgHeight = canvas.height * imgWidth / canvas.width;
      
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      const blob = pdf.output('blob');
      // Make the API call here
      fetch(url, {
        method,
        headers,
        body: blob
      });
    });
  }

  private onPrintClose = () => {
    window.onafterprint = () => null;

    this.rootEl.remove();
  }

  private createDivElement = (id?: string, className?: string) => {
    const el = document.createElement('div');

    if (id) el.setAttribute('id', id);
    if (className) el.setAttribute('class', className);

    return el;
  }

  private createStyle = () => (
    <style dangerouslySetInnerHTML={{__html: `
      #${ this.rootId } {
        display: none;
      }

      @media print {
        body > *:not(#${ this.rootId }) {
          display: none;
        }

        #${ this.rootId } {
          display: block;
        }
      }
    `}}/>
  )
}

export default PushPrintComponents;
