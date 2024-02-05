# React PushPrintComponents

[![npm version](https://badge.fury.io/js/react-pushpdf-or-print-components.svg)](https://badge.fury.io/js/react-pushpdf-or-print-components)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

`PushPrintComponents` is a versatile React component designed to enhance your web applications with printing and PDF generation capabilities. Utilizing the jsPDF library, it captures the current view of a component, enabling it to be printed directly from the browser or saved as a PDF. This makes it an ideal solution for generating reports, invoices, or any content that requires hard copies or digital preservation.


## Features
- **Direct Printing**: Enables direct printing of specific components within your web application, using a customizable trigger.
- **PDF Generation**:  Converts the current view of a component into a PDF file, facilitating easy saving, sharing, or further processing.
- **Customizable Triggers**:  Provides the ability to define custom triggers for initiating both printing and PDF generation processes.
- **Styling Support**: Allows for the application of a custom class to the print container, offering styling flexibility..
- **PDF Handling Callback**: Supports a callback function for post-PDF generation, allowing for additional handling like local saving or API integration.


## Installation
### To install the component in your project, run the following command:
Run `npm install react-pushpdf-or-print-components`

## Usage
The example below demonstrates how to integrate PushPrintComponents into your React application. It includes setup for both print and PDF generation triggers, as well as how to handle the generated PDF through a callback function.

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
        console.log('PDF generated', pdf);
        // Further actions with the generated PDF
      }}
    >
      <div>
        Content to be printed or saved as PDF.
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
|**`trigger`**|function|A React component or element used as a trigger for initiating the print process.
|**`generatePdfTrigger`**|function|A React component or element used as a trigger for generating a PDF.
|**`className`**|string|An optional class name to apply to the print container for custom styling.
|**`onPdf`**|function|A callback function that receives the generated PDF object for additional processing.
