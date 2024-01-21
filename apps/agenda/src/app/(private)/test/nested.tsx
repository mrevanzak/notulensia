import Input from "@/components/ui/input";
import { Button } from "primereact/button";
import { ReactElement } from "react";
import { FormProvider, useForm, useFormContext } from "react-hook-form";

export default function NestedInput() : ReactElement {
    // const { register } = useFormContext() // retrieve all hook methods
    const methods1 = useForm();
    const onSubmit = (data) => console.log(data);
    return (

        <FormProvider {...methods1}>
            <form onSubmit={methods1.handleSubmit(onSubmit)}>
                <Input id="childInput" label="child" required/>
                <Button
                    label="Save"
                    outlined
                    type="submit"
                />
            </form>
        </FormProvider>
    )

}