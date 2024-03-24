import { readEmployerFile } from "./readExcel";
import { ExcelAnswers, QuestionnaireAnswers } from "./interfaces";
import * as http from "http";
import * as fs from "fs";
import * as path from "path";

function compareAnswers(
    employerAnswers: QuestionnaireAnswers,
    employeeAnswers: QuestionnaireAnswers
  ): { overallScore: number; categoryScores: { [key: string]: number }, scoreDescription: string } {
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
  
    let scoreDescription = 'Bad'; // Default to 'Bad'
    if (overallScore <= 5) {
      scoreDescription = 'Good';
    } else if (overallScore <= 15) {
      scoreDescription = 'Decent';
    }
  
    return { overallScore, categoryScores, scoreDescription };
  }

// Read the employer data from the Excel file
const employers: ExcelAnswers[] = readEmployerFile(
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

function calculateEmployerScores() {
  return employers.map((employer) => {
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

    const { overallScore, categoryScores } = compareAnswers(
      employerAnswers,
      employeeAnswers
    );

    return {
      employerId: employer.id,
      overallScore,
      categoryScores,
    };
  });
}

let employerScores = calculateEmployerScores();

const server = http.createServer(
  (req: http.IncomingMessage, res: http.ServerResponse) => {
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
        employeeAnswers = {
          ...employeeAnswers,
          ...employeePreferences,
        };
        employerScores = calculateEmployerScores();
        console.log("employerScores", employerScores);
        employerScores.sort((a, b) => a.overallScore - b.overallScore);
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(employerScores));
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
