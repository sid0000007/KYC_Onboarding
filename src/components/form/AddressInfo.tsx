// // src/components/form/AddressInfo.tsx
// import React from "react";
// import { useForm as useHookForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { useForm as useFormContext } from "@/providers/FormProvider";
// import { addressInfoSchema, AddressInfoInputs } from "@/lib/types";
// import { COUNTRIES } from "@/lib/constants";

// export const AddressInfoStep = () => {
//   const { state, updateFormData, nextStep, previousStep } = useFormContext();

//   const form = useHookForm<AddressInfoInputs>({
//     resolver: zodResolver(addressInfoSchema),
//     defaultValues: state.data.address as AddressInfoInputs,
//   });

//   const onSubmit = (data: AddressInfoInputs) => {
//     updateFormData("address", data);
//     nextStep();
//   };

//   return (
//     <Form {...form}>
//       <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
//         <FormField
//           control={form.control}
//           name="street"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Street Address</FormLabel>
//               <FormControl>
//                 <Input placeholder="123 Main St" {...field} />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//         <FormField
//           control={form.control}
//           name="city"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>City</FormLabel>
//               <FormControl>
//                 <Input placeholder="New York" {...field} />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//         <FormField
//           control={form.control}
//           name="state"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>State/Province</FormLabel>
//               <FormControl>
//                 <Input placeholder="NY" {...field} />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//         <FormField
//           control={form.control}
//           name="zipCode"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>ZIP/Postal Code</FormLabel>
//               <FormControl>
//                 <Input placeholder="10001" {...field} />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//         <FormField
//           control={form.control}
//           name="country"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Country</FormLabel>
//               <Select onValueChange={field.onChange} defaultValue={field.value}>
//                 <FormControl>
//                   <SelectTrigger>
//                     <SelectValue placeholder="Select a country" />
//                   </SelectTrigger>
//                 </FormControl>
//                 <SelectContent>
//                   {COUNTRIES.map((country) => (
//                     <SelectItem key={country} value={country}>
//                       {country}
//                     </SelectItem>
//                   ))}
//                 </SelectContent>
//               </Select>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//         <div className="flex space-x-4">
//           <Button
//             type="button"
//             variant="outline"
//             onClick={() => previousStep()}
//             className="w-1/2"
//           >
//             Back
//           </Button>
//           <Button type="submit" className="w-1/2">
//             Next
//           </Button>
//         </div>
//       </form>
//     </Form>
//   );
// };
