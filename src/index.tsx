import * as React from 'react';
import * as ReactDOM from 'react-dom';
import domToImage from 'dom-to-image';
import * as tslib from 'tslib';
import jsPDF from 'jspdf';

export interface IProps {
  trigger: JSX.Element;
  generatePdfTrigger: JSX.Element;
  children: JSX.Element | JSX.Element[] | string;
  className?: string;
  onPdf?: (pdf: jsPDF) => void;
}

export class PushPrintComponents extends React.Component<IProps, {}> {
  private rootId: string = 'react-components-print';
  private rootEl: HTMLElement;
  private canvasRef = React.useRef<HTMLElement>(null);

  public constructor(props: IProps) {
    super(props);

    this.rootEl = this.createDivElement(this.rootId, props.className);

  }

  public render() {

    const { children, trigger, generatePdfTrigger } = this.props;
    const content = (
      <React.Fragment>
        {this.createStyle()}
        {children}
        <div ref={this.canvasRef as React.RefObject<HTMLDivElement>} />
      </React.Fragment>
    );

    return (
      <React.Fragment>
        {React.cloneElement(trigger, tslib.__assign({}, trigger.props, { onClick: this.handlePrint }))}
        {React.cloneElement(generatePdfTrigger, tslib.__assign({}, generatePdfTrigger.props, { onClick: this.generatePdf }))}
        {ReactDOM.createPortal(content, this.rootEl)}
      </React.Fragment>
    );
  }

  private handlePrint = () => {
    document.body.insertAdjacentElement('afterbegin', this.rootEl);
    window.onafterprint = this.onPrintClose;
    window.print();
  }

  private generatePdf = () => {
    // Check if this.rootEl is initialized
    if (!this.rootEl) {
      console.error('Error: this.rootEl is not initialized.');
      return;
    }

    // Temporarily set the rootEl to display: block;
    this.rootEl.style.display = 'block';

    // Add a slight delay to ensure the element is ready
    setTimeout(() => {
      if (this.canvasRef.current) {
        domToImage.toPng(this.canvasRef.current)
          .then((dataUrl) => {
            const img = new Image();
            console.log('dataUrl:', dataUrl);
            img.src = dataUrl;
            console.log('img:', img);
            img.onload = () => {
              const pdf = new jsPDF({
                orientation: 'portrait',
                unit: 'px',
                format: [img.width, img.height]
              });
              pdf.addImage(dataUrl, 'PNG', 0, 0, img.width, img.height);
              pdf.save('document.pdf'); // Optional: save locally

              // Call the onPdf callback if it exists
              if (this.props.onPdf) {
                this.props.onPdf(pdf);
              }

              // Set the rootEl back to display: none;
              this.rootEl.style.display = 'none';
            };
          })
          .catch((error) => {
            console.error('Error converting to image:', error);

            // Set the rootEl back to display: none;
            this.rootEl.style.display = 'none';
          });
      }
    }, 500); // Delay of 500ms
  };

  private onPrintClose = () => {
    window.onafterprint = () => null;

    this.rootEl.remove();
  }

  private createDivElement = (id?: string, className?: string) => {
    const el = document.createElement('div');

    if (id) el.setAttribute('id', id);
    if (className) el.setAttribute('class', className);

    // add canvasref to the element if it exists
    if (this.canvasRef.current) {
      el.appendChild(this.canvasRef.current);
    }

    return el;
  }

  private createStyle = () => (
    <style dangerouslySetInnerHTML={{
      __html: `
      #${this.rootId} {
        display: none;
      }

      @media print {
        body > *:not(#${this.rootId}) {
          display: none;
        }

        #${this.rootId} {
          display: block;
        }
      }
    `}} />
  )
}

export default PushPrintComponents;
