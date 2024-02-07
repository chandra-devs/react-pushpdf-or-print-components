import React from 'react';
import { previewOptions } from '../index';
import Field from './fields';

interface PreviewProps {
    previewPosition: string;
    closePreview: () => void;
    children?: JSX.Element | JSX.Element[] | string;
    previewOptions?: previewOptions;
}

const Preview: React.FC<PreviewProps> = ({ previewPosition, children, closePreview, previewOptions }) => {

    return (
        <div className={`preview ${previewPosition}`}>
            <div className='header'>
                <div className='title'>
                    <h3>{previewOptions?.title ?? ''}</h3>
                </div>
                <div className='description'>
                    <p>{previewOptions?.description ?? ''}</p>
                </div>
                <div className='close'>
                    <button onClick={() => closePreview()}>X</button>
                </div>
            </div>

            <div className='view'>
                <div className="previewscreen">
                    {children}
                </div>
                <div className="form"><Form previewOptions={previewOptions ?? {}} /></div>
            </div>

            <div className='actions'>
                <button>{previewOptions?.submitButtonText ?? 'Submit'}</button>
                <button onClick={() => closePreview()}>{previewOptions?.cancelButtonText ?? 'Cancel'}</button>
            </div>

        </div>
    );
};

const Form: React.FC<{ previewOptions: previewOptions }> = ({ previewOptions }) => {
    return (
        <div className="form">
            {previewOptions?.formFields?.map((field: any, index: number) => (
                <Field key={index} {...field} />
            ))}
        </div>
    );
}

export default Preview;