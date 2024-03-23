import * as XLSX from "xlsx";
import { ExcelAnswers } from "./interfaces";

// Function to read the Excel file and convert data to Employer objects
export function readEmployerFile(filePath: string): ExcelAnswers[] {
  // Read the Excel file
  const workbook = XLSX.readFile(filePath);

  // Get the first worksheet
  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];

  // Convert the worksheet to a JSON object
  const data: any[][] = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

  // Process the data and convert to Employer objects
  const employers: ExcelAnswers[] = [];
  for (let rowIndex = 1; rowIndex < data.length; rowIndex++) {
    const row = data[rowIndex];
    const employer: ExcelAnswers = {
      id: row[0],
      startTime: row[1],
      completionTime: row[2],
      email: row[3],
      name: row[4],
      flexibleWorkingPolicies: row[5],
      numberOfHoursFlexibility: row[6],
      flexibilityOfHours: row[7],
      flexibilityOfVenue: row[8],
      amountOfTravel: row[9],
      distanceOfTravel: row[10],
      overnightStays: row[11],
      holidayBookingAvailability: row[12],
      dailyWorkPatternPossibilities: row[13],
    };
    employers.push(employer);
  }
  return employers;
}
// Function to read the Excel file and convert data to Employee objects
export function readEmployeeFile(filePath: string): ExcelAnswers[] {
  // Read the Excel file
  const workbook = XLSX.readFile(filePath);

  // Get the first worksheet
  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];

  // Convert the worksheet to a JSON object
  const data: any[][] = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

  // Process the data and convert to Employee objects
  const employees: ExcelAnswers[] = [];
  for (let rowIndex = 1; rowIndex < data.length; rowIndex++) {
    const row = data[rowIndex];
    const employee: ExcelAnswers = {
      id: row[0],
      startTime: row[1],
      completionTime: row[2],
      email: row[3],
      name: row[4],
      flexibleWorkingPolicies: row[5],
      numberOfHoursFlexibility: row[6],
      flexibilityOfHours: row[7],
      flexibilityOfVenue: row[8],
      amountOfTravel: row[9],
      distanceOfTravel: row[10],
      overnightStays: row[11],
      holidayBookingAvailability: row[12],
      dailyWorkPatternPossibilities: row[13],
    };
    employees.push(employee);
  }
  return employees;
}
