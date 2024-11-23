export interface FormData {
    // Personal Information
    firstName: string;
    lastName: string;
    email: string;
    dateOfBirth: string;
    phoneNumber: string;

    // Address Information
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;

    // Document Information
    documentType: 'passport' | 'drivingLicense' | 'nationalId';
    documentNumber: string;
    documentFile?: File;
}


export type FormStep = 
  | 'account' 
  | 'contact' 
  | 'identity' 
  | 'tax' 
  | 'disclosures' 
  | 'document' 
  | 'summary';