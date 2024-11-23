// src/lib/types.ts
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

//export type FormStep = 'personal' | 'address' | 'document' | 'summary';

// src/lib/validation.ts
import { z } from 'zod';

const MAX_FILE_SIZE = 5000000; // 5MB
const ACCEPTED_FILE_TYPES = ['image/jpeg', 'image/png', 'application/pdf'];

export const personalInfoSchema = z.object({
    firstName: z.string().min(2, 'First name must be at least 2 characters'),
    lastName: z.string().min(2, 'Last name must be at least 2 characters'),
    email: z.string().email('Invalid email address'),
    dateOfBirth: z.string().min(1, 'Date of birth is required'),
    phoneNumber: z.string().min(10, 'Phone number must be at least 10 digits'),
});

export const addressInfoSchema = z.object({
    street: z.string().min(5, 'Street address must be at least 5 characters'),
    city: z.string().min(2, 'City must be at least 2 characters'),
    state: z.string().min(2, 'State must be at least 2 characters'),
    zipCode: z.string().min(5, 'ZIP code must be at least 5 characters'),
    country: z.string().min(2, 'Country must be at least 2 characters'),
});

export const documentInfoSchema = z.object({
    documentType: z.enum(['passport', 'drivingLicense', 'nationalId']),
    documentNumber: z.string().min(5, 'Document number must be at least 5 characters'),
    documentFile: z
        .any()
        .refine((file) => file?.size <= MAX_FILE_SIZE, 'Max file size is 5MB')
        .refine(
            (file) => ACCEPTED_FILE_TYPES.includes(file?.type),
            'Only .jpg, .png, .pdf files are accepted'
        )
        .optional(),
});

export type PersonalInfoInputs = z.infer<typeof personalInfoSchema>;
export type AddressInfoInputs = z.infer<typeof addressInfoSchema>;
export type DocumentInfoInputs = z.infer<typeof documentInfoSchema>;

// src/lib/types.ts
export type FormStep = 
  | 'account' 
  | 'contact' 
  | 'identity' 
  | 'tax' 
  | 'disclosures' 
  | 'document' 
  | 'summary';