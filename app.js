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
const readExcel_1 = require("./readExcel");
const http = __importStar(require("http")); // Import the 'http' module
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
function compareAnswers(employerAnswers, employeeAnswers) {
    const answerKeys = Object.keys(employerAnswers);
    const categoryScores = {};
    let overallScore = 0;
    answerKeys.forEach((key) => {
        const employerAnswer = employerAnswers[key];
        const employeeAnswer = employeeAnswers[key];
        const difference = employerAnswer - employeeAnswer;
        categoryScores[key] = difference;
        overallScore += Math.abs(difference);
    });
    return { overallScore, categoryScores };
}
// Read the employer data from the Excel file
const employers = (0, readExcel_1.readEmployerFile)("./Employer_flexibility.xlsx");
// Read the employee data from the Excel file
const employees = (0, readExcel_1.readEmployeeFile)("./Employee_flexibility.xlsx");
// Compare each employee with each employer
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
    const { overallScore, categoryScores } = compareAnswers(employerAnswers, employeeAnswers);
    return {
        employerId: employer.id,
        overallScore,
        categoryScores,
    };
});
// Sort the employerScores array based on the overall scores in ascending order
employerScores.sort((a, b) => a.overallScore - b.overallScore);
const server = http.createServer((req, res) => {
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
    }
    else {
        fs.readFile(filePath, (err, data) => {
            if (err) {
                console.error('Error reading file:', err);
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                res.end('404 Not Found');
            }
            else {
                let contentType = 'text/html';
                if (filePath.endsWith('.css')) {
                    contentType = 'text/css';
                }
                else if (filePath.endsWith('.js')) {
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
