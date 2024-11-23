// // src/lib/validation.ts
// import { z } from 'zod';

// const MAX_FILE_SIZE = 5000000; // 5MB
// const ACCEPTED_FILE_TYPES = ['image/jpeg', 'image/png', 'application/pdf'];

// export const personalInfoSchema = z.object({
//     firstName: z.string().min(2, 'First name must be at least 2 characters'),
//     lastName: z.string().min(2, 'Last name must be at least 2 characters'),
//     email: z.string().email('Invalid email address'),
//     dateOfBirth: z.string().min(1, 'Date of birth is required'),
//     phoneNumber: z.string().min(10, 'Phone number must be at least 10 digits'),
// });

// export const addressInfoSchema = z.object({
//     street: z.string().min(5, 'Street address must be at least 5 characters'),
//     city: z.string().min(2, 'City must be at least 2 characters'),
//     state: z.string().min(2, 'State must be at least 2 characters'),
//     zipCode: z.string().min(5, 'ZIP code must be at least 5 characters'),
//     country: z.string().min(2, 'Country must be at least 2 characters'),
// });

// export const documentInfoSchema = z.object({
//     documentType: z.enum(['passport', 'drivingLicense', 'nationalId']),
//     documentNumber: z.string().min(5, 'Document number must be at least 5 characters'),
//     documentFile: z
//         .any()
//         .refine((file) => !file || file?.size <= MAX_FILE_SIZE, 'Max file size is 5MB')
//         .refine(
//             (file) => !file || ACCEPTED_FILE_TYPES.includes(file?.type),
//             'Only .jpg, .png, .pdf files are accepted'
//         )
//         .optional(),
// });

// export type PersonalInfoInputs = z.infer<typeof personalInfoSchema>;
// export type AddressInfoInputs = z.infer<typeof addressInfoSchema>;
// export type DocumentInfoInputs = z.infer<typeof documentInfoSchema>;


// src/lib/validation.ts
import { z } from 'zod';

// Form 1 - Account Type Schema
export const accountTypeSchema = z
    .object({
        account_type: z.enum(['trading', 'custodial', 'donor_advised', 'ira'], {
            required_error: "Account type is required"
        }),
        account_sub_type: z.enum(['traditional', 'roth']).optional(),
    })
    .refine(
        (data) => {
            if (data.account_type === 'ira') {
                return data.account_sub_type !== undefined;
            }
            return true;
        },
        {
            message: "IRA accounts must specify a sub-type",
            path: ["account_sub_type"], // This will make the error show up on the account_sub_type field
        }
    );
// Form 2 - Contact Schema
export const contactSchema = z.object({
    email_address: z.string().email("Invalid email address"),
    phone_number: z.string().regex(/^\+\d{11,}$/, "Phone number must include country code, format: +15555555555"),
    street_address: z.array(z.string()).min(1, "At least one street address line is required"),
    city: z.string().min(1, "City is required"),
    state: z.string().optional(),
    postal_code: z.string().min(1, "Postal code is required")
});

// Form 3 - Identity Schema
export const identitySchema = z.object({
    given_name: z.string().min(1, "Given name is required"),
    family_name: z.string().min(1, "Family name is required"),
    middle_name: z.string().optional(),
    date_of_birth: z.string().min(1, "Date of birth is required")
});

// Form 4 - Tax Details Schema
const FUNDING_SOURCES = [
    'employment_income',
    'investments',
    'inheritance',
    'business_income',
    'savings',
    'family'
] as const;

export const taxDetailsSchema = z.object({
    tax_id: z.string().optional(),
    tax_id_type: z.string().min(1, "Tax ID type is required"),
    country_of_citizenship: z.string().optional(),
    country_of_birth: z.string().optional(),
    country_of_tax_residence: z.string().min(1, "Country of tax residence is required"),
    funding_source: z.array(z.enum(FUNDING_SOURCES)).min(1, "At least one funding source is required")
});

// Form 5 - Disclosures Schema
export const disclosuresSchema = z.object({
    employment_status: z.enum(['employed', 'unemployed', 'retired', 'student']),
    employer_name: z.string().optional(),
    is_control_person: z.boolean(),
    is_politically_exposed: z.boolean(),
    immediate_family_exposed: z.boolean(),
    context: z.array(z.object({})).optional().nullable()
});

// Form 6 - Document Schema
export const documentSchema = z.object({
    document_type: z.enum(['passport', 'driving_license', 'citizenship_card']),
    document_number: z.string().min(1, "Document number is required"),
    content_data: z.object({
        file: z.any()
            .refine((file) => file?.size <= 5000000, "Max file size is 5MB")
            .refine(
                (file) => ['application/pdf', 'image/png', 'image/jpeg'].includes(file?.type),
                "Only .pdf, .png, .jpeg formats are accepted"
            )
    }).optional()
});

// Combined schema for the entire form
export const completeFormSchema = z.object({
    accountInfo: accountTypeSchema,
    contact: contactSchema,
    identity: identitySchema,
    taxDetails: taxDetailsSchema,
    disclosures: disclosuresSchema,
    document: documentSchema
});

export type AccountTypeInputs = z.infer<typeof accountTypeSchema>;
export type ContactInputs = z.infer<typeof contactSchema>;
export type IdentityInputs = z.infer<typeof identitySchema>;
export type TaxDetailsInputs = z.infer<typeof taxDetailsSchema>;
export type DisclosuresInputs = z.infer<typeof disclosuresSchema>;
export type DocumentInputs = z.infer<typeof documentSchema>;
export type CompleteFormInputs = z.infer<typeof completeFormSchema>;