import React from 'react';
import { Button } from 'react-bootstrap';
import PushComponent from '../src/index'; // Import the missing PushComponent module
// import PushComponent from '../dist/index'; // Import the missing PushComponent module


const App = () => {
  return (
    <div>
      <PushComponent
        printTrigger={<Button>Print</Button>}
        generatePdfTrigger={<Button>Get PDF</Button>}
        showPreviewTrigger={<Button>Share</Button>}
        previewOptions={{ title: 'Share Sample Page' }}
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