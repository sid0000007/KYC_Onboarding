import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const kycForm = sqliteTable('kyc_forms', {
  id: integer('id').primaryKey(),
  // Account Info
  account_type: text('account_type').notNull(),
  account_sub_type: text('account_sub_type'),
  
  // Contact Info
  email_address: text('email_address').notNull(),
  phone_number: text('phone_number').notNull(),
  street_address: text('street_address').notNull(), // Will store as JSON string
  city: text('city').notNull(),
  state: text('state'),
  postal_code: text('postal_code').notNull(),
  
  // Identity Info
  given_name: text('given_name').notNull(),
  family_name: text('family_name').notNull(),
  middle_name: text('middle_name'),
  date_of_birth: text('date_of_birth').notNull(),
  
  // Tax Details
  tax_id: text('tax_id'),
  tax_id_type: text('tax_id_type').notNull(),
  country_of_citizenship: text('country_of_citizenship'),
  country_of_birth: text('country_of_birth'),
  country_of_tax_residence: text('country_of_tax_residence').notNull(),
  funding_source: text('funding_source').notNull(), // Will store as JSON string
  
  // Disclosures
  employment_status: text('employment_status').notNull(),
  employer_name: text('employer_name'),
  is_control_person: integer('is_control_person').notNull(),
  is_politically_exposed: integer('is_politically_exposed').notNull(),
  immediate_family_exposed: integer('immediate_family_exposed').notNull(),
  
  // Document
  document_type: text('document_type').notNull(),
  document_number: text('document_number').notNull(),
  document_file_link: text('document_file_link'),
  
  // Metadata
  created_at: text('created_at').notNull(),
  updated_at: text('updated_at').notNull(),
});
