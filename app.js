"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Import the readExcelFile function from readexcel.ts
const readExcel_1 = require("./readExcel");
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
const employers = (0, readExcel_1.readExcelFile)("path/to/your/excel/Employer_flexibility.xlsx");
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
        employer.dailyWorkPatternPossibilities,
    ];
    const overallScore = compareAnswers(employerAnswers, employeeAnswers);
    console.log(`Employer ${employer.id} overall score:`, overallScore);
});
