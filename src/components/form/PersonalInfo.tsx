// // src/components/form/PersonalInfo.tsx
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
// import { useForm as useFormContext } from "@/providers/FormProvider";
// import { personalInfoSchema, PersonalInfoInputs } from "@/lib/validation";

// export const PersonalInfoStep = () => {
//   const { state, updateFormData, nextStep } = useFormContext();

//   const form = useHookForm<PersonalInfoInputs>({
//     resolver: zodResolver(personalInfoSchema),
//     defaultValues: state.data.personal,
//   });

//   const onSubmit = (data: PersonalInfoInputs) => {
//     updateFormData("personal", data);
//     nextStep();
//   };

//   return (
//     <Form {...form}>
//       <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
//         <FormField
//           control={form.control}
//           name="firstName"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>First Name</FormLabel>
//               <FormControl>
//                 <Input placeholder="John" {...field} />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//         <FormField
//           control={form.control}
//           name="lastName"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Last Name</FormLabel>
//               <FormControl>
//                 <Input placeholder="Doe" {...field} />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//         <FormField
//           control={form.control}
//           name="email"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Email</FormLabel>
//               <FormControl>
//                 <Input
//                   type="email"
//                   placeholder="john.doe@example.com"
//                   {...field}
//                 />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//         <FormField
//           control={form.control}
//           name="dateOfBirth"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Date of Birth</FormLabel>
//               <FormControl>
//                 <Input type="date" {...field} />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//         <FormField
//           control={form.control}
//           name="phoneNumber"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Phone Number</FormLabel>
//               <FormControl>
//                 <Input type="tel" placeholder="+1 (123) 456-7890" {...field} />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//         <Button type="submit" className="w-[7rem] ">
//           Next
//         </Button>
//       </form>
//     </Form>
//   );
// };
