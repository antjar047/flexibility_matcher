import * as XLSX from "xlsx";

// Define the Employer type
interface Employer {
    id: number;
    startTime: string;
    completionTime: string;
    email: string;
    name: string;
    flexibleWorkingPolicies: string;
    numberOfHoursFlexibility: number;
    flexibilityOfHours: number;
    flexibilityOfVenue: number;
    amountOfTravel: number;
    distanceOfTravel: number;
    overnightStays: number;
    holidayBookingAvailability: number;
    dailyWorkPatternPossibilities: number;
}

// Exporting the readExcelFile function
export function readExcelFile(filePath: string): Employer[] {
    // Read the Excel file
    const workbook = XLSX.readFile(filePath);

    // Get the first worksheet
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];

    // Convert the worksheet to a JSON object
    const data: any[][] = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

    // Process the data and convert to Employer objects
    const employers: Employer[] = [];
    for (let rowIndex = 1; rowIndex < data.length; rowIndex++) {
        const row = data[rowIndex];
        const employer: Employer = {
            id: row[0],
            startTime: row[1],
            completionTime: row[2],
            email: row[3],
            name: row[4],
            flexibleWorkingPolicies: row[5],
            numberOfHoursFlexibility: row[6],
            flexibilityOfHours: row[7],
            flexibilityOfVenue: row[8],
            amountOfTravel: row[9],
            distanceOfTravel: row[10],
            overnightStays: row[11],
            holidayBookingAvailability: row[12],
            dailyWorkPatternPossibilities: row[13]
        };
        employers.push(employer);
    }
    return employers;
}
