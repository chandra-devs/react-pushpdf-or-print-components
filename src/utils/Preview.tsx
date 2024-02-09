import React, { useState, useEffect } from 'react';
import { previewOptions } from '../index';
import generatePDF, { Resolution, Margin, Options } from "./index";
import Field from './fields';
import { ConversionOptions } from './types';

interface PreviewProps {
    previewPosition: string;
    closePreview: () => void;
    children?: JSX.Element | JSX.Element[] | string;
    previewOptions?: previewOptions;
    style?: React.CSSProperties;
    mode?: ConversionOptions["method"];
}

interface onChangeHandlers {
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleSelectionChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    handleTextAreaChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}


const Preview: React.FC<PreviewProps> = ({ previewPosition, children, closePreview, previewOptions, style }) => {
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
            method: previewOptions?.mode ?? "buildAndCreateFile",
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
        <div className={`preview ${previewPosition}`} style={style}>
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
                <div className="form"><Form previewOptions={previewOptions ?? {}} onChangeHandlers={{
                    handleChange: handleChange,
                    handleSelectionChange: handleSelectionChange,
                    handleTextAreaChange: handleTextAreaChange
                }}/></div>
            </div>

            <div className='actions'>
                <button onClick={
                    () => {
                        if (previewOptions?.onSubmit) {
                            previewOptions.onSubmit({fields: formFields, pdf: pdfFile});
                        }
                        closePreview();
                    }
                
                }>{previewOptions?.submitButtonText ?? 'Submit'}</button>
                <button onClick={() => closePreview()}>{previewOptions?.cancelButtonText ?? 'Cancel'}</button>
            </div>

        </div>
    );
};

const Form: React.FC<{ previewOptions: previewOptions, onChangeHandlers: onChangeHandlers }> = ({ previewOptions, onChangeHandlers }) => {
    useEffect(() => { }, []);
    return (
        <div className="form">
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