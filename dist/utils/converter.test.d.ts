/**
 * @jest-environment jsdom
 */
import Converter from "./converter";
export declare const createPageSnapshotObject: (converter: InstanceType<typeof Converter>, pageNumber: number) => {
    pageNumber: number;
    offsetY: number;
    heightLeft: number;
    pageCanvasHeight: number;
    pageCanvasWidth: number;
    canvas: {
        height: number;
        width: number;
        originalWidth: number;
        originalHeight: number;
    };
    horizontalFitFactor: number;
    scale: number | undefined;
    pageWidthMM: number;
    pageHeightMM: number;
    pageWidth: number;
    pageHeight: number;
    availableHeight: number;
    availableWidth: number;
    availableHeightScaled: number;
    availableWidthScaled: number;
    margin: number | import("./types").DetailedMargin | undefined;
    numberPages: number;
};
