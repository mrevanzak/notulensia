"use client"
import { useState, type ReactElement, useEffect } from "react";
import Dropdown from "../ui/dropdown";
import { Button } from "primereact/button";
import { useGetEventCategoryDropdown } from "@/lib/api/event-category/get-event-category";
import { useTranslation } from "react-i18next";
import { Dialog } from "primereact/dialog";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { EventCategorySchema, eventCategorySchemaForm } from "@/lib/validations/event-category";
import { useInsertEventCategory } from "@/lib/api/event-category/insert-event-category";
import { toast } from "react-toastify";
import Input from "../ui/input";

export default function DropdownEventCategory(): ReactElement {
	const [showDialogCategory, setShowDialogCategory] = useState(false);
	const eventCategory = useGetEventCategoryDropdown();
	const insertEventCategory = useInsertEventCategory();
	const { t } = useTranslation();
	const setValue = useFormContext().setValue;

	const onSubmitDialog = async (data) => {
		const resp = await insertEventCategory.mutateAsync(data);
		toast.success("Event Category Added");
		setShowDialogCategory(false);
		setValue("eventCategoryId", resp.data.id);
	};


	const methods = useForm<EventCategorySchema>({
		resolver: zodResolver(eventCategorySchemaForm),
		resetOptions: {
			keepDirtyValues: true,
		},
	});

	const { handleSubmit } = methods;

	const handleKeyPress = (e) => {
		if (e.key === "Enter") {
			handleSubmit(onSubmitDialog)();
		}
	};

	const DialogForm = () => {
		return (
			<FormProvider {...methods} >
				<form
					id="eventCategoryForm"
					className="tw-space-y-8"
					onKeyDown={handleKeyPress}
				>
					<Input autoFocus={true} defaultValue="" float id="eventCategoryName" label="Event Category Name" />
					<div className="tw-flex tw-justify-center">
						<div className="tw-flex tw-gap-4">
							<Button
								label="Save"
								loading={insertEventCategory.isPending}
								outlined
								onClick={handleSubmit(onSubmitDialog)}
								type="button"
							/>
							<Button label="Cancel" onClick={() => setShowDialogCategory(false)} type="button" />
						</div>
					</div>
				</form>
			</FormProvider>
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
			>

				<DialogForm />
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