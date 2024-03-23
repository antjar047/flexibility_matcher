// Function to calculate the difference between answers
function calculateDifference(answer1: number, answer2: number): number {
  if (answer1 > answer2) {
    return answer1 - answer2; // Difference in case employer's score is higher
  } else {
    return 0; // No difference if employee's score is equal to or less than employer's score
  }
}

// Function to compare answers and find the overall score
function compareAnswers(
  employerAnswers: number[],
  employeeAnswers: number[]
): number {
  let totalDifference: number = 0;
  for (let i = 0; i < employerAnswers.length; i++) {
    const difference: number = calculateDifference(
      employerAnswers[i],
      employeeAnswers[i]
    );
    totalDifference += difference;
  }
  return totalDifference;
}

// Sample employer and employee data
const employerAnswers: number[] = [9, 6, 7, 9, 5, 6, 7, 8, 9];
const employeeAnswers: number[] = [7, 5, 6, 8, 6, 7, 8, 9, 10];

// Compare employer and employee answers
const overallScore: number = compareAnswers(employerAnswers, employeeAnswers);

console.log("Overall score:", overallScore);
