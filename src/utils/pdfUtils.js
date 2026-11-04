import { PDFDocument } from "pdf-lib";

export async function mergePDFs(files) {
  // Create a new empty PDF
  const mergedPDF = await PDFDocument.create();

  // Process each uploaded PDF
  for (const file of files) {
    // Read the PDF file as bytes
    const fileBytes = await file.arrayBuffer();

    // Load the existing PDF
    const pdf = await PDFDocument.load(fileBytes);

    // Get all pages from the current PDF
    const copiedPages = await mergedPDF.copyPages(pdf, pdf.getPageIndices());

    // Add copied pages to the new PDF
    copiedPages.forEach((page) => {
      mergedPDF.addPage(page);
    });
  }

  // Generate the final PDF bytes
  const mergedBytes = await mergedPDF.save();

  // Create a downloadable PDF Blob
  return new Blob([mergedBytes], {
    type: "application/pdf",
  });
}
