// src/components/form/DocumentUpload.tsx
'use client';
import React, { useState } from "react";
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
//import { documentInfoSchema, DocumentInfoInputs } from "@/lib/validation";
import { documentSchema, DocumentInputs } from "@/lib/validation";
import { DOCUMENT_TYPES } from "@/lib/constants";
import { FileCheck2, FileUp } from "lucide-react";

export const DocumentUploadStep = () => {
  const { state, updateFormData, nextStep, previousStep } = useFormContext();
  const [previewFile, setPreviewFile] = useState<string | null>(null);

  const form = useHookForm<DocumentInputs>({
    resolver: zodResolver(documentSchema),
    defaultValues: state.data.document as DocumentInputs,
  });

  const onSubmit = (data: DocumentInputs) => {
    updateFormData("document", data);
    nextStep();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      form.setValue("content_data.file", file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewFile(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
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
                  {DOCUMENT_TYPES.map((doc) => (
                    <SelectItem key={doc.value} value={doc.value}>
                      {doc.label}
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
          render={() => (
            <FormItem>
              <FormLabel>Upload Document</FormLabel>
              <FormControl>
                <div className="flex items-center space-x-4">
                  <Input
                    type="file"
                    accept=".jpg,.jpeg,.png,.pdf"
                    className="hidden"
                    id="documentUpload"
                    onChange={handleFileChange}
                  />
                  <label
                    htmlFor="documentUpload"
                    className="flex items-center cursor-pointer 
                      bg-primary text-primary-foreground 
                      px-4 py-2 rounded-md hover:bg-primary/90"
                  >
                    <FileUp className="mr-2 h-5 w-5" />
                    Choose File
                  </label>
                  {previewFile && (
                    <div className="flex items-center text-green-600">
                      <FileCheck2 className="mr-2 h-5 w-5" />
                      <span>File Selected</span>
                    </div>
                  )}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {previewFile && (
          <div className="mt-4">
            <p className="text-sm font-medium mb-2">File Preview:</p>
            {previewFile.includes("image") ? (
              <img
                src={previewFile}
                alt="Document Preview"
                className="max-h-48 w-auto rounded-md"
              />
            ) : (
              <p className="text-sm text-gray-500">PDF file selected</p>
            )}
          </div>
        )}

        <div className="flex space-x-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => previousStep()}
            className="w-1/2"
          >
            Back
          </Button>
          <Button type="submit" className="w-1/2">
            Review
          </Button>
        </div>
      </form>
    </Form>
  );
};
