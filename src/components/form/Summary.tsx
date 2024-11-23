
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useForm as useFormContext } from "@/providers/FormProvider";
import { toast } from "react-hot-toast";
import { redirect } from "next/navigation";
import { submitKYCForm } from "@/services/kycServices";
import { CompleteFormInputs, completeFormSchema } from "@/lib/validation";

export const SummaryStep = () => {
  const { state, previousStep } = useFormContext();
  const { data } = state;
  const [submission, setsubmission] = useState(false);
  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setsubmission(true);
    try {
      if (
        !data.accountInfo?.account_type ||
        !data.contact?.email_address ||
        !data.contact?.phone_number ||
        !data.contact?.street_address ||
        !data.contact?.city ||
        !data.contact?.postal_code ||
        !data.identity?.given_name ||
        !data.identity?.family_name ||
        !data.identity?.date_of_birth ||
        !data.taxDetails?.tax_id_type ||
        !data.taxDetails?.country_of_tax_residence ||
        !data.taxDetails?.funding_source ||
        !data.disclosures?.employment_status ||
        !data.document?.document_type ||
        !data.document?.document_number
      ) {
        toast.error("Please fill in all required fields");
        return;
      }

      const completeData: CompleteFormInputs = {
        accountInfo: {
          account_type: data.accountInfo.account_type,
          account_sub_type: data.accountInfo.account_sub_type,
        },
        contact: {
          email_address: data.contact.email_address,
          phone_number: data.contact.phone_number,
          street_address: Array.isArray(data.contact.street_address)
            ? data.contact.street_address
            : [data.contact.street_address],
          city: data.contact.city,
          postal_code: data.contact.postal_code,
          state: data.contact.state,
        },
        identity: {
          given_name: data.identity.given_name,
          family_name: data.identity.family_name,
          middle_name: data.identity.middle_name,
          date_of_birth: data.identity.date_of_birth,
        },
        taxDetails: {
          tax_id: data.taxDetails.tax_id,
          tax_id_type: data.taxDetails.tax_id_type,
          country_of_citizenship: data.taxDetails.country_of_citizenship,
          country_of_birth: data.taxDetails.country_of_birth,
          country_of_tax_residence: data.taxDetails.country_of_tax_residence,
          funding_source: Array.isArray(data.taxDetails.funding_source)
            ? data.taxDetails.funding_source
            : [data.taxDetails.funding_source],
        },
        disclosures: {
          employment_status: data.disclosures.employment_status,
          employer_name: data.disclosures.employer_name,
          is_control_person: Boolean(data.disclosures.is_control_person),
          is_politically_exposed: Boolean(
            data.disclosures.is_politically_exposed
          ),
          immediate_family_exposed: Boolean(
            data.disclosures.immediate_family_exposed
          ),
        },
        document: {
          document_type: data.document.document_type,
          document_number: data.document.document_number,
          content_data: data.document.content_data,
        },
      };


      const validatedData = completeFormSchema.parse(completeData);

      await submitKYCForm(validatedData);
      console.log("KYC Form Submitted:", validatedData);
     
      redirect(`/Thankyou`);
    } catch (error) {
      toast.error("Failed to submit KYC form");
      console.error("Error submitting form:", error);
    }
    redirect(`/Thankyou`);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Review Your Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold mb-2">Account Information</h3>
              <p>Account Type: {data.accountInfo.account_type}</p>
              <p>
                Account Sub-Type: {data.accountInfo.account_sub_type || "N/A"}
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Contact Information</h3>
              <p>Email Address: {data.contact.email_address}</p>
              <p>Phone Number: {data.contact.phone_number}</p>
              {data.contact.street_address?.map((line, index) => (
                <p key={index}>
                  Street Address {index + 1}: {line}
                </p>
              ))}
              <p>City: {data.contact.city}</p>
              <p>State: {data.contact.state || "N/A"}</p>
              <p>Postal Code: {data.contact.postal_code}</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Identity Information</h3>
              <p>Given Name: {data.identity.given_name}</p>
              <p>Family Name: {data.identity.family_name}</p>
              <p>Middle Name: {data.identity.middle_name || "N/A"}</p>
              <p>Date of Birth: {data.identity.date_of_birth}</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Tax Details</h3>
              <p>Tax ID: {data.taxDetails.tax_id || "N/A"}</p>
              <p>Tax ID Type: {data.taxDetails.tax_id_type}</p>
              <p>
                Country of Citizenship:{" "}
                {data.taxDetails.country_of_citizenship || "N/A"}
              </p>
              <p>
                Country of Birth: {data.taxDetails.country_of_birth || "N/A"}
              </p>
              <p>
                Country of Tax Residence:{" "}
                {data.taxDetails.country_of_tax_residence}
              </p>
              <p>Funding Source(s): {data.taxDetails.funding_source}</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Disclosures</h3>
              <p>Employment Status: {data.disclosures.employment_status}</p>
              <p>Employer Name: {data.disclosures.employer_name || "N/A"}</p>
              <p>
                Is Control Person:{" "}
                {data.disclosures.is_control_person ? "Yes" : "No"}
              </p>
              <p>
                Is Politically Exposed:{" "}
                {data.disclosures.is_politically_exposed ? "Yes" : "No"}
              </p>
              <p>
                Immediate Family Exposed:{" "}
                {data.disclosures.immediate_family_exposed ? "Yes" : "No"}
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Document Information</h3>
              <p>Document Type: {data.document.document_type}</p>
              <p>Document Number: {data.document.document_number}</p>
              {data.document.content_data?.file_link && (
                <p>
                  Document File:
                  <a
                    href={data.document.content_data.file_link}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-500"
                  >
                   {` `} Open Document
                  </a>
                </p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex space-x-4">
        <Button
          variant="outline"
          onClick={() => previousStep()}
          className="w-1/2"
        >
          Back
        </Button>
        <Button onClick={handleSubmit} className="w-1/2" disabled={submission}>
          Final Submit
        </Button>
      </div>
    </div>
  );
};
