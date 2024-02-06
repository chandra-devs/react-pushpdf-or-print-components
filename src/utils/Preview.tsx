import React from 'react';
import { previewOptions } from '../index';

interface PreviewProps {
    previewPosition: string;
    closePreview: () => void;
    children?: JSX.Element | JSX.Element[] | string;
    previewOptions?: previewOptions;
}

const Preview: React.FC<PreviewProps> = ({ previewPosition, children, closePreview, previewOptions }) => {

    return (
        <div className={`preview ${previewPosition}`}>
            <div className='title'>
                <h3>{previewOptions?.title ?? ''}</h3>
            </div>
            <div className='view'>
                <div className="previewscreen">
                    {children}
                </div>
                <div className="form">Form</div>
            </div>

            <div className='actions'>
                <button>Submit</button>
                <button onClick={() => closePreview()}>Cancel</button>
            </div>

            <div className='close'>
                <button onClick={() => closePreview()}>X</button>
            </div>
        </div>
    );
};

export default Preview;