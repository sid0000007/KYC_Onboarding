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
import { useForm as useFormContext } from "@/providers/FormProvider";
import { identitySchema, IdentityInputs } from "@/lib/validation";

export const IdentityStep = () => {
  const { state, updateFormData, nextStep, previousStep } = useFormContext();

  const form = useHookForm<IdentityInputs>({
    resolver: zodResolver(identitySchema),
    defaultValues: 
            {
            given_name: state.data.identity?.given_name || "",
            family_name: state.data.identity?.family_name || "",
            middle_name: state.data.identity?.middle_name || "",
            date_of_birth: state.data.identity?.date_of_birth || "",
        },
  });

  const onSubmit = (data: IdentityInputs) => {
    updateFormData("identity", data);
    nextStep();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="given_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Given Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter given name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="family_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Family Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter family name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="middle_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Middle Name (Optional)</FormLabel>
              <FormControl>
                <Input placeholder="Enter middle name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="date_of_birth"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Date of Birth</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
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
