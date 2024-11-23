// src/components/form/ContactStep.tsx
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
import { contactSchema, ContactInputs } from "@/lib/validation";

export const ContactStep = () => {
  const { state, updateFormData, nextStep, previousStep } = useFormContext();

  const form = useHookForm<ContactInputs>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      email_address: state.data.contact?.email_address || "",
      phone_number: state.data.contact?.phone_number || "",
      street_address: state.data.contact?.street_address || [""],
      city: state.data.contact?.city || "",
      state: state.data.contact?.state || "",
      postal_code: state.data.contact?.postal_code || "",
    },
  });

  const onSubmit = (data: ContactInputs) => {
    updateFormData("contact", data);
    nextStep();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email_address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email Address</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="john.doe@example.com"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="phone_number"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <Input placeholder="+15555555555" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* <FormField
          control={form.control}
          name="street_address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Street Address</FormLabel>
              <FormControl>
                <div className="space-y-2">
                  {field.value.map((_, index) => (
                    <Input
                      key={index}
                      placeholder={`Address Line ${index + 1}`}
                      value={field.value[index] || ''}
                      onChange={(e) => {
                        const newValue = [...field.value];
                        newValue[index] = e.target.value;
                        field.onChange(newValue);
                      }}
                    />
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => field.onChange([...field.value, ''])}
                    className="w-full"
                  >
                    Add Address Line
                  </Button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        /> */}

        <FormField
          control={form.control}
          name="city"
          render={({ field }) => (
            <FormItem>
              <FormLabel>City</FormLabel>
              <FormControl>
                <Input placeholder="City" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="state"
          render={({ field }) => (
            <FormItem>
              <FormLabel>State</FormLabel>
              <FormControl>
                <Input placeholder="State" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="postal_code"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Postal Code</FormLabel>
              <FormControl>
                <Input placeholder="Postal Code" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

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
            Next
          </Button>
        </div>
      </form>
    </Form>
  );
};
