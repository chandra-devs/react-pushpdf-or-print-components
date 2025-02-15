import { Options, TargetElementFinder, UsePDFResult } from "./types";
import jsPDF from "jspdf";
export { Resolution, Margin } from "./constants";
export type { Options };
export declare const usePDF: (usePDFoptions?: Options) => UsePDFResult;
declare const generatePDFFile: (targetRefOrFunction: TargetElementFinder, customOptions?: Options) => Promise<jsPDF | File | undefined>;
export default generatePDFFile;
