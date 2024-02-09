import React from 'react';
import { previewOptions } from '../index';
import { ConversionOptions } from './types';
interface PreviewProps {
    previewPosition: string;
    closePreview: () => void;
    children?: JSX.Element | JSX.Element[] | string;
    previewOptions?: previewOptions;
    style?: React.CSSProperties;
    mode?: ConversionOptions["method"];
}
declare const Preview: React.FC<PreviewProps>;
export default Preview;
