"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const readExcel_1 = require("./readExcel");
function compareAnswers(employerAnswers, employeeAnswers) {
    const answerKeys = Object.keys(employerAnswers);
    return answerKeys.reduce((totalDifference, key) => {
        const employerAnswer = employerAnswers[key];
        const employeeAnswer = employeeAnswers[key];
        if (employerAnswer > employeeAnswer) {
            totalDifference += employerAnswer - employeeAnswer;
        }
        return totalDifference;
    }, 0);
}
// Function to compare answers and find the overall scor
// Read the employer data from the Excel file
const employers = (0, readExcel_1.readEmployerFile)("./Employer_flexibility.xlsx");
// Read the employee data from the Excel file
const employees = (0, readExcel_1.readEmployeeFile)("./Employee_flexibility.xlsx");
// Compare each employee with each employer
// employees.forEach((employee) => {
const employeeAnswers = {
    numberOfHoursFlexibility: employees[0].numberOfHoursFlexibility,
    flexibilityOfHours: employees[0].flexibilityOfHours,
    flexibilityOfVenue: employees[0].flexibilityOfVenue,
    amountOfTravel: employees[0].amountOfTravel,
    distanceOfTravel: employees[0].distanceOfTravel,
    overnightStays: employees[0].overnightStays,
    holidayBookingAvailability: employees[0].holidayBookingAvailability,
    dailyWorkPatternPossibilities: employees[0].dailyWorkPatternPossibilities,
};
console.log(`Comparisons for Employee ${employees[0].id}:`);
// Calculate overall scores and store them in an array
const employerScores = employers.map((employer) => {
    const employerAnswers = {
        numberOfHoursFlexibility: employer.numberOfHoursFlexibility,
        flexibilityOfHours: employer.flexibilityOfHours,
        flexibilityOfVenue: employer.flexibilityOfVenue,
        amountOfTravel: employer.amountOfTravel,
        distanceOfTravel: employer.distanceOfTravel,
        overnightStays: employer.overnightStays,
        holidayBookingAvailability: employer.holidayBookingAvailability,
        dailyWorkPatternPossibilities: employer.dailyWorkPatternPossibilities,
    };
    const overallScore = compareAnswers(employerAnswers, employeeAnswers);
    return {
        employerId: employer.id,
        overallScore: overallScore,
    };
});
// Sort the employerScores array based on the overall scores in ascending order
employerScores.sort((a, b) => a.overallScore - b.overallScore);
// Print the sorted employer scores
employerScores.forEach((employerScore) => {
    console.log(`- Employer ${employerScore.employerId} overall score: ${employerScore.overallScore}`);
});
console.log(); // Add a blank line between employee comparisons
// });
