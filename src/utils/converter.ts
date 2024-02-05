import jsPDF from "jspdf";
import { MM_TO_PX } from "./constants";
import { ConversionOptions, Options } from "./types";

export default class Converter {
  pdf: InstanceType<typeof jsPDF>;
  canvas: HTMLCanvasElement;
  options: Options;
  constructor(canvas: HTMLCanvasElement, options: ConversionOptions) {
    this.canvas = canvas;
    this.options = options;
    this.pdf = new jsPDF({
      format: this.options.page && this.options.page.format,
      orientation: this.options.page && this.options.page.orientation,
      ...(this.options.overrides && this.options.overrides.pdf),
      unit: "mm",
    });
  }
  getMarginTopMM() {
    if (!this.options.page) {
      return 0; // or some default value
    }

    const margin =
      typeof this.options.page.margin === "object"
        ? this.options.page && this.options.page.margin.top
        : this.options.page && this.options.page.margin;
    return Number(margin);
  }
  getMarginLeftMM() {
    if (!this.options.page) {
      return 0; // or some default value
    }

    const margin =
      typeof this.options.page.margin === "object"
        ? this.options.page && this.options.page.margin.left
        : this.options.page && this.options.page.margin;
    return Number(margin);
  }
  getMarginRightMM() {
    if (!this.options.page) {
      return 0; // or some default value
    }

    const margin =
      typeof this.options.page.margin === "object"
        ? this.options.page && this.options.page.margin.right
        : this.options.page && this.options.page.margin;
    return Number(margin);
  }
  getMarginBottomMM() {
    if (!this.options.page) {
      return 0; // or some default value
    }

    const margin =
      typeof this.options.page.margin === "object"
        ? this.options.page && this.options.page.margin.bottom
        : this.options.page && this.options.page.margin;
    return Number(margin);
  }
  getMarginTop() {
    return this.getMarginTopMM() * MM_TO_PX;
  }
  getMarginBottom() {
    return this.getMarginBottomMM() * MM_TO_PX;
  }
  getMarginLeft() {
    return this.getMarginLeftMM() * MM_TO_PX;
  }
  getMarginRight() {
    return this.getMarginRightMM() * MM_TO_PX;
  }
  getScale() {
    return this.options.resolution;
  }
  getPageHeight() {
    return this.getPageHeightMM() * MM_TO_PX;
  }
  getPageHeightMM() {
    return this.pdf.internal.pageSize.height;
  }
  getPageWidthMM() {
    return this.pdf.internal.pageSize.width;
  }
  getPageWidth() {
    return this.getPageWidthMM() * MM_TO_PX;
  }
  getOriginalCanvasWidth() {
    if (!this.canvas) {
      return 0; // or some default value
    }
    const scale = this.getScale();
    if (scale === undefined) {
      throw new Error("Scale is undefined");
    }

    return this.canvas.width / scale;
  }
  getOriginalCanvasHeight() {
    if (!this.canvas) {
      return 0; // or some default value
    }

    const scale = this.getScale();
    if (scale === undefined) {
      throw new Error("Scale is undefined");
    }

    return this.canvas.height / scale;
  }
  getCanvasPageAvailableHeight() {
    if (!this.canvas) {
      return 0; // or some default value
    }

    const scale = this.getScale();
    if (scale === undefined) {
      throw new Error("Scale is undefined");
    }

    return (
      this.getPageAvailableHeight() * scale * this.getHorizontalFitFactor()
    );
  }
  getPageAvailableWidth() {
    return this.getPageWidth() - (this.getMarginLeft() + this.getMarginRight());
  }
  getPageAvailableHeight() {
    return (
      this.getPageHeight() - (this.getMarginTop() + this.getMarginBottom())
    );
  }
  getPageAvailableWidthMM() {
    return this.getPageAvailableWidth() / MM_TO_PX;
  }
  getPageAvailableHeightMM() {
    return this.getPageAvailableHeight() / MM_TO_PX;
  }
  getNumberPages() {
    return Math.ceil(this.canvas.height / this.getCanvasPageAvailableHeight());
  }
  getHorizontalFitFactor() {
    if (this.getPageAvailableWidth() < this.getOriginalCanvasWidth()) {
      return this.getOriginalCanvasWidth() / this.getPageAvailableWidth();
    }
    return 1;
  }
  getCanvasOffsetY(pageNumber: number) {
    return this.getCanvasPageAvailableHeight() * (pageNumber - 1);
  }
  getCanvasHeightLeft(pageNumber: number) {
    return this.canvas.height - this.getCanvasOffsetY(pageNumber);
  }
  getCanvasPageHeight(pageNumber: number) {
    if (this.canvas.height < this.getCanvasPageAvailableHeight()) {
      return this.canvas.height;
    }
    const canvasHeightPending = this.getCanvasHeightLeft(pageNumber);
    return canvasHeightPending < this.getCanvasPageAvailableHeight()
      ? canvasHeightPending
      : this.getCanvasPageAvailableHeight();
  }
  getCanvasPageWidth() {
    return this.canvas.width;
  }
  createCanvasPage(pageNumber: number): HTMLCanvasElement {
    const canvasPageWidth = this.getCanvasPageWidth();
    const canvasPageHeight = this.getCanvasPageHeight(pageNumber);
    const canvasPage = document.createElement("canvas");
    canvasPage.setAttribute("width", String(canvasPageWidth));
    canvasPage.setAttribute("height", String(canvasPageHeight));
    const ctx = canvasPage.getContext("2d");
    if (ctx === null) {
      throw new Error("Failed to get 2D context");
    }
    ctx.drawImage(
      this.canvas,
      0,
      this.getCanvasOffsetY(pageNumber),
      this.canvas.width,
      canvasPageHeight,
      0,
      0,
      this.canvas.width,
      canvasPageHeight
    );
    return canvasPage;
  }
  convert(): InstanceType<typeof jsPDF> {
    let pageNumber = 1;
    const numberPages = this.getNumberPages();
    const scale = this.getScale();
    if (!this.options.page) {
      return this.pdf;
    }

    if (!this.options.canvas) {
      return this.pdf;
    }

    if (scale === undefined) {
      throw new Error("Scale is undefined");
    }
    while (pageNumber <= numberPages) {
      if (pageNumber > 1) {
        this.pdf.addPage(
          this.options.page.format,
          this.options.page.orientation
        );
      }
      const canvasPage = this.createCanvasPage(pageNumber);
      const pageImageDataURL = canvasPage.toDataURL(
        this.options.canvas.mimeType,
        this.options.canvas.qualityRatio
      );
      this.pdf.setPage(pageNumber);
      this.pdf.addImage({
        imageData: pageImageDataURL,
        width:
          canvasPage.width / (scale * MM_TO_PX * this.getHorizontalFitFactor()),
        height:
          canvasPage.height /
          (scale * MM_TO_PX * this.getHorizontalFitFactor()),
        x: this.getMarginLeftMM(),
        y: this.getMarginTopMM(),
      });
      pageNumber += 1;
    }
    return this.pdf;
  }
}
