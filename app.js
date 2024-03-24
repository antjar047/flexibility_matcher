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
const http = __importStar(require("http"));
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
        categoryScores[key] = Math.abs(difference);
        if (employerAnswer > employeeAnswer) {
            overallScore += employerAnswer - employeeAnswer;
        }
    });
    return { overallScore, categoryScores };
}
// Read the employer data from the Excel file
const employers = (0, readExcel_1.readEmployerFile)("./Employer_flexibility.xlsx");
let employeeAnswers = {
    numberOfHoursFlexibility: 0,
    flexibilityOfHours: 0,
    flexibilityOfVenue: 0,
    amountOfTravel: 0,
    distanceOfTravel: 0,
    overnightStays: 0,
    holidayBookingAvailability: 0,
    dailyWorkPatternPossibilities: 0,
};
function calculateEmployerScores() {
    return employers.map((employer) => {
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
}
let employerScores = calculateEmployerScores();
const server = http.createServer((req, res) => {
    if (req.url === undefined) {
        res.writeHead(400, { "Content-Type": "text/plain" });
        res.end("Bad Request");
        return;
    }
    if (req.method === "POST" && req.url === "/employee-preferences") {
        let body = "";
        req.on("data", (chunk) => {
            body += chunk.toString();
        });
        req.on("end", () => {
            const employeePreferences = JSON.parse(body);
            employeeAnswers = Object.assign(Object.assign({}, employeeAnswers), employeePreferences);
            employerScores = calculateEmployerScores();
            console.log("employerScores", employerScores);
            employerScores.sort((a, b) => a.overallScore - b.overallScore);
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify(employerScores));
        });
    }
    else {
        const filePath = path.join(__dirname, req.url === "/" ? "index.html" : req.url);
        console.log("Requested file path:", filePath);
        if (req.url === "/data") {
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify(employerScores));
        }
        else {
            fs.readFile(filePath, (err, data) => {
                if (err) {
                    console.error("Error reading file:", err);
                    res.writeHead(404, { "Content-Type": "text/plain" });
                    res.end("404 Not Found");
                }
                else {
                    let contentType = "text/html";
                    if (filePath.endsWith(".css")) {
                        contentType = "text/css";
                    }
                    else if (filePath.endsWith(".js")) {
                        contentType = "text/javascript";
                    }
                    res.writeHead(200, { "Content-Type": contentType });
                    res.end(data);
                }
            });
        }
    }
});
const PORT = 3001;
server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});
