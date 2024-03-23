// Sample employer data
var employers = [
    {
        id: 1,
        startTime: '3/23/24 14:02:32',
        completionTime: '3/23/24 14:03:20',
        email: 'anonymous',
        name: '',
        flexibleWorkingPolicies: 'Ability to purchase additional annual leave',
        numberOfHoursFlexibility: 6,
        flexibilityOfHours: 6,
        flexibilityOfVenue: 4,
        amountOfTravel: 8,
        distanceOfTravel: 8,
        overnightStays: 3,
        holidayBookingAvailability: 8,
        dailyWorkPatternPossibilities: 10
    },
    {
        id: 2,
        startTime: '3/23/24 14:52:28',
        completionTime: '3/23/24 14:53:02',
        email: 'anonymous',
        name: '',
        flexibleWorkingPolicies: 'Part time hours',
        numberOfHoursFlexibility: 10,
        flexibilityOfHours: 10,
        flexibilityOfVenue: 10,
        amountOfTravel: 5,
        distanceOfTravel: 5,
        overnightStays: 4,
        holidayBookingAvailability: 10,
        dailyWorkPatternPossibilities: 10
    },
    {
        id: 3,
        startTime: '3/23/24 14:53:38',
        completionTime: '3/23/24 14:54:02',
        email: 'anonymous',
        name: '',
        flexibleWorkingPolicies: 'TOIL',
        numberOfHoursFlexibility: 2,
        flexibilityOfHours: 3,
        flexibilityOfVenue: 2,
        amountOfTravel: 4,
        distanceOfTravel: 4,
        overnightStays: 1,
        holidayBookingAvailability: 1,
        dailyWorkPatternPossibilities: 1
    },
    {
        id: 4,
        startTime: '3/23/24 14:54:04',
        completionTime: '3/23/24 14:54:21',
        email: 'anonymous',
        name: '',
        flexibleWorkingPolicies: 'Ability to purchase additional annual leave',
        numberOfHoursFlexibility: 5,
        flexibilityOfHours: 5,
        flexibilityOfVenue: 5,
        amountOfTravel: 4,
        distanceOfTravel: 4,
        overnightStays: 3,
        holidayBookingAvailability: 4,
        dailyWorkPatternPossibilities: 3
    },
    {
        id: 5,
        startTime: '3/23/24 14:54:34',
        completionTime: '3/23/24 14:54:56',
        email: 'anonymous',
        name: '',
        flexibleWorkingPolicies: 'Carers policy',
        numberOfHoursFlexibility: 7,
        flexibilityOfHours: 7,
        flexibilityOfVenue: 8,
        amountOfTravel: 8,
        distanceOfTravel: 8,
        overnightStays: 3,
        holidayBookingAvailability: 4,
        dailyWorkPatternPossibilities: 5
    }
];
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
    var totalDifference = 0;
    for (var i = 0; i < employerAnswers.length; i++) {
        var difference = calculateDifference(employerAnswers[i], employeeAnswers[i]);
        totalDifference += difference;
    }
    return totalDifference;
}
// Sample employee data (you would need to define this according to your requirements)
var employeeAnswers = [7, 5, 6, 8, 6, 7, 8, 9, 10];
// Compare each employer with the employee
employers.forEach(function (employer) {
    var employerAnswers = [
        employer.numberOfHoursFlexibility,
        employer.flexibilityOfHours,
        employer.flexibilityOfVenue,
        employer.amountOfTravel,
        employer.distanceOfTravel,
        employer.overnightStays,
        employer.holidayBookingAvailability,
        employer.dailyWorkPatternPossibilities
    ];
    var overallScore = compareAnswers(employerAnswers, employeeAnswers);
    console.log("Employer ".concat(employer.id, " overall score:"), overallScore);
});
