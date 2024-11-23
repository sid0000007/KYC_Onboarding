// // src/components/form/Summary.tsx
// import React from "react";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { useForm as useFormContext } from "@/providers/FormProvider";
// import { toast } from "react-hot-toast";

// export const SummaryStep = () => {
//   const { state, previousStep } = useFormContext();
//   const { data } = state;

//   const handleSubmit = () => {
//     // Simulate form submission
//     toast.success("KYC Form Submitted Successfully!");
//     // Here you would typically send the data to your backend
//     console.log("Submitted KYC Data:", data);
//   };

//   return (
//     <div className="space-y-6">
//       <Card>
//         <CardHeader>
//           <CardTitle>Review Your Information</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <div className="grid md:grid-cols-2 gap-4">
//             <div>
//               <h3 className="font-semibold mb-2">Account type</h3>
//               <p>First Name: {data.accountInfo.account_type}</p>
//               <p>Last Name: {data.accountInfo.account_sub_type}</p>
//             </div>
//             <div>
//               <h3 className="font-semibold mb-2">Address Information</h3>
//               <p>Street: {data.address.street}</p>
//               <p>City: {data.address.city}</p>
//               <p>State: {data.address.state}</p>
//               <p>ZIP Code: {data.address.zipCode}</p>
//               <p>Country: {data.address.country}</p>
//             </div>
//             <div>
//               <h3 className="font-semibold mb-2">Document Information</h3>
//               <p>Document Type: {data.document.documentType}</p>
//               <p>Document Number: {data.document.documentNumber}</p>
//               {data.document.documentFile && <p>Document File: Uploaded ✓</p>}
//             </div>
//           </div>
//         </CardContent>
//       </Card>

//       <div className="flex space-x-4">
//         <Button
//           variant="outline"
//           onClick={() => previousStep()}
//           className="w-1/2"
//         >
//           Back
//         </Button>
//         <Button onClick={handleSubmit} className="w-1/2">
//           Submit KYC
//         </Button>
//       </div>
//     </div>
//   );
// };

// src/components/form/Summary.tsx
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useForm as useFormContext } from "@/providers/FormProvider";
import { toast } from "react-hot-toast";

export const SummaryStep = () => {
  const { state, previousStep } = useFormContext();
  const { data } = state;

  const handleSubmit = () => {
    // Simulate form submission
    toast.success("KYC Form Submitted Successfully!");
    // Here you would typically send the data to your backend
    console.log("Submitted KYC Data:", data);
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
              <p>
                Funding Source(s): {data.taxDetails.funding_source}
              </p>
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
              {data.document.content_data?.file && (
                <p>Document File: Uploaded ✓</p>
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
        <Button onClick={handleSubmit} className="w-1/2">
          Submit KYC
        </Button>
      </div>
    </div>
  );
};
