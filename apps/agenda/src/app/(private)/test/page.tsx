// Import library dan komponen yang dibutuhkan
"use client"

import Input from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "primereact/button";
import React from "react";
import { useForm, FormProvider, useFormContext } from "react-hook-form";
import * as z from "zod"; // Import Zod

// Skema validasi Zod
const childSchema = z.object({
  childInput: z.string().min(3, "Input harus memiliki minimal 3 karakter"),
});

export default function App() {
  const methods = useForm();
  const onSubmit = (data) => console.log(data);

 


  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        {/* <NestedInput /> */}
        <NestedForm />
        <Input id="parentInput" label="Parent" required />
        <Button
          label="Save"
          outlined
          type="submit"
        />
      </form>
    </FormProvider>
  );
}

const NestedForm = () => {
  const methods = useFormContext();
  const nestedMethods = useForm({
    resolver: zodResolver(childSchema), // Menggunakan resolver Zod di formulir anak
  });

  const nestedSubmit = nestedMethods.handleSubmit((data) => console.log(data));

  return (
    <div>
      <Input
        id="childInput"
        label="child"
        required
        {...methods.register("childInput")}
      />
      <Button
        label="Save"
        outlined
        type="button"
        onClick={() => nestedSubmit()}
      />
    </div>
  );
};
