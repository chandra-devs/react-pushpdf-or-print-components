import React, { useState, useEffect } from 'react';
import { previewOptions } from '../index';
import generatePDF, { Resolution, Margin, Options } from "./index";
import Field from './fields';

interface PreviewProps {
    previewPosition: string;
    closePreview: () => void;
    children?: JSX.Element | JSX.Element[] | string;
    previewOptions?: previewOptions;
}

interface onChangeHandlers {
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleSelectionChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    handleTextAreaChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

interface pdfFile {
    pdfFile: File | null;
}

const Preview: React.FC<PreviewProps> = ({ previewPosition, children, closePreview, previewOptions }) => {
    const [formFields, setFormFields] = useState<any[]>([]);
    const [pdfFile, setPdfFile] = useState(null);
    useEffect(() => {
        generatePdf();
    }, []);
    useEffect(() => {
        
        console.log('pdfFile:', pdfFile);
    }, [formFields, pdfFile]);


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormFields([...formFields, { name: e.target.name, value: e.target.value }]);
    }

    const handleSelectionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setFormFields([...formFields, { name: e.target.name, value: e.target.value }]);
    }

    const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setFormFields([...formFields, { name: e.target.name, value: e.target.value }]);
    }


    const setFile = (file: any | null) => {
        setPdfFile(file);
    }

    const generatePdf = async () => {
        const options: Options = {
            method: "open",
            filename: previewOptions?.pdfFileName,
            resolution: Resolution.EXTREME,
            page: {
                margin: Margin.SMALL,
                format: "a4",
                orientation: "portrait"
            },
            canvas: {
                mimeType: "image/jpeg",
                qualityRatio: 1
            },
            overrides: {
                pdf: {
                    compress: true
                },
                canvas: {
                    useCORS: true
                }
            }
        };

        const EL = document.getElementById('previewScreen');

        try {
            const pdfBlob = await generatePDF(() => EL, options);
            setFile(pdfBlob);


        } catch (error) {
            console.error('Error generating PDF:', error);

        } finally {

        }
    };

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
                <div className="previewscreen" id="previewScreen">
                    {children}
                </div>
                <div className="form"><Form previewOptions={previewOptions ?? {}} onChangeHandlers={
                    {
                        handleChange: handleChange,
                        handleSelectionChange: handleSelectionChange,
                        handleTextAreaChange: handleTextAreaChange
                    }

                } pdfFile={pdfFile} /></div>
            </div>

            <div className='actions'>
                <button>{previewOptions?.submitButtonText ?? 'Submit'}</button>
                <button onClick={() => closePreview()}>{previewOptions?.cancelButtonText ?? 'Cancel'}</button>
            </div>

        </div>
    );
};

const Form: React.FC<{ previewOptions: previewOptions, onChangeHandlers: onChangeHandlers, pdfFile: pdfFile }> = ({ previewOptions, onChangeHandlers, pdfFile }) => {
    useEffect(() => {}, []);
    
    if (!pdfFile) {
        return <div>Loading...</div>;
    }
    
    return (
        <div className="form">
            <div className='file'>
                Generated File: {pdfFile?.name}
            </div>
            <br/>
            {previewOptions?.formFields?.map((field: any, index: number) => (
                <Field key={index} {...field} onChange={
                    (e: React.ChangeEvent<HTMLInputElement>) => onChangeHandlers.handleChange(e)
                } onSelectionChange={
                    (e: React.ChangeEvent<HTMLSelectElement>) => onChangeHandlers.handleSelectionChange(e)
                } onTextAreaChange={
                    (e: React.ChangeEvent<HTMLTextAreaElement>) => onChangeHandlers.handleTextAreaChange(e)
                } />
            ))}
        </div>
    );
}

export default Preview;