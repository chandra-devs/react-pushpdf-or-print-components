import React from 'react';
import { Button } from 'react-bootstrap';
import PushComponent from '../src/index'; // Import the missing PushComponent module
// import PushComponent from '../dist/index'; // Import the missing PushComponent module


const App = () => {
  return (
    <div>
      <h1>Print / GenPDF</h1>
      <p>
        This is a simple example of how to use the PushComponent module to print or generate a PDF of a component.
      </p>
      <PushComponent
        printTrigger={<Button>Print</Button>}
        generatePdfTrigger={<Button>Get PDF</Button>}
        showPreviewTrigger={<Button>Show Preview</Button>}
        previewOptions={{ title: 'Sample Page' }}
        onPdf={(pdf) => {
          pdf.save('test.pdf');
        }}
      >
        <div>
          <p>
            Content to print or save as PDF.
          </p>
          <p>This is additional React content.</p>
        </div>
      </PushComponent>
    </div>
  );
}

export default App;