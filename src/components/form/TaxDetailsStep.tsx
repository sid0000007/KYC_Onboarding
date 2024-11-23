import React from "react";
import { useForm as useHookForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { COUNTRIES } from "@/lib/constants";
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
import { Checkbox } from "@/components/ui/checkbox";
import { useForm as useFormContext } from "@/providers/FormProvider";
import { taxDetailsSchema, TaxDetailsInputs } from "@/lib/validation";
import { FUNDING_SOURCES } from "@/lib/constants";

export const TaxDetailsStep = () => {
  const { state, updateFormData, nextStep, previousStep } = useFormContext();

  const form = useHookForm<TaxDetailsInputs>({
    resolver: zodResolver(taxDetailsSchema),
    defaultValues: {
      tax_id: state.data.taxDetails?.tax_id || "",
      tax_id_type: state.data.taxDetails?.tax_id_type || "",
      country_of_tax_residence:
        state.data.taxDetails?.country_of_tax_residence || "",
      funding_source: state.data.taxDetails?.funding_source || [],
    },
  });

  const onSubmit = (data: TaxDetailsInputs) => {
    updateFormData("taxDetails", data);
    nextStep();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="tax_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tax ID</FormLabel>
              <FormControl>
                <Input placeholder="Enter tax ID" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="tax_id_type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tax ID Type</FormLabel>
              <FormControl>
                <Input placeholder="Enter tax ID type" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
  control={form.control}
  name="country_of_tax_residence"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Country of Tax Residence</FormLabel>
      <Select onValueChange={field.onChange} defaultValue={field.value}>
        <FormControl>
          <SelectTrigger>
            <SelectValue placeholder="United States" />
          </SelectTrigger>
        </FormControl>
        <SelectContent>
          {COUNTRIES.map((country) => (
            <SelectItem key={country.value} value={country.value}>
              {country.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <FormMessage />
    </FormItem>
  )}
/>

        <FormField
          control={form.control}
          name="funding_source"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Funding Sources</FormLabel>
              <div className="space-y-2">
                {FUNDING_SOURCES.map((source) => (
                  <div
                    key={source.value}
                    className="flex items-center space-x-2"
                  >
                    <Checkbox
                      checked={(field.value as string[])?.includes(
                        source.value
                      )}
                      onCheckedChange={(checked) => {
                        const updatedValue = checked
                          ? [...(field.value || []), source.value]
                          : field.value?.filter((v) => v !== source.value) ||
                            [];
                        field.onChange(updatedValue);
                      }}
                    />
                    <span>{source.label}</span>
                  </div>
                ))}
              </div>
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
