import { CompleteFormInputs } from "./validation";


export const transformFormDataToDb = (formData: CompleteFormInputs) => {
    return {
        // Account Info
        account_type: formData.accountInfo.account_type,
        account_sub_type: formData.accountInfo.account_sub_type,

        // Contact Info
        email_address: formData.contact.email_address,
        phone_number: formData.contact.phone_number,
        street_address: JSON.stringify(formData.contact.street_address),
        city: formData.contact.city,
        state: formData.contact.state,
        postal_code: formData.contact.postal_code,

        // Identity Info
        given_name: formData.identity.given_name,
        family_name: formData.identity.family_name,
        middle_name: formData.identity.middle_name,
        date_of_birth: formData.identity.date_of_birth,

        // Tax Details
        tax_id: formData.taxDetails.tax_id,
        tax_id_type: formData.taxDetails.tax_id_type,
        country_of_citizenship: formData.taxDetails.country_of_citizenship,
        country_of_birth: formData.taxDetails.country_of_birth,
        country_of_tax_residence: formData.taxDetails.country_of_tax_residence,
        funding_source: JSON.stringify(formData.taxDetails.funding_source),

        // Disclosures
        employment_status: formData.disclosures.employment_status,
        employer_name: formData.disclosures.employer_name,
        is_control_person: formData.disclosures.is_control_person ? 1 : 0,
        is_politically_exposed: formData.disclosures.is_politically_exposed ? 1 : 0,
        immediate_family_exposed: formData.disclosures.immediate_family_exposed ? 1 : 0,

        // Document
        document_type: formData.document.document_type,
        document_number: formData.document.document_number,
        document_file_link: formData.document.content_data?.file_link,

        // Metadata
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
    } as const;
};