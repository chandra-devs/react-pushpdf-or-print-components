import React from 'react';
import { Button } from 'react-bootstrap';
import PushComponent from '../src/index'; // Import the missing PushComponent module

const App = () => {
  return (
    <div>
      <h1>Hello, Kishore!</h1>
      <p>Welcome to your React application with TypeScript.</p>
      <PushComponent
        trigger={<Button>Print</Button>}
        pushTrigger={<Button>Save as PDF</Button>}
        generatePdfTrigger={<Button>Generate PDF</Button>}
        pushPdfTo={{
          url: 'http://localhost:3000/pdf',
          method: 'POST',
        }}
      >
        <div>
          Content to print or save as PDF.
        </div>
      </PushComponent>
    </div>
  );
}

export default App;