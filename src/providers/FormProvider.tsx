// "use client";
// import React, { createContext, useContext, useReducer, ReactNode } from "react";
// import {
//   FormData,
//   FormStep,
//   PersonalInfoInputs,
//   AddressInfoInputs,
//   DocumentInfoInputs,
// } from "@/lib/types";

// interface FormState {
//   data: {
//     personal: PersonalInfoInputs;
//     address: AddressInfoInputs;
//     document: DocumentInfoInputs;
//   };
//   currentStep: FormStep;
//   isCompleted: boolean;
// }

// interface FormContextType {
//   state: FormState;
//   updateFormData: (
//     step: FormStep,
//     data: Partial<PersonalInfoInputs | AddressInfoInputs | DocumentInfoInputs>
//   ) => void;
//   nextStep: () => void;
//   previousStep: () => void;
//   goToStep: (step: FormStep) => void;
// }

// const FormContext = createContext<FormContextType | undefined>(undefined);

// const initialState: FormState = {
//   data: {
//     personal: {
//       firstName: "",
//       lastName: "",
//       email: "",
//       dateOfBirth: "",
//       phoneNumber: "",
//     },
//     address: {
//       street: "",
//       city: "",
//       state: "",
//       zipCode: "",
//       country: "",
//     },
//     document: {
//       documentType: "passport",
//       documentNumber: "",
//       documentFile: null,
//     },
//   },
//   currentStep: "personal",
//   isCompleted: false,
// };

// type FormAction =
//   | {
//       type: "UPDATE_DATA";
//       payload: {
//         step: FormStep;
//         data: Partial<
//           PersonalInfoInputs | AddressInfoInputs | DocumentInfoInputs
//         >;
//       };
//     }
//   | { type: "NEXT_STEP" }
//   | { type: "PREVIOUS_STEP" }
//   | { type: "GO_TO_STEP"; payload: FormStep }
//   | { type: "COMPLETE_FORM" };

// const formReducer = (state: FormState, action: FormAction): FormState => {
//   switch (action.type) {
//     case "UPDATE_DATA":
//       return {
//         ...state,
//         data: {
//           ...state.data,
//           [action.payload.step]: {
//             ...state.data[action.payload.step as keyof FormState["data"]],
//             ...action.payload.data,
//           },
//         },
//       };
//     case "NEXT_STEP":
//       const steps: FormStep[] = ["personal", "address", "document", "summary"];
//       const currentIndex = steps.indexOf(state.currentStep);
//       return {
//         ...state,
//         currentStep: steps[currentIndex + 1] || state.currentStep,
//       };
//     case "PREVIOUS_STEP":
//       const stepsBack: FormStep[] = [
//         "personal",
//         "address",
//         "document",
//         "summary",
//       ];
//       const currentIndexBack = stepsBack.indexOf(state.currentStep);
//       return {
//         ...state,
//         currentStep: stepsBack[currentIndexBack - 1] || state.currentStep,
//       };
//     case "GO_TO_STEP":
//       return {
//         ...state,
//         currentStep: action.payload,
//       };
//     case "COMPLETE_FORM":
//       return {
//         ...state,
//         isCompleted: true,
//       };
//     default:
//       return state;
//   }
// };

// export const FormProvider = ({ children }: { children: ReactNode }) => {
//   const [state, dispatch] = useReducer(formReducer, initialState);

//   const updateFormData = (
//     step: FormStep,
//     data: Partial<PersonalInfoInputs | AddressInfoInputs | DocumentInfoInputs>
//   ) => {
//     dispatch({ type: "UPDATE_DATA", payload: { step, data } });
//   };

//   const nextStep = () => {
//     dispatch({ type: "NEXT_STEP" });
//   };

//   const previousStep = () => {
//     dispatch({ type: "PREVIOUS_STEP" });
//   };

//   const goToStep = (step: FormStep) => {
//     dispatch({ type: "GO_TO_STEP", payload: step });
//   };

//   return (
//     <FormContext.Provider
//       value={{ state, updateFormData, nextStep, previousStep, goToStep }}
//     >
//       {children}
//     </FormContext.Provider>
//   );
// };

// export const useForm = () => {
//   const context = useContext(FormContext);
//   if (!context) {
//     throw new Error("useForm must be used within a FormProvider");
//   }
//   return context;
// };

