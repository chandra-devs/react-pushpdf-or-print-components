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
        previewOptions={{
          title: 'Share Sample Page', 
          formFields: [
            { name: 'title', label: 'Title', type: 'text', validation: { required: true }},
            { name: 'reportType', label: 'Report Type', type: 'select', defaultValue: 'Discharge Report, Doctor Notes', validation: { required: true } },
            {
              name: 'notes',
              label: 'Notes',
              type: 'textarea',
              rows: 5,
              validation: { required: true }
            }
          ],
          description: 'The following content will be shared with the patient. Please fill in the required fields.',
          // pdfFileName: '454687465.pdf',
          submitButtonText: 'Share to Patient',
          cancelButtonText: 'Cancel',
          onSubmit: (data) => {
            
          },
        }}
        onPdf={(pdf) => {
          pdf.save('test.pdf');
        }}
      >
        <div>
          <h1>Sample Page</h1>
          <p>This is a sample page to demonstrate the usage of the PushComponent</p>
        </div>
      </PushComponent>
    </div>
  );
}

export default App;