import React from 'react';
import { Button } from 'react-bootstrap';
import PushPrintComponents from "../index";

const PushComponent = () => {
    return (
        <div>
            <PushPrintComponents
                trigger={<Button>Print</Button>}
                pushTrigger={<Button>Save as PDF</Button>}
                pushPdfTo={{
                    url: 'YOUR_API_ENDPOINT',
                    method: 'POST',
                }}
            >
                <div>
                    Content to print or save as PDF.
                </div>
            </PushPrintComponents>
        </div>
    );
}

export default PushComponent;