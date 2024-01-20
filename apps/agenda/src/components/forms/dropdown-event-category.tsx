"use client"
import { useState, type ReactElement } from "react";
import Dropdown from "../ui/dropdown";
import { Button } from "primereact/button";
import { useGetEventCategoryDropdown } from "@/lib/api/event-category/get-event-category";
import { useTranslation } from "react-i18next";
import { Dialog } from "primereact/dialog";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { EventCategorySchemaForm, eventCategorySchemaForm } from "@/lib/validations/event-category";
import { useInsertEventCategory } from "@/lib/api/event-category/insert-event-category";
import { toast } from "react-toastify";
import Input from "../ui/input";

export default function DropdownEventCategory(): ReactElement {
    const [showDialogCategory, setShowDialogCategory] = useState(false);
    const eventCategory = useGetEventCategoryDropdown();
    const insertEventCategory = useInsertEventCategory();
    const { t } = useTranslation();

    const onSubmitDialog = (data) => {
        insertEventCategory.mutate(data);
        toast.success("Event Category Added");
        console.log(insertEventCategory.data);
        setShowDialogCategory(false);
    };

    const methods = useForm<EventCategorySchemaForm>({
        resolver: zodResolver(eventCategorySchemaForm),
        resetOptions: {
            keepDirtyValues: true,
        },
    });

    const { handleSubmit } = methods;

    const DialogForm = () => {
        return (
            <form
                id="eventCategoryForm"
                className="tw-space-y-8"
                onSubmit={handleSubmit(onSubmitDialog)}
            >
                <Input float id="eventCategoryName" label="Event Category Name" />
                <div className="tw-flex tw-justify-center">
                    <div className="tw-flex tw-gap-4">
                        <Button
                            label="Save"
                            loading={insertEventCategory.isPending}
                            outlined
                            type="submit"
                        />
                        <Button label="Cancel" onClick={() => setShowDialogCategory(false)} type="button" />
                    </div>
                </div>
            </form>
        );
    };

    const footerCategory = () => {
        return (
            <>
                <div className="p-2 tw-w-full">
                    <Button
                        className="tw-w-full"
                        label={t("Add Category")}
                        iconPos="right"
                        icon="pi pi-plus"
                        onClick={() => {
                            setShowDialogCategory(true);
                        }}
                        outlined
                    />
                </div>
            </>
        );
    };

    return (
        <>
            <Dialog
                className="tw-min-w-fit"
                header={t("Add Event Category")}
                onHide={() => setShowDialogCategory(false)}
                pt={{
                    content: {
                        className: "border-noround-top pt-5 tw-space-y-8",
                    },
                }}
                visible={showDialogCategory}
                appendTo={document.body}
            >
                <FormProvider {...methods} >
                    <DialogForm />
                </FormProvider>
            </Dialog>
            <Dropdown
                float
                id="eventCategoryId"
                label={t("Event Category")}
                loading={eventCategory.isLoading}
                panelFooterTemplate={footerCategory}
                optionLabel="eventCategoryName"
                optionValue="id"
                options={eventCategory.data}
                required
            />
        </>
    );
}