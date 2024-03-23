"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.readExcelFile = void 0;
const XLSX = __importStar(require("xlsx"));
// Exporting the readExcelFile function
function readExcelFile(employerFilePath, employeeFilePath) {
    // Read the employer Excel file
    const employerWorkbook = XLSX.readFile(employerFilePath);
    const employerSheetName = employerWorkbook.SheetNames[0];
    const employerWorksheet = employerWorkbook.Sheets[employerSheetName];
    const employerData = XLSX.utils.sheet_to_json(employerWorksheet, { header: 1 });
    // Process the employer data and convert to Employer objects
    const employers = [];
    for (let rowIndex = 1; rowIndex < employerData.length; rowIndex++) {
        const row = employerData[rowIndex];
        const employer = {
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
    const employeeData = XLSX.utils.sheet_to_json(employeeWorksheet, { header: 1 });
    // Process the employee data and convert to Employee objects
    const employees = [];
    for (let rowIndex = 1; rowIndex < employeeData.length; rowIndex++) {
        const row = employeeData[rowIndex];
        const employee = {
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
exports.readExcelFile = readExcelFile;
