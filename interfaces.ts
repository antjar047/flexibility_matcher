export interface QuestionnaireAnswers {
  numberOfHoursFlexibility: number;
  flexibilityOfHours: number;
  flexibilityOfVenue: number;
  amountOfTravel: number;
  distanceOfTravel: number;
  overnightStays: number;
  holidayBookingAvailability: number;
  dailyWorkPatternPossibilities: number;
}

export interface ExcelAnswers extends QuestionnaireAnswers {
  id: number;
  startTime: string;
  completionTime: string;
  email: string;
  name: string;
  flexibleWorkingPolicies: string;
}
