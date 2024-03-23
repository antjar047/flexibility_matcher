"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var XLSX = require("xlsx");
function readExcelFile(filePath) {
    // Read the Excel file
    var workbook = XLSX.readFile(filePath);
    // Get the first worksheet
    var sheetName = workbook.SheetNames[0];
    var worksheet = workbook.Sheets[sheetName];
    // Convert the worksheet to a JSON object
    var data = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
    // Process the data
    data.forEach(function (row, rowIndex) {
        if (rowIndex === 0) {
            // Handle header row
            console.log("Header:", row);
        }
        else {
            // Handle data rows
            console.log("Data:", row);
        }
    });
}
// Usage example
var filePath = "path/to/your/excel/file.xlsx";
readExcelFile(filePath);
