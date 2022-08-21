export interface PartnerCountryData {
  country: string;
  organization: string;
  reimbursment: string;
}

export interface ICreateProjectForm {
  title: string;
  type: string;
  startDate: string;
  endDate: string;
  projectCountry: string;
  city: string;
  organizationName: string;
  description?: string;
  infopackLink: string;
  signupFormLink?: string;
  headerImageUrl: string;

  numberOfParticipants: number;
  participantMinAge: number;
  participantMaxAge: number;
  leaderMinAge: number;
  leaderMaxAge?: number;

  contactEmail?: string;
  travelTips?: string;
}

// separate into data and funcitons, i think functions wont even be neded
// mby for editing but idk, thats v10
export interface IPartnerCountries {
  partnerCountries: PartnerCountryData[];

  addPartnerCountry: () => void;
  removePartnerCountry: (index: number) => void;
  updatePartnerCountryName: (index: number, country: string) => void;
  updatePartnerCountryReimbursment: (
    index: number,
    reimbursment: string
  ) => void;
  updatePartnerCountryOrganization: (
    index: number,
    organization: string
  ) => void;
}
