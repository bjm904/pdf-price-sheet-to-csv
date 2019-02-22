const fs = require('fs');
const cp = require('child_process');
const PDFParser = require('pdf2json');
const Json2csvParser = require('json2csv').Parser;

const outputDir = 'tmp';
const outputFileName = `${outputDir}\\output-${Date.now()}.csv`;
const outputBrokenFileName = `${outputDir}\\output-broken-${Date.now()}.csv`;

const inputFileName = process.argv[2];
if (!inputFileName) {
  console.log('Error! -> Please use the launcher to open a file');
  process.exit(1);
}

const cleanString = (string) => {
  let parsedString = decodeURIComponent(string);
  parsedString = parsedString.replace(/\s\s+/g, ' ');
  parsedString = parsedString.trim();
  return parsedString;
};

const parse = () => {
  console.log('Starting program');
  console.log('Parsing PDF');
  const pdfParser = new PDFParser();
  const csvItemsParser = new Json2csvParser();
  const csvItemsBrokenParser = new Json2csvParser();

  pdfParser.on('pdfParser_dataError', errData => console.error(errData.parserError) );
  pdfParser.on('pdfParser_dataReady', (pdfData) => {
    console.log('Combining pages');
    const texts = [];
    pdfData.formImage.Pages.forEach((page) => {
      texts.push(...page.Texts);
    });

    console.log('Creating strings');
    const strings = texts.map(text => text.R[0].T);

    console.log('Parsing results');
    const items = [];
    const itemsBroken = [];
    strings.forEach((string, i) => {
      const parsedString = cleanString(string);
      if (parsedString.includes('$') && /^\$\d+.\d+$/.test(parsedString)) {
        /*
        Case 1:
        itemCode, description, uom, $price
        Case 2:
        itemCode, description, $price
        Case 3:
        itemCode, description1, description2, uom, $price
        Case 4:
        itemCode, description1, description2, description3, uom, $price
        */
        if (Number(cleanString(strings[i - 3]))) {
          items.push({
            UOM: cleanString(strings[i - 1]),
            Price: parsedString,
            Description: cleanString(strings[i - 2]),
            ItemCode: cleanString(strings[i - 3]),
          });
        } else if (Number(cleanString(strings[i - 2]))) {
          items.push({
            UOM: '',
            Price: parsedString,
            Description: cleanString(strings[i - 1]),
            ItemCode: cleanString(strings[i - 2]),
          });
        } else if (Number(cleanString(strings[i - 4]))) {
          const Description = cleanString(strings[i - 3]).concat(cleanString(strings[i - 2]));
          items.push({
            Description,
            UOM: cleanString(strings[i - 1]),
            Price: parsedString,
            ItemCode: cleanString(strings[i - 4]),
          });
        } else if (Number(cleanString(strings[i - 5]))) {
          const Description = cleanString(strings[i - 4]).concat(cleanString(strings[i - 3]).concat(cleanString(strings[i - 2])));
          items.push({
            Description,
            UOM: cleanString(strings[i - 1]),
            Price: parsedString,
            ItemCode: cleanString(strings[i - 5]),
          });
        } else {
          itemsBroken.push([
            cleanString(strings[i - 4]),
            cleanString(strings[i - 3]),
            cleanString(strings[i - 2]),
            cleanString(strings[i - 1]),
            cleanString(strings[i - 0]),
          ]);
        }
      }
    });
    console.log(`Found ${items.length} items and ${itemsBroken.length} broken items`);

    console.log('Converting data to csv');
    const csvItems = csvItemsParser.parse(items);
    const csvItemsBroken = csvItemsBrokenParser.parse(itemsBroken);
    console.log('Writing files');
    fs.writeFileSync(outputFileName, csvItems);
    fs.writeFileSync(outputBrokenFileName, csvItemsBroken);
    console.log('Opening files');
    cp.exec(outputFileName);
    cp.exec(outputBrokenFileName);
    console.log('Done');
  });

  pdfParser.loadPDF(inputFileName);
};

parse();
