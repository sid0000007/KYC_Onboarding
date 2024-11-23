import { cn } from "@/lib/utils";

interface Step {
  id: string;
  title: string;
  description: string;
  isCompleted: boolean;
  isActive: boolean;
}

interface VerticalStepperProps {
  steps: Step[];
}

export function VerticalStepper({ steps }: VerticalStepperProps) {
  return (
    <div className="space-y-4 pr-8">
      {steps.map((step, index) => (
        <div key={step.id} className="relative flex gap-4">
          {index !== steps.length - 1 && (
            <div
              className={cn(
                "absolute left-[15px] top-[30px] h-full w-[2px]",
                step.isCompleted ? "bg-primary" : "bg-muted"
              )}
            />
          )}
          <div
            className={cn(
              "relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 text-sm font-semibold",
              step.isActive
                ? "border-primary bg-primary text-primary-foreground"
                : step.isCompleted
                ? "border-primary bg-primary text-primary-foreground"
                : "border-muted bg-muted text-muted-foreground"
            )}
          >
            {index + 1}
          </div>
          <div className="space-y-1 pt-1">
            <div className="font-medium leading-none">{step.title}</div>
            <div className="text-sm text-muted-foreground">
              {step.description}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
