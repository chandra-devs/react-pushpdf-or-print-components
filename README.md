# React PushPrintComponents

[![npm version](https://badge.fury.io/js/react-pushpdf-or-print-components.svg)](https://badge.fury.io/js/react-pushpdf-or-print-components)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

`PushPrintComponents` is a versatile React component designed to add printing and PDF generation capabilities to your web application. It uses `dom-to-image` and `jsPDF` to capture a component's current view and convert it into a printable format or a PDF. This functionality can be easily integrated into your application, allowing for the direct printing of content or its conversion to PDF for storage or API transmission.


## Features
- **Print Specific Components**: Directly print content from your web application with a customizable trigger.
- **Save as PDF**: Convert the component's view to a PDF, enabling easy saving, sharing, or API transmission.
- **Customizable Triggers**: Define custom triggers for both printing and PDF generation.
- **Optional Custom Class**: Apply a custom class to the print container for styling purposes.
- **PDF Callback**: Handle the generated PDF with a callback, allowing for further custom actions (e.g., saving locally or pushing to an API).


## Installation
Run `npm install react-pushpdf-or-print-components`

## Usage
Below is an example demonstrating how to use `PushPrintComponents` in your application. It shows how to set up the print and PDF generation triggers, include content to be printed or converted to PDF, and utilize a callback function with the generated PDF.

```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import PushPrintComponents from 'react-pushpdf-or-print-components';

function App() {
  return (
    <PushPrintComponents
      trigger={<button>Print Content</button>}
      generatePdfTrigger={<button>Generate PDF</button>}
      className="custom-print-class"
      onPdf={(pdf) => {
        // Handle the generated PDF (e.g., save locally or push to API)
      }}
    >
      <div>
        Content to print or save as PDF.
      </div>
    </PushPrintComponents>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
```

## API

*<PrintComponents/>*

|Name|Type|Description
|:--:|:-----|:-----|
|**`trigger`**|function|A function that returns a React Component or HTML element
|**`generatePdfTrigger`**|function|A function that returns a React Component or HTML element
|**`className`**|string|Optional class to pass to the print container
|**`onPdf`**|function|A callback function that is called with the generated PDF object.
