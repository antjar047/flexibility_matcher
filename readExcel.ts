import * as XLSX from "xlsx";

// Define the Employer interface
export interface Employer {
    id: number;
    startTime: string;
    completionTime: string;
    email: string;
    name: string;
    flexibleWorkingPolicies: string;
    numberOfHoursFlexibility: number;
    flexibilityOfHours: number;
    flexibilityOfVenue: number;
    amountOfTravel: number;
    distanceOfTravel: number;
    overnightStays: number;
    holidayBookingAvailability: number;
    dailyWorkPatternPossibilities: number;
}

// Define the Employee interface
export interface Employee extends Employer {} // Employee has the same structure as Employer

// Exporting the readExcelFile function
export function readExcelFile(employerFilePath: string, employeeFilePath: string): { employers: Employer[], employees: Employee[] } {
    // Read the employer Excel file
    const employerWorkbook = XLSX.readFile(employerFilePath);
    const employerSheetName = employerWorkbook.SheetNames[0];
    const employerWorksheet = employerWorkbook.Sheets[employerSheetName];
    const employerData: any[][] = XLSX.utils.sheet_to_json(employerWorksheet, { header: 1 });

    // Process the employer data and convert to Employer objects
    const employers: Employer[] = [];
    for (let rowIndex = 1; rowIndex < employerData.length; rowIndex++) {
        const row = employerData[rowIndex];
        const employer: Employer = {
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
            dailyWorkPatternPossibilities: row[13]
        };
        employers.push(employer);
    }

    // Read the employee Excel file
    const employeeWorkbook = XLSX.readFile(employeeFilePath);
    const employeeSheetName = employeeWorkbook.SheetNames[0];
    const employeeWorksheet = employeeWorkbook.Sheets[employeeSheetName];
    const employeeData: any[][] = XLSX.utils.sheet_to_json(employeeWorksheet, { header: 1 });

    // Process the employee data and convert to Employee objects
    const employees: Employee[] = [];
    for (let rowIndex = 1; rowIndex < employeeData.length; rowIndex++) {
        const row = employeeData[rowIndex];
        const employee: Employee = {
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
            dailyWorkPatternPossibilities: row[13]
        };
        employees.push(employee);
    }

    return { employers, employees };
}
