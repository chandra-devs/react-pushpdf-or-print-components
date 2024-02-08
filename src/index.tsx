import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './PushPrintComponents.css';
import generatePDF, { Resolution, Margin, Options } from "./utils/index";
import Preview from "./utils/Preview";
import * as tslib from 'tslib';
import jsPDF from 'jspdf';

interface FormField {
  name: string;
  type: 'text' | 'number' |'email' |'tel' | 'date' | 'time' | 'datetime-local' | 'textarea' | 'select' | 'checkbox' |  'radio'
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

export class PushPrintComponents extends React.Component<IProps, { showPreview: boolean }> {
  private rootId: string = 'react-components-print';
  private rootEl: HTMLElement;

  public constructor(props: IProps) {
    super(props);

    this.rootEl = this.createDivElement(this.rootId, props.className);
    
    this.state = {
      showPreview: false
    };

  }

  public render() {
    const { children, printTrigger, generatePdfTrigger, showPreviewTrigger, previewOptions } = this.props;
    const content = (
      <React.Fragment>
        {this.createStyle()}
        {children}
      </React.Fragment>
    );

    return (
      <div className='react-components-print'>
        {printTrigger && React.cloneElement(printTrigger, tslib.__assign({}, printTrigger.props, { onClick: this.handlePrint }))}
        {generatePdfTrigger && React.cloneElement(generatePdfTrigger, tslib.__assign({}, generatePdfTrigger.props, { onClick: this.generatePdf }))}
        {showPreviewTrigger && React.cloneElement(showPreviewTrigger, tslib.__assign({}, showPreviewTrigger.props, { onClick: this.showPreview }))}
        {ReactDOM.createPortal(content, this.rootEl)}
        {this.state.showPreview && <Preview style={this.props.style} previewPosition='right' closePreview={this.closePreview} children={children} previewOptions={previewOptions} />}
      </div>
    );
  }

  private handlePrint = () => {
    document.body.insertAdjacentElement('afterbegin', this.rootEl);
    window.onafterprint = this.onPrintClose;
    window.print();
  }


  private showPreview = () => {
    this.setState({ showPreview: true });
  }

  private closePreview = () => {
    this.setState({ showPreview: false });
  }


  private generatePdf = async () => {
    const options: Options = {
      filename: "output.pdf",
      resolution: Resolution.EXTREME,
      page: {
        margin: Margin.SMALL,
        format: "a4",
        orientation: "portrait"
      },
      canvas: {
        mimeType: "image/jpeg",
        qualityRatio: 1
      },
      overrides: {
        pdf: {
          compress: true
        },
        canvas: {
          useCORS: true
        }
      }
    };

    // Ensure the element is in the DOM before generating the PDF
    document.body.appendChild(this.rootEl);

    // enable element to display before generating pdf
    this.rootEl.style.display = 'block';

    try {
      const pdfBlob = await generatePDF(() => this.rootEl, options);
      if (typeof this.props.onPdf === 'function') {
        
        this.props.onPdf(pdfBlob);
      }
      // disable element after generating pdf
      this.rootEl.style.display = 'none';
    } catch (error) {
      console.error('Error generating PDF:', error);
      // disable element on error
      this.rootEl.style.display = 'none';
    } finally {
      // Remove the element from the DOM when done
      document.body.removeChild(this.rootEl);
      // disable element after removing from the DOM
      this.rootEl.style.display = 'none';
    }
  };


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
