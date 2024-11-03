"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import CustomFormField, { FormFieldType } from "../CustomFormField";
import SubmitButton from "../SubmitButton";
import { useState } from "react";
import { UserFormValidation } from "@/lib/validation";
import { useRouter } from "next/navigation";
import { createUser } from "@/lib/actions/patient.actions";
import "react-phone-number-input/style.css";
import PhoneInput from 'react-phone-number-input'

const PatientForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  // Define form with zod validation schema
  const form = useForm<z.infer<typeof UserFormValidation>>({
    resolver: zodResolver(UserFormValidation),
    defaultValues: {
      name: "",
      email: "",
      phone: "", // Make sure this is lowercase
    },
  });

  // Define submit handler
// Define submit handler
const onSubmit = async (values: z.infer<typeof UserFormValidation>) => {
  setIsLoading(true);

  try {
    const user = {
      name: values.name,
      email: values.email,
      phone: values.phone,
    };

    const newUser = await createUser(user);

    if (newUser) {
      router.push(`/patients/${newUser.$id}/register`);
    }
  } catch (error) {
    console.log(error);
  }

  setIsLoading(false);
};

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex-1 space-y-6">
        <section className="mb-12 space-y-4">
          <h1 className="header">Hi there 👋</h1>
          <p className="text-dark-700">Get started with appointments.</p>
        </section>

        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="name"
          label="Full name"
          placeholder="John Doe"
          iconSrc="/assets/icons/user.svg"
          iconAlt="user"
        />

        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="email"
          label="Email"
          placeholder="JohnDoe@gmail.com"
          iconSrc="/assets/icons/email.svg"
          iconAlt="email"
        />

        {/* Render Phone Input conditionally to prevent SSR issues */}
        {typeof window !== 'undefined' && (
          <CustomFormField
            fieldType={FormFieldType.PHONE_INPUT}
            control={form.control}
            name="phone"  // Ensure this is lowercase
            label="Phone number"
            placeholder="+46 702099453"
          />
        )}

        <SubmitButton isLoading={isLoading}>Get Started</SubmitButton>
      </form>
    </Form>
  );
};

export default PatientForm;
