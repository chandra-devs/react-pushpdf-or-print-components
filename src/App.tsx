import React from 'react';
import { Button } from 'react-bootstrap';
import PushComponent from '../src/index'; // Import the missing PushComponent module
// import PushComponent from '../dist/index'; // Import the missing PushComponent module


const App = () => {
  return (
    <div>
      <div>
        <p style={{ fontSize: "1em" }}>
          Main Content
        </p>
      </div>
      <PushComponent
        printTrigger={<Button>Print</Button>}
        generatePdfTrigger={<Button>Get PDF</Button>}
        showPreviewTrigger={<Button>Share</Button>}
        previewOptions={{
          title: 'Share Sample Page',
          formFields: [
            { name: 'title', label: 'Title', type: 'text', validation: { required: true } },
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
          pdfFileName: '454687465.pdf',
          submitButtonText: 'Share to Patient',
          cancelButtonText: 'Cancel',
          onSubmit: (data) => {
            console.log('Submitted Data:', data);
          },
          width: '70%',
        }}
        onPdf={(pdf) => {
          pdf.save('test.pdf');
        }}
        style={{ fontSize: "15px" }}
      >
        <div>
          <h1>Sample Page</h1>
          <p style={{ fontSize: "1em" }}>This is a sample page to demonstrate the usage of the PushComponent</p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium ipsam at maiores asperiores optio accusamus molestias quod, reprehenderit cupiditate dicta facere natus cumque reiciendis assumenda sit animi illum dignissimos pariatur?
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit non iusto ipsam quidem officia sint quasi optio odit eaque nostrum excepturi illo voluptas, architecto asperiores incidunt eligendi, libero laudantium. Veritatis.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium ipsam at maiores asperiores optio accusamus molestias quod, reprehenderit cupiditate dicta facere natus cumque reiciendis assumenda sit animi illum dignissimos pariatur?
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit non iusto ipsam quidem officia sint quasi optio odit eaque nostrum excepturi illo voluptas, architecto asperiores incidunt eligendi, libero laudantium. Veritatis.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium ipsam at maiores asperiores optio accusamus molestias quod, reprehenderit cupiditate dicta facere natus cumque reiciendis assumenda sit animi illum dignissimos pariatur?
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit non iusto ipsam quidem officia sint quasi optio odit eaque nostrum excepturi illo voluptas, architecto asperiores incidunt eligendi, libero laudantium. Veritatis.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium ipsam at maiores asperiores optio accusamus molestias quod, reprehenderit cupiditate dicta facere natus cumque reiciendis assumenda sit animi illum dignissimos pariatur?
          </p>
          <p>
            SQLite plugin for Flutter. Supports iOS, Android and MacOS.

            Support transactions and batches
            Automatic version managment during open
            Helpers for insert/query/update/delete queries
            DB operation executed in a background thread on iOS and Android
            Other platforms support:

            Linux/Windows/DartVM support using sqflite_common_ffi
            Experimental Web support using sqflite_common_ffi_web.
            Usage example:

            notepad_sqflite: Simple flutter notepad working on iOS/Android/Windows/linux/Mac
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit non iusto ipsam quidem officia sint quasi optio odit eaque nostrum excepturi illo voluptas, architecto asperiores incidunt eligendi, libero laudantium. Veritatis.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium ipsam at maiores asperiores optio accusamus molestias quod, reprehenderit cupiditate dicta facere natus cumque reiciendis assumenda sit animi illum dignissimos pariatur?
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit non iusto ipsam quidem officia sint quasi optio odit eaque nostrum excepturi illo voluptas, architecto asperiores incidunt eligendi, libero laudantium. Veritatis.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium ipsam at maiores asperiores optio accusamus molestias quod, reprehenderit cupiditate dicta facere natus cumque reiciendis assumenda sit animi illum dignissimos pariatur?
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit non iusto ipsam quidem officia sint quasi optio odit eaque nostrum excepturi illo voluptas, architecto asperiores incidunt eligendi, libero laudantium. Veritatis.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium ipsam at maiores asperiores optio accusamus molestias quod, reprehenderit cupiditate dicta facere natus cumque reiciendis assumenda sit animi illum dignissimos pariatur?
          </p>
          <p>
            SQLite plugin for Flutter. Supports iOS, Android and MacOS.

            Support transactions and batches
            Automatic version managment during open
            Helpers for insert/query/update/delete queries
            DB operation executed in a background thread on iOS and Android
            Other platforms support:

            Linux/Windows/DartVM support using sqflite_common_ffi
            Experimental Web support using sqflite_common_ffi_web.
            Usage example:

            notepad_sqflite: Simple flutter notepad working on iOS/Android/Windows/linux/Mac
          </p>
        </div>
      </PushComponent>
    </div>
  );
}

export default App;