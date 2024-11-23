// src/components/form/AccountTypeStep.tsx
import React from "react";
import { useForm as useHookForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
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
import { accountTypeSchema, AccountTypeInputs } from "@/lib/validation";
import { ACCOUNT_TYPES, IRA_SUBTYPES } from "@/lib/constants";

export const AccountTypeStep = () => {
  const { state, updateFormData, nextStep } = useFormContext();

  const form = useHookForm<AccountTypeInputs>({
    resolver: zodResolver(accountTypeSchema),
    defaultValues: state.data.accountInfo,
  });

  const accountType = form.watch("account_type");

  const onSubmit = (data: AccountTypeInputs) => {
    updateFormData("accountInfo", data);
    nextStep();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="account_type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Account Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select account type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {ACCOUNT_TYPES.map((type) => (
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

        {accountType === "ira" && (
          <FormField
            control={form.control}
            name="account_sub_type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>IRA Account Type</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select IRA type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {IRA_SUBTYPES.map((type) => (
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
        )}

        <Button type="submit" className="w-full">
          Next
        </Button>
      </form>
    </Form>
  );
};
