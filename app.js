"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Import the readExcelFile function from readexcel.ts
const readExcel_1 = require("./readExcel");
// Define the Employer interface
// interface Employer {
//     id: number;
//     startTime: string;
//     completionTime: string;
//     email: string;
//     name: string;
//     flexibleWorkingPolicies: string;
//     numberOfHoursFlexibility: number;
//     flexibilityOfHours: number;
//     flexibilityOfVenue: number;
//     amountOfTravel: number;
//     distanceOfTravel: number;
//     overnightStays: number;
//     holidayBookingAvailability: number;
//     dailyWorkPatternPossibilities: number;
// }
// Function to calculate the difference between answers
function calculateDifference(answer1, answer2) {
    if (answer1 > answer2) {
        return answer1 - answer2; // Difference in case employer's score is higher
    }
    else {
        return 0; // No difference if employee's score is equal to or less than employer's score
    }
}
// Function to compare answers and find the overall score
function compareAnswers(employerAnswers, employeeAnswers) {
    let totalDifference = 0;
    for (let i = 0; i < employerAnswers.length; i++) {
        const difference = calculateDifference(employerAnswers[i], employeeAnswers[i]);
        totalDifference += difference;
    }
    return totalDifference;
}
// Sample employee data (you would need to define this according to your requirements)
const employeeAnswers = [7, 5, 6, 8, 6, 7, 8, 9, 10];
// Read the employer data from the Excel file
const employee_flex = "./Employee_flexibility.xlsx";
const employer_flex = "./Employer_flexibility.xlsx";
const { employers, employees } = (0, readExcel_1.readExcelFile)(employer_flex, employee_flex);
// Compare each employer with the employee
employers.forEach((employer) => {
    const employerAnswers = [
        employer.numberOfHoursFlexibility,
        employer.flexibilityOfHours,
        employer.flexibilityOfVenue,
        employer.amountOfTravel,
        employer.distanceOfTravel,
        employer.overnightStays,
        employer.holidayBookingAvailability,
        employer.dailyWorkPatternPossibilities
    ];
    const overallScore = compareAnswers(employerAnswers, employeeAnswers);
    console.log(`Employer ${employer.id} overall score:`, overallScore);
});
