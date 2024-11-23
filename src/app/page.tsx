"use client";
import React from "react";
import { FormProvider } from "@/providers/FormProvider";
import { FormWrapper } from "@/components/form/FormWrapper";

const KYCForm = () => {
  return (
    <main className=" bg-white ">
      <FormProvider>
        <FormWrapper />
      </FormProvider>
    </main>
  );
};

export default KYCForm;
