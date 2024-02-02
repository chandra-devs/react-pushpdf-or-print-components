# React Push Print Components
A React component designed to enhance web application functionality by enabling users to print specific components or push them as a PDF to a designated API. Utilizing html2canvas and jsPDF, this component captures the current view of the component and converts it into a PDF, allowing for a seamless integration of print and save functionalities in your applications.

## Features
- Print specific components
- Save specific components as a PDF
- Customizable trigger button
- Customizable class for print container
- Print Component: Allows users to print the content directly from the web application.
- Push to API as PDF: Converts the component view into a PDF and pushes it to a specified API endpoint.

## Installation
Run `npm install react-pushpdf-or-print-components`

## How to use
```
import PushPrintComponents from "react-pushpdf-or-print-components";

 <PushPrintComponents
      trigger={<button>Print</button>}
      pushTrigger={<button>Save as PDF</button>}
      pushPdfTo={{
        url: 'YOUR_API_ENDPOINT',
        method: 'POST',
      }}
    >
      <div>
        Content to print or save as PDF.
      </div>
    </PushPrintComponents>
```

## API

*<PrintComponents/>*

|Name|Type|Description
|:--:|:-----|:-----|
|**`trigger`**|function|A function that returns a React Component or HTML element
|**`pushTrigger`**|function|A function that returns a JSX.Element - Element to trigger saving as PDF.
|**`pushPdfTo`**|object|Configuration for the API endpoint to push the PDF.
|**`className`**|string|Optional class to pass to the print container
