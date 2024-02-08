# React PushPrintComponents
  
  [![License](https://img.shields.io/npm/l/react-pushpdf-or-print-components.svg)]()

`PushPrintComponents` is a versatile React component designed to enhance your web applications with printing and PDF generation capabilities. Utilizing the jsPDF library, it captures the current view of a component, enabling it to be printed directly from the browser or saved as a PDF. This makes it an ideal solution for generating reports, invoices, or any content that requires hard copies or digital preservation.


## Features
- **Direct Printing**: Enables direct printing of specific components within your web application, using a customizable trigger.
- **PDF Generation**:  Converts the current view of a component into a PDF file, facilitating easy saving, sharing, or further processing.
- **Customizable Triggers**:  This feature enables the creation of personalized triggers for starting the printing process, generating PDFs, and previewing documents. It also allows for the submission of additional fields along with the PDF.
- **Styling Support**: Allows for the application of a custom class to the print container, offering styling flexibility..
- **PDF Handling Callback**: Supports a callback function for post-PDF generation, allowing for additional handling like local saving or API integration.

## New Features in PushPrintComponents

- **showPreviewTrigger**: A React component or element used as a trigger for preview screen.
- **Preview Options**: Offers a comprehensive suite of configurations for preview functionality, including customizable form fields for data submission, UI customization through class names, and specific action triggers (onSubmit, onCancel) for enhanced interaction.
- **Form Fields Customization**: Enable dynamic creation of form fields within the preview modal, supporting various field types (text, number, email, etc.) with validation rules, allowing for a richer data collection process before PDF generation or printing.
- **Enhanced Triggers**: Introduces distinct React components or elements as triggers for printing, PDF generation, and preview display, enriching user interaction and process initiation.
- **Detailed PDF Customization**:  Facilitates naming the generated PDF file, customizing the submit and cancel button texts in the preview modal, and providing hooks for submission and cancellation actions.


## Installation
### To install the component in your project, run the following command:
Run `npm install react-pushpdf-or-print-components`

## Usage
The example below demonstrates how to integrate PushPrintComponents into your React application, showcasing setup for print, PDF generation triggers, preview options, and handling the generated PDF through callback functions.

```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import PushPrintComponents, { FormField, previewOptions } from 'react-pushpdf-or-print-components';

function App() {
  const previewOptions = {
    formFields: [
      { name: 'name', type: 'text', label: 'Name', validation: { required: true } },
      { name: 'date', type: 'date', label: 'Date' }
    ],
    title: 'Preview Title',
    description: 'Please fill out the form',
    pdfFileName: 'custom-file-name.pdf',
    submitButtonText: 'Submit',
    cancelButtonText: 'Cancel',
    onSubmit: (data) => {
      console.log('Form Data:', data);
    },
    onCancel: () => {
      console.log('Preview Cancelled');
    }
  };

  return (
    <PushPrintComponents
      printTrigger={<button>Print Content</button>}
      generatePdfTrigger={<button>Generate PDF</button>}
      showPreviewTrigger={<button>Show Preview</button>}
      previewOptions={previewOptions}
      className="custom-print-class"
      onPdf={(pdf) => {
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

<!-- interface FieldProps {
    name?: string;
    label: string;
    type: string;
    defaultValue: string;
    rows?: number;
    validation?: {
        required?: boolean;
        pattern?: string;
        minLength?: number;
        maxLength?: number;
        min?: number;
        max?: number;
    };
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onSelectionChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    onTextAreaChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
} -->

## PushPrintComponents

React component called PushPrintComponents that provides functionality for printing content, generating PDFs, and displaying a preview form with customizable options.

|Name|Type|Description
|--|-----|-----|
|**`trigger`**|function|A React component or element used as a trigger for initiating the print process.
|**`generatePdfTrigger`**|function|A React component or element used as a trigger for generating a PDF.
|**`showPreviewTrigger`**|function|A React component or element used as a trigger for displaying the preview screen with provided form fields in previewOptions.
|**`previewOptions`**|object|An object containing the configuration for the share preview form, including title, form fields, and action triggers.
|**`className`**|string|An optional class name to apply to the print container for custom styling.
|**`onPdf`**|function|A callback function that receives the generated PDF object for additional processing.


## previewOptions Configuration

The `previewOptions` configuration allows for detailed customization of the share preview form, including:


| Name              | Type     | Description                                                                 |
|-------------------|----------|-----------------------------------------------------------------------------|
| **`title`**         | string   | Set the title of the share preview window.                                   |
| **`formFields`**    | object   | Define the fields in the form, their types, default values, and validation rules. |
| **`description`**   | string   | Provide a description or instructions for the form.                          |
| **`pdfFileName`**   | string   | Set the name of the generated PDF file.                                      |
| **`submitButtonText`** | string | Customize the text for the submit button in the preview form.                |
| **`cancelButtonText`** | string | Customize the text for the cancel button in the preview form.                |
| **`onSubmit`**      | function | Define a custom function to handle the form submission.                      |
| **`onCancel`**      | function | Define a custom function to handle the form cancellation.                    |


## formFields Configuration

The `formFields` configuration allows for dynamic creation of form fields within the preview modal, supporting various field types (text, number, email, etc.) with validation rules, allowing for a richer data collection process before PDF generation or printing.


| Name          | Type     | Description                                                                 |
|---------------|----------|-----------------------------------------------------------------------------|
| **`name`**      | string   | The name of the form field.                                                  |
| **`type`**      | string   | The type of the form field (text, number, email, etc.).                       |
| **`label`**     | string   | The label for the form field.                                                |
| **`validation`**| object   | An object containing validation rules for the form field (e.g., required: true). |
| **`defaultValue`** | string | The default value for the form field.                                        |
| **`rows`**      | number   | The number of rows for a textarea field.                                      |


## validation Configuration

The `validation` configuration allows for setting validation rules for form fields, including required fields, pattern matching, minimum and maximum lengths, and minimum and maximum values.


| Name        | Type    | Description                                                                 |
|-------------|---------|-----------------------------------------------------------------------------|
| **`required`** | boolean | A boolean value indicating whether the field is required.                     |
| **`pattern`**  | string  | A regular expression pattern for pattern matching.                            |
| **`minLength`**| number  | The minimum length for the field value.                                       |
| **`maxLength`**| number  | The maximum length for the field value.                                       |
| **`min`**      | number  | The minimum value for number fields.                                          |
| **`max`**      | number  | The maximum value for number fields.                                          |


## Contributing
We welcome contributions from the community. Please refer to our [contributing guidelines](CONTRIBUTING.md) for more information.


## License

This project is licensed under the terms of the [MIT license](LICENSE).

## Credits

This project was bootstrapped with [Create React App]

## Support

For any questions or support, please contact us at kishorechandra.developer@gmail.com