// src/providers/FormProvider.tsx
import React, { createContext, useContext, useReducer, ReactNode } from "react";
import {
  AccountTypeInputs,
  ContactInputs,
  IdentityInputs,
  TaxDetailsInputs,
  DisclosuresInputs,
  DocumentInputs,
} from "@/lib/validation";

export type FormStep =
  | "account"
  | "contact"
  | "identity"
  | "tax"
  | "disclosures"
  | "document"
  | "summary";

interface FormState {
  data: {
    accountInfo: Partial<AccountTypeInputs>;
    contact: Partial<ContactInputs>;
    identity: Partial<IdentityInputs>;
    taxDetails: Partial<TaxDetailsInputs>;
    disclosures: Partial<DisclosuresInputs>;
    document: Partial<DocumentInputs>;
  };
  currentStep: FormStep;
  isCompleted: boolean;
}

interface FormContextType {
  state: FormState;
  updateFormData: (
    step: keyof FormState["data"],
    data: Partial<
      | AccountTypeInputs
      | ContactInputs
      | IdentityInputs
      | TaxDetailsInputs
      | DisclosuresInputs
      | DocumentInputs
    >
  ) => void;
  nextStep: () => void;
  previousStep: () => void;
  goToStep: (step: FormStep) => void;
}

const FormContext = createContext<FormContextType | undefined>(undefined);

const initialState: FormState = {
  data: {
    accountInfo: {},
    contact: {},
    identity: {},
    taxDetails: {},
    disclosures: {},
    document: {},
  },
  currentStep: "account",
  isCompleted: false,
};

type FormAction =
  | {
      type: "UPDATE_DATA";
      payload: {
        step: keyof FormState["data"];
        data: Partial<
          | AccountTypeInputs
          | ContactInputs
          | IdentityInputs
          | TaxDetailsInputs
          | DisclosuresInputs
          | DocumentInputs
        >;
      };
    }
  | { type: "NEXT_STEP" }
  | { type: "PREVIOUS_STEP" }
  | { type: "GO_TO_STEP"; payload: FormStep }
  | { type: "COMPLETE_FORM" };

const formReducer = (state: FormState, action: FormAction): FormState => {
  switch (action.type) {
    case "UPDATE_DATA":
      return {
        ...state,
        data: {
          ...state.data,
          [action.payload.step]: {
            ...state.data[action.payload.step],
            ...action.payload.data,
          },
        },
      };
    case "NEXT_STEP":
      const steps: FormStep[] = [
        "account",
        "contact",
        "identity",
        "tax",
        "disclosures",
        "document",
        "summary",
      ];
      const currentIndex = steps.indexOf(state.currentStep);
      return {
        ...state,
        currentStep: steps[currentIndex + 1] || state.currentStep,
      };
    case "PREVIOUS_STEP":
      const stepsBack: FormStep[] = [
        "account",
        "contact",
        "identity",
        "tax",
        "disclosures",
        "document",
        "summary",
      ];
      const currentIndexBack = stepsBack.indexOf(state.currentStep);
      return {
        ...state,
        currentStep: stepsBack[currentIndexBack - 1] || state.currentStep,
      };
    case "GO_TO_STEP":
      return {
        ...state,
        currentStep: action.payload,
      };
    case "COMPLETE_FORM":
      return {
        ...state,
        isCompleted: true,
      };
    default:
      return state;
  }
};

export const FormProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(formReducer, initialState);

  const updateFormData = (
    step: keyof FormState["data"],
    data: Partial<
      | AccountTypeInputs
      | ContactInputs
      | IdentityInputs
      | TaxDetailsInputs
      | DisclosuresInputs
      | DocumentInputs
    >
  ) => {
    dispatch({ type: "UPDATE_DATA", payload: { step, data } });
  };

  const nextStep = () => {
    dispatch({ type: "NEXT_STEP" });
  };

  const previousStep = () => {
    dispatch({ type: "PREVIOUS_STEP" });
  };

  const goToStep = (step: FormStep) => {
    dispatch({ type: "GO_TO_STEP", payload: step });
  };

  return (
    <FormContext.Provider
      value={{ state, updateFormData, nextStep, previousStep, goToStep }}
    >
      {children}
    </FormContext.Provider>
  );
};

export const useForm = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error("useForm must be used within a FormProvider");
  }
  return context;
};
