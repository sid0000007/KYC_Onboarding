import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "@/providers/FormProvider";
import { DocumentUploadStep } from "./DocumentUpload";
import { SummaryStep } from "./Summary";
import { ProgressBar } from "../custom/progressbar";
import { ProgressStep } from "../custom/progressStep";
import { AccountTypeStep } from "./AccountTypeStep";
import { ContactStep } from "./ContactStep";
import { IdentityStep } from "./IdentityStep";
import { TaxDetailsStep } from "./TaxDetailsStep";
import { DisclosuresStep } from "./DiscloserStep";

export const FormWrapper = () => {
  const { state } = useForm();

  const steps = [
    {
      id: "account",
      label: "Account Type",
      isCompleted:
        state.currentStep !== "account" && state.currentStep !== "contact",
      isActive: state.currentStep === "account",
    },
    {
      id: "Contact",
      label: "Contact Info",
      isCompleted:
        state.currentStep !== "account" && state.currentStep !== "contact",
      isActive: state.currentStep === "contact",
    },
    {
      id: "identity",
      label: "Identity",
      isCompleted:
        state.currentStep !== "identity" && state.currentStep !== "summary",
      isActive: state.currentStep === "identity",
    },
    {
      id: "tax",
      label: "Tax Details",
      isCompleted:
        state.currentStep !== "tax" && state.currentStep !== "summary",
      isActive: state.currentStep === "tax",
    },
    {
      id: "disclosures",
      label: "Disclosures",
      isCompleted:
        state.currentStep !== "disclosures" && state.currentStep !== "summary",
      isActive: state.currentStep === "disclosures",
    },
    {
      id: "document",
      label: "Document Upload",
      isCompleted:
        state.currentStep !== "document" && state.currentStep !== "summary",
      isActive: state.currentStep === "document",
    },
    {
      id: "summary",
      label: "Review",
      isCompleted: false,
      isActive: state.currentStep === "summary",
    },
  ];

  const getCurrentStepNumber = () => {
    const stepMap = {
      account: 1,
      contact: 2,
      identity: 3,
      tax: 4,
      disclosures: 5,
      document: 6,
      summary: 7,
    };
    return stepMap[state.currentStep] || 1;
  };

  const progress = ((getCurrentStepNumber() - 1) / (steps.length - 1)) * 100;

  const renderStep = () => {
    switch (state.currentStep) {
      case "account":
        return <AccountTypeStep />;
      case "contact":
        return <ContactStep />;
      case "identity":
        return <IdentityStep />;
      case "tax":
        return <TaxDetailsStep />;
      case "disclosures":
        return <DisclosuresStep />;
      case "document":
        return <DocumentUploadStep />;
      case "summary":
        return <SummaryStep />;
      default:
        return null;
    }
  };

  return (
    <div className="w-full md:min-h-screen bg-white rounded-lg md:shadow-lg">
      <div className="grid grid-cols-1 md:grid-cols-[400px_1fr] gap-8 ">
        <div className="space-y-8 border-r-2 px-[3rem] md:h-screen flex flex-col justify-start pt-[5rem] items-start">
          <ProgressBar progress={progress} />
          <div className="space-y-4 hidden md:block">
            {steps.map((step, index) => (
              <ProgressStep
                key={step.id}
                step={index + 1}
                currentStep={getCurrentStepNumber()}
                label={step.label}
                
              />
            ))}
          </div>
        </div>
        <div className="my-auto p-4 md:p-8 mx-[4rem]">
          <AnimatePresence mode="wait">
            <motion.div
              key={state.currentStep}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              {renderStep()}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
