import React from "react";
import { useForm as useHookForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useForm as useFormContext } from "@/providers/FormProvider";
import { disclosuresSchema, DisclosuresInputs } from "@/lib/validation";
import { EMPLOYMENT_STATUS } from "@/lib/constants";

export const DisclosuresStep = () => {
  const { state, updateFormData, nextStep, previousStep } = useFormContext();

  const form = useHookForm<DisclosuresInputs>({
    resolver: zodResolver(disclosuresSchema),
    defaultValues: state.data.disclosures,
  });

  const onSubmit = (data: DisclosuresInputs) => {
    updateFormData("disclosures", data);
    nextStep();
  };

  const employmentStatus = form.watch("employment_status");

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="employment_status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Employment Status</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select employment status" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {EMPLOYMENT_STATUS.map((status) => (
                    <SelectItem key={status.value} value={status.value}>
                      {status.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {employmentStatus === "employed" && (
          <FormField
            control={form.control}
            name="employer_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Employer Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter employer name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <FormField
          control={form.control}
          name="is_control_person"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel>Control Person</FormLabel>
                <div className="text-sm text-muted-foreground">
                  Are you affiliated with Are you affiliated with any exchanges
                  or FINRA?
                </div>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="is_politically_exposed"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel>Politically Exposed Person</FormLabel>
                <div className="text-sm text-muted-foreground">
                  Are you a politically exposed person?
                </div>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="immediate_family_exposed"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel>Family Member Exposure</FormLabel>
                <div className="text-sm text-muted-foreground">
                  Is any immediate family member politically exposed or in a
                  control position?
                </div>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex space-x-4">
          <Button
            type="button"
            variant="outline"
            onClick={previousStep}
            className="w-1/2"
          >
            Back
          </Button>
          <Button type="submit" className="w-1/2">
            Next
          </Button>
        </div>
      </form>
    </Form>
  );
};
