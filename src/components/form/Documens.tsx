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
import { useForm as useFormContext } from "@/providers/FormProvider";
import { documentSchema, DocumentInputs } from "@/lib/validation";
import { DOCUMENT_TYPES } from "@/lib/constants";

export const DocumentUploadStep = () => {
  const { state, updateFormData, nextStep, previousStep } = useFormContext();

  const form = useHookForm<DocumentInputs>({
    resolver: zodResolver(documentSchema),
    defaultValues: state.data.document,
  });

  const onSubmit = (data: DocumentInputs) => {
    updateFormData("document", data);
    nextStep();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="document_type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Document Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select document type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {DOCUMENT_TYPES.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
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
          name="document_number"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Document Number</FormLabel>
              <FormControl>
                <Input placeholder="Enter document number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="content_data.file"
          render={({ field: { onChange, value, ...field } }) => (
            <FormItem>
              <FormLabel>Upload Document</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  accept=".pdf,.png,.jpeg,.jpg"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    onChange(file);
                  }}
                  {...field}
                />
              </FormControl>
              <div className="text-sm text-muted-foreground">
                Accepted formats: PDF, PNG, JPEG. Maximum size: 5MB
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
            Review & Submit
          </Button>
        </div>
      </form>
    </Form>
  );
};
