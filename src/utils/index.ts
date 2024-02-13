import { useRef, useCallback } from "react";
import html2canvas from "html2canvas";

import Converter from "./converter";
import { Options, TargetElementFinder, UsePDFResult } from "./types";
import { buildConvertOptions } from "./utils";
import jsPDF from "jspdf";
import { saveAs } from 'file-saver';
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
    (toPDFoptions?: Options): Promise<jsPDF | File | undefined> => {
      return generatePDF(targetRef, usePDFoptions ?? toPDFoptions);
    },
    [targetRef, usePDFoptions]
  );
  return { targetRef, toPDF };
};

const generatePDF = async (
  targetRefOrFunction: TargetElementFinder,
  customOptions?: Options
): Promise<jsPDF | File | undefined> => {
  const options = buildConvertOptions(customOptions);
  const targetElement = getTargetElement(targetRefOrFunction);
  if (!targetElement) {
    console.error("Unable to get the target element.");
    return new jsPDF();
  }
  await new Promise((resolve) => {
    targetElement.addEventListener('load', resolve); // Check for images, iframes, etc.
    targetElement.style.overflow = "visible"; // Change overflow to visible
    setTimeout(resolve, 2000); // A failsafe timeout 
});

  targetElement.style.backgroundColor = "white";
  console.log('targetElement:', targetElement);
  console.log('height:', targetElement.scrollHeight);
  
  const canvas = await html2canvas(targetElement, {
    useCORS: options.canvas.useCORS,
    // logging: options.canvas.logging,
    allowTaint: true,
    scale: options.resolution,
    backgroundColor: "white", // "transparent
    height: targetElement.scrollHeight + 100,
    ...options.overrides?.canvas,
  });
  
  const converter = new Converter(canvas, options);
  const pdf = converter.convert();
  switch (options.method) {
    case "build":
      return pdf;
    case "open": {
      window.open(pdf.output("bloburl"), "_blank");
      targetElement.style.overflow = "scroll"; // Change overflow to visible
      return pdf;
    }
    case "buildAndCreateFile": {
      const pdfOutput = pdf.output("blob");
      const filename = options.filename ?? `${new Date().getTime()}.pdf`;
      const file = new File([pdfOutput], filename, { type: 'application/pdf' });
      targetElement.style.overflow = "scroll"; // Change overflow to visible
      return file;
    }
    case "save": 
    case "savepng": {
      // Save canvas as image file
      const image = canvas.toDataURL("image/png");
      saveAs(image, "canvas.png");

      targetElement.style.overflow = "scroll"; // Change overflow to visible
      return pdf;
    }
    default: {
      const pdfFilename = options.filename ?? `${new Date().getTime()}.pdf`;
      await pdf.save(pdfFilename, { returnPromise: true });

      return pdf;
    }
  }
};

export default generatePDF;