import { motion } from "framer-motion";
import { Check, ArrowDown } from "lucide-react";

interface ProgressStepProps {
  step: number;
  currentStep: number;
  label: string;
}

export function ProgressStep({ step, currentStep, label }: ProgressStepProps) {
  const isCompleted = step < currentStep;
  const isActive = step === currentStep;

  return (
    <div className="flex items-center">
      <motion.div
        className={`flex items-center justify-center w-8 h-8 rounded-full border-2 ${
          isCompleted
            ? "bg-primary border-primary"
            : isActive
            ? "border-primary"
            : "border-gray-300"
        }`}
        initial={false}
        animate={{
          backgroundColor: isCompleted ? "var(--primary)" : "#ffffff",
          borderColor: isCompleted || isActive ? "var(--primary)" : "#d1d5db",
        }}
      >
        {isCompleted ? (
          <Check className="w-5 h-5 text-black" />
        ) : (
          <span
            className={`text-sm ${isActive ? "text-primary" : "text-gray-500"}`}
          >
            {step}
          </span>
        )}
      </motion.div>
      <div className="ml-2">
        <span
          className={`text-sm  ${
            isActive ? "text-primary font-medium" : "text-gray-500"
          }`}
        >
          {label}
        </span>
      </div>
    </div>
  );
}
