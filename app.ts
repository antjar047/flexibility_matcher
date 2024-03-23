import { readEmployerFile, readEmployeeFile } from "./readExcel";
import { Employer, Employee } from "./interfaces";

// Function to calculate the difference between answers
function calculateDifference(answer1: number, answer2: number): number {
    if (answer1 > answer2) {
        return answer1 - answer2; // Difference in case employer's score is higher
    } else {
        return 0; // No difference if employee's score is equal to or less than employer's score
    }
}

// Function to compare answers and find the overall score
function compareAnswers(employerAnswers: number[], employeeAnswers: number[]): number {
    let totalDifference: number = 0;
    for (let i = 0; i < employerAnswers.length; i++) {
        const difference: number = calculateDifference(employerAnswers[i], employeeAnswers[i]);
        totalDifference += difference;
    }
    return totalDifference;
}

// Read the employer data from the Excel file
const employers: Employer[] = readEmployerFile("./Employer_flexibility.xlsx");

// Read the employee data from the Excel file
const employees: Employee[] = readEmployeeFile("./Employee_flexibility.xlsx");

// Compare each employee with each employer
employees.forEach((employee) => {
    const employeeAnswers: number[] = [
        employee.numberOfHoursFlexibility,
        employee.flexibilityOfHours,
        employee.flexibilityOfVenue,
        employee.amountOfTravel,
        employee.distanceOfTravel,
        employee.overnightStays,
        employee.holidayBookingAvailability,
        employee.dailyWorkPatternPossibilities
    ];

    console.log(`Comparisons for Employee ${employee.id}:`);

    employers.forEach((employer) => {
        const employerAnswers: number[] = [
            employer.numberOfHoursFlexibility,
            employer.flexibilityOfHours,
            employer.flexibilityOfVenue,
            employer.amountOfTravel,
            employer.distanceOfTravel,
            employer.overnightStays,
            employer.holidayBookingAvailability,
            employer.dailyWorkPatternPossibilities
        ];

        const overallScore: number = compareAnswers(employerAnswers, employeeAnswers);
        console.log(`  - Employer ${employer.id} overall score:`, overallScore);
    });

    console.log(); // Add a blank line between employee comparisons
});
