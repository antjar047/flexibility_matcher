import { readEmployerFile } from "./readExcel";
import { ExcelAnswers, QuestionnaireAnswers } from "./interfaces";
import * as http from "http";
import * as fs from "fs";
import * as path from "path";

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
    categoryScores[key] = Math.abs(difference);

    if (employerAnswer > employeeAnswer) {
      overallScore += employerAnswer - employeeAnswer;
    }
  });

  return { overallScore, categoryScores };
}

const employers: ExcelAnswers[] = [];

const employeeExcel: ExcelAnswers[] = readEmployerFile(
  "./Employee_flexibility.xlsx"
);

const employerExcel: ExcelAnswers[] = readEmployerFile(
  "./Employer_flexibility.xlsx"
);

let employeeAnswers: QuestionnaireAnswers = {
  numberOfHoursFlexibility: 0,
  flexibilityOfHours: 0,
  flexibilityOfVenue: 0,
  amountOfTravel: 0,
  distanceOfTravel: 0,
  overnightStays: 0,
  holidayBookingAvailability: 0,
  dailyWorkPatternPossibilities: 0,
};
let employerAnswers: QuestionnaireAnswers = {
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
  return employerExcel.map((employer, index) => {
    const { overallScore, categoryScores } = compareAnswers(
      employer,
      employeeAnswers
    );

    return {
      employerId: index + 1,
      overallScore,
      categoryScores,
    };
  });
}

function calculateEmployeeScores() {
  return employeeExcel.map((employer, index) => {
    const { overallScore, categoryScores } = compareAnswers(
      employer,
      employerAnswers
    );

    return {
      employerId: index + 1,
      overallScore,
      categoryScores,
    };
  });
}

let employerScores = calculateEmployerScores();
let employeeScores = calculateEmployeeScores();

const server = http.createServer(
  (req: http.IncomingMessage, res: http.ServerResponse) => {
    if (req.url === undefined) {
      res.writeHead(400, { "Content-Type": "text/plain" });
      res.end("Bad Request");
      return;
    }

    if (req.method === "POST" && req.url === "/employer-flexibility") {
      let body = "";
      req.on("data", (chunk) => {
        body += chunk.toString();
      });
      req.on("end", () => {
        const employerFlexibility = JSON.parse(body);
        employers.push(employerFlexibility);
        employerScores = calculateEmployeeScores();

        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(employerScores));
      });
    } else if (req.method === "POST" && req.url === "/employee-preferences") {
      let body = "";
      req.on("data", (chunk) => {
        body += chunk.toString();
      });
      req.on("end", () => {
        const employeePreferences = JSON.parse(body);
        employeeAnswers = {
          ...employeeAnswers,
          ...employeePreferences,
        };
        employeeScores = calculateEmployerScores();
        employeeScores.sort((a, b) => a.overallScore - b.overallScore);
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(employeeScores));
      });
    } else {
      const filePath = path.join(
        __dirname,
        req.url === "/" ? "index.html" : req.url
      );
      console.log("Requested file path:", filePath);

      if (req.url === "/data") {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(employerScores));
      } else {
        fs.readFile(
          filePath,
          (err: NodeJS.ErrnoException | null, data: Buffer) => {
            if (err) {
              console.error("Error reading file:", err);
              res.writeHead(404, { "Content-Type": "text/plain" });
              res.end("404 Not Found");
            } else {
              let contentType = "text/html";
              if (filePath.endsWith(".css")) {
                contentType = "text/css";
              } else if (filePath.endsWith(".js")) {
                contentType = "text/javascript";
              }
              res.writeHead(200, { "Content-Type": contentType });
              res.end(data);
            }
          }
        );
      }
    }
  }
);

const PORT = 3001;
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
