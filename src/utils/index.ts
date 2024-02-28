import { useRef, useCallback } from "react";
import html2canvas from "html2canvas";

import Converter from "./converter";
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
    scale: 2,
    backgroundColor: "white", // "transparent
    height: targetElement.scrollHeight,
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
    default: {
      const pdfFilename = options.filename ?? `${new Date().getTime()}.pdf`;
      await pdf.save(pdfFilename, { returnPromise: true });

      return pdf;
    }
  }
};

const generatePDFFile = async (
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
      targetElement.addEventListener('load', resolve); 
      targetElement.style.overflow = "visible"; 
      setTimeout(resolve, 2000); 
  });

  targetElement.style.backgroundColor = "white";
  console.log('targetElement:', targetElement);
  console.log('height:', targetElement.scrollHeight);

  // A4 Dimensions in pixels (consider the scale factor):
  const A4_HEIGHT = 595 * 2; // At scale 2 
  const A4_WIDTH = 842 * 2; // At scale 2

  const contentHeight = targetElement.scrollHeight;
  const pageCount = Math.ceil(contentHeight / A4_HEIGHT);

  const pdf = new jsPDF('p', 'px', 'a4'); // Create jsPDF document in A4
  targetElement.style.overflow = 'hidden'; 

  for (let i = 0; i < pageCount; i++) {
      const top = i * A4_HEIGHT;
      // const height = Math.min(A4_HEIGHT, contentHeight - top); 

      // targetElement.style.overflow = 'hidden';

      const canvas = await html2canvas(targetElement, {
          y: top,
          height: A4_HEIGHT,
          width: A4_WIDTH,
          useCORS:false,
          // logging: options.canvas.logging,
          allowTaint: true,
          scale: 0.98,
          backgroundColor: "white", 
          // ...options.overrides?.canvas,
      });

      // Logging for analysis
      // console.log(`Page ${i+1}:`, top, height); 
      
        console.log('Canvas Preview:', canvas.toDataURL().substring(0, 50)); 

        const imgData = canvas.toDataURL('image/png'); // or 'image/jpeg' 


        if (i > 0) {
          pdf.addPage();
        }

        pdf.addImage(imgData, 'PNG', 0, 0, A4_WIDTH, A4_HEIGHT);

      if (i < pageCount - 1) {
          targetElement.style.overflow = 'visible';
      }
  }

  if (options.method === "build") {
      return pdf;
  } else if (options.method === "open") {
      window.open(pdf.output("bloburl"), "_blank");
      targetElement.style.overflow = "scroll"; 
      return pdf;
  } else if (options.method === "buildAndCreateFile") {
      const pdfOutput = pdf.output("blob");
      const filename = options.filename ?? `${new Date().getTime()}.pdf`;
      const file = new File([pdfOutput], filename, { type: 'application/pdf' });
      targetElement.style.overflow = "scroll"; 
      return file;
  } else {
      const pdfFilename = options.filename ?? `${new Date().getTime()}.pdf`;
      await pdf.save(pdfFilename, { returnPromise: true });
      return pdf;
  }

};
 

export default generatePDFFile;