import { useRef, useCallback } from "react";
import html2canvas from "html2canvas";

import Converter from "./converter";
import Preview from "./Preview";
import { Options, TargetElementFinder, UsePDFResult } from "./types";
import { buildConvertOptions } from "./utils";
import jsPDF from "jspdf";
export { Resolution, Margin } from "./constants";
export type { Options };

const getTargetElement = (
  targetRefOrFunction: TargetElementFinder
): HTMLElement | null | undefined => {
  if (typeof targetRefOrFunction === "function") {
    return targetRefOrFunction();
  }
  return targetRefOrFunction?.current;
};

export const usePDF = (usePDFoptions?: Options): UsePDFResult => {
  const targetRef = useRef();
  const toPDF = useCallback(
    (toPDFoptions?: Options): Promise<InstanceType<typeof jsPDF>> => {
      return generatePDF(targetRef, usePDFoptions ?? toPDFoptions);
    },
    [targetRef, usePDFoptions]
  );
  return { targetRef, toPDF };
};

const generatePDF = async (
  targetRefOrFunction: TargetElementFinder,
  customOptions?: Options
): Promise<InstanceType<typeof jsPDF | any>> => {
  const options = buildConvertOptions(customOptions);
  const targetElement = getTargetElement(targetRefOrFunction);
  if (!targetElement) {
    console.error("Unable to get the target element.");
    return new jsPDF();
  }
  const canvas = await html2canvas(targetElement, {
    useCORS: options.canvas.useCORS,
    logging: options.canvas.logging,
    scale: options.resolution,
    windowHeight: targetElement.scrollHeight,
    windowWidth: targetElement.scrollWidth,
    ...options.overrides?.canvas,
  });
  const converter = new Converter(canvas, options);
  const pdf = converter.convert();
  switch (options.method) {
    case "build":
      return pdf;
    case "open": {
      window.open(pdf.output("bloburl"), "_blank");
      return pdf;
    }
    case "buildAndCreateFile": {
      const pdfOutput = pdf.output();
      const filename = options.filename ?? `${new Date().getTime()}.pdf`;
      const blob = new Blob([pdfOutput], {type: 'application/pdf'});
      const file = new File([blob], filename, {type: 'application/pdf'});
      return file;
    }
    case "save":
    default: {
      const pdfFilename = options.filename ?? `${new Date().getTime()}.pdf`;
      await pdf.save(pdfFilename, { returnPromise: true });
      return pdf;
    }
  }
};

export default generatePDF;
