import React from 'react';
import { previewOptions } from '../index';
interface PreviewProps {
    previewPosition: string;
    closePreview: () => void;
    children?: JSX.Element | JSX.Element[] | string;
    previewOptions?: previewOptions;
}
declare const Preview: React.FC<PreviewProps>;
export default Preview;
