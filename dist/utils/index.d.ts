import { Options, TargetElementFinder, UsePDFResult } from "./types";
import jsPDF from "jspdf";
export { Resolution, Margin } from "./constants";
export type { Options };
export declare const usePDF: (usePDFoptions?: Options) => UsePDFResult;
declare const generatePDF: (targetRefOrFunction: TargetElementFinder, customOptions?: Options) => Promise<InstanceType<typeof jsPDF>>;
export default generatePDF;
