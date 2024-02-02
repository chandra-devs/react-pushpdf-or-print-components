import * as React from 'react';
import * as ReactDOM from 'react-dom';
import domToImage from 'dom-to-image';
import * as tslib from 'tslib';
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
        { React.cloneElement(trigger, tslib.__assign({}, trigger.props, { onClick: this.handlePrint })) }
        { React.cloneElement(pushTrigger, tslib.__assign({}, pushTrigger.props, { onClick: this.pushPdfToApi })) }
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
    domToImage.toPng(this.rootEl)
      .then((dataUrl) => {
        const img = new Image();
        img.src = dataUrl;
        img.onload = () => {
          const pdf = new jsPDF({
            orientation: 'portrait',
            unit: 'px',
            format: [img.width, img.height]
          });
          pdf.addImage(dataUrl, 'PNG', 0, 0, img.width, img.height);
          pdf.save('document.pdf'); // Optional: save locally
          const blob = pdf.output('blob');
          const formData = new FormData();
          formData.append("file", blob, "document.pdf");

          // Perform the API call
          fetch(url, {
            method,
            headers,
            body: formData,
          })
          .then(response => response.json())
          .then(data => console.log(data))
          .catch(error => console.error(error));
        };
      })
      .catch((error) => {
        console.error('Error converting to image:', error);
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
