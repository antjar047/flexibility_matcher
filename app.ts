import { readEmployerFile, readEmployeeFile } from "./readExcel";
import { ExcelAnswers, QuestionnaireAnswers } from "./interfaces";
import * as http from 'http'; // Import the 'http' module
import * as fs from 'fs';
import * as path from 'path';

function compareAnswers(
    employerAnswers: QuestionnaireAnswers,
    employeeAnswers: QuestionnaireAnswers
  ): { overallScore: number; categoryScores: { [key: string]: number } } {
    const answerKeys = Object.keys(employerAnswers) as Array<
      keyof QuestionnaireAnswers
    >;
  
    const categoryScores: { [key: string]: number } = {};
    let overallScore = 0;
  
    answerKeys.forEach((key) => {
      const employerAnswer = employerAnswers[key];
      const employeeAnswer = employeeAnswers[key];
      const difference = employerAnswer - employeeAnswer;
      categoryScores[key] = Math.abs(difference); // Adjusted to take absolute difference
  
      if (employerAnswer > employeeAnswer) {
        overallScore += employerAnswer - employeeAnswer; // Include this for overall score calculation
      }
    });
  
    return { overallScore, categoryScores };
  }
  

// Read the employer data from the Excel file
const employers: ExcelAnswers[] = readEmployerFile(
  "./Employer_flexibility.xlsx"
);

// Read the employee data from the Excel file
const employees: ExcelAnswers[] = readEmployeeFile(
  "./Employee_flexibility.xlsx"
);

// Compare each employee with each employer
const employeeAnswers: QuestionnaireAnswers = {
  numberOfHoursFlexibility: employees[0].numberOfHoursFlexibility,
  flexibilityOfHours: employees[0].flexibilityOfHours,
  flexibilityOfVenue: employees[0].flexibilityOfVenue,
  amountOfTravel: employees[0].amountOfTravel,
  distanceOfTravel: employees[0].distanceOfTravel,
  overnightStays: employees[0].overnightStays,
  holidayBookingAvailability: employees[0].holidayBookingAvailability,
  dailyWorkPatternPossibilities: employees[0].dailyWorkPatternPossibilities,
};

// Calculate overall scores and store them in an array
const employerScores = employers.map((employer) => {
  const employerAnswers: QuestionnaireAnswers = {
    numberOfHoursFlexibility: employer.numberOfHoursFlexibility,
    flexibilityOfHours: employer.flexibilityOfHours,
    flexibilityOfVenue: employer.flexibilityOfVenue,
    amountOfTravel: employer.amountOfTravel,
    distanceOfTravel: employer.distanceOfTravel,
    overnightStays: employer.overnightStays,
    holidayBookingAvailability: employer.holidayBookingAvailability,
    dailyWorkPatternPossibilities: employer.dailyWorkPatternPossibilities,
  };

  const { overallScore, categoryScores } = compareAnswers(employerAnswers, employeeAnswers);

  return {
    employerId: employer.id,
    overallScore,
    categoryScores,
  };
});

// Sort the employerScores array based on the overall scores in ascending order
employerScores.sort((a, b) => a.overallScore - b.overallScore);

const server = http.createServer((req: http.IncomingMessage, res: http.ServerResponse) => {
  if (req.url === undefined) {
    // Handle the case when req.url is undefined
    res.writeHead(400, { 'Content-Type': 'text/plain' });
    res.end('Bad Request');
    return;
  }

  const filePath = path.join(__dirname, req.url === '/' ? 'index.html' : req.url);
  console.log('Requested file path:', filePath);

  if (req.url === '/data') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(employerScores));
  } else {
    fs.readFile(filePath, (err: NodeJS.ErrnoException | null, data: Buffer) => {
      if (err) {
        console.error('Error reading file:', err);
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 Not Found');
      } else {
        let contentType = 'text/html';
        if (filePath.endsWith('.css')) {
          contentType = 'text/css';
        } else if (filePath.endsWith('.js')) {
          contentType = 'text/javascript';
        }
        res.writeHead(200, { 'Content-Type': contentType });
        res.end(data);
      }
    });
  }
});

const PORT = 3001;
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});