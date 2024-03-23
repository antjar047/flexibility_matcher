import * as XLSX from "xlsx";

function readExcelFile(filePath: string): void {
  // Read the Excel file
  const workbook = XLSX.readFile(filePath);

  // Get the first worksheet
  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];

  // Convert the worksheet to a JSON object
  const data = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

  // Process the data
  data.forEach((row: any[], rowIndex: number) => {
    if (rowIndex === 0) {
      // Handle header row
      console.log("Header:", row);
    } else {
      // Handle data rows
      console.log("Data:", row);
    }
  });
}

// Usage example
const filePath = "path/to/your/excel/file.xlsx";
readExcelFile(filePath);
