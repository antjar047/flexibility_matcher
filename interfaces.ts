// Define the interfaces for Employer and Employee
export interface Employer {
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

export interface Employee {
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
