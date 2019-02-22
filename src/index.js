const fs = require('fs');
const cp = require('child_process');
const PDFParser = require('pdf2json');
const Json2csvParser = require('json2csv').Parser;

const inputFileName = process.argv[2];
if (!inputFileName) {
  console.log('Error! -> Please use the launcher to open a file');
  process.exit(1);
}

const cleanString = (string) => {
  let parsedString = string;
  parsedString = parsedString.trim();
  return parsedString;
}

const parse = () => {
  let pdfParser = new PDFParser();

  pdfParser.on("pdfParser_dataError", errData => console.error(errData.parserError) );
  pdfParser.on("pdfParser_dataReady", (pdfData) => {
    console.log(pdfData);
    const texts = 
    const strings = [];
    strings.forEach((string) => {
      if (string.includes('$') && string.test(/^\$\d+.\d+/)) {

      }
    });
  });

  pdfParser.loadPDF(inputFileName);
};
