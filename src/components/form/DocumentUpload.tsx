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
import { documentSchema, DocumentInputs } from "@/lib/validation";
import { DOCUMENT_TYPES } from "@/lib/constants";
import { FileCheck2, FileUp } from "lucide-react";
import { Span } from "next/dist/trace";

export const DocumentUploadStep = () => {
  const { state, updateFormData, nextStep, previousStep } = useFormContext();
  const [uploading, setUploading] = useState(false);
  const [previewFile, setPreviewFile] = useState<string | null>(null);

  const form = useHookForm<DocumentInputs>({
    resolver: zodResolver(documentSchema),
    defaultValues: {
      document_type: state.data.document?.document_type || "passport",
      document_number: state.data.document?.document_number || "",
      content_data: state.data.document?.content_data || { file_link: "" },
    },
  });

  const onSubmit = (data: DocumentInputs) => {
    updateFormData("document", data);
    console.log("data", data);
    nextStep();
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploading(true);

      const formData = new FormData();
      formData.append("file", file);
      formData.append(
        "upload_preset",
        process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || "RRdigital"
      );

      try {
        const response = await fetch(
          `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/upload`,
          {
            method: "POST",
            body: formData,
          }
        );

        const data = await response.json();
        console.log("data", data);
        if (data.secure_url) {
          form.setValue("content_data.file_link", data.secure_url);
          setPreviewFile(data.secure_url);
        }
      } catch (error) {
        console.error("Error uploading file:", error);
      } finally {
        setUploading(false);
      }
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
          name="content_data.file_link"
          render={() => (
            <FormItem>
              <FormLabel>Upload Document (png,jpeg,heic)</FormLabel>
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

                    {(uploading && <span>Uploading...</span>) || (
                      <span>Choose File</span>
                    )}
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
              <p className="text-sm text-gray-500">PDF file uploaded</p>
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
          <Button
            type="submit"
            className="w-1/2"
            onClick={console.log}
            disabled={uploading}
          >
            Review
          </Button>
        </div>
      </form>
    </Form>
  );
};
