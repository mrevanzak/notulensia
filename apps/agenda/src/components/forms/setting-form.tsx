"use client";
import { useUpdateUserOption } from "@/lib/api/user/update-user-option";
import type { OptionFormValues } from "@/lib/validations/user";
import { optionFormSchema } from "@/lib/validations/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "primereact/button";
import { FileUpload } from "primereact/fileupload";
import type { ReactElement } from "react";
import React, { useRef, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import RadioButton from "../ui/radio-button";
import { httpClient } from "@/lib/http";
import type { Area } from "react-easy-crop";
import Cropper from "react-easy-crop";
import { Dialog } from "primereact/dialog";
import { Slider } from "primereact/slider";
import getCroppedImg from "@/utils/crop-image-utils";
import { toast } from "react-toastify";
import Image from "next/image";
import { useMutation } from "@tanstack/react-query";
import { useGetUserDetail } from "@/lib/api/user/get-user-detail";

export default function SettingForm(): ReactElement {
  const { data } = useGetUserDetail();
  const { mutate, isPending } = useUpdateUserOption();
  const uploadLogo = useMutation({
    mutationFn: async (file?: File) => {
      const response = await httpClient.postForm<{ id: string }>(
        "/storage/asset",
        { file },
      );
      return response.data.id;
    },
  });

  const methods = useForm<OptionFormValues>({
    resolver: zodResolver(optionFormSchema),
    values: {
      notification:
        data?.userOption.find((option) => option.name === "notification")
          ?.value ?? "",
      dashboard:
        data?.userOption.find((option) => option.name === "dashboard")?.value ??
        "",
    },
    resetOptions: {
      keepDirtyValues: true,
    },
  });

  const { handleSubmit } = methods;
  const onSubmit = handleSubmit(async (data) => {
    let storageId: string | undefined;
    if (image)
      storageId = await uploadLogo.mutateAsync(
        fileUploadRef?.current?.getFiles().at(0),
      );

    mutate(
      {
        ...data,
        logoUrl: storageId,
      },
      {
        onSuccess: () => {
          fileUploadRef.current?.clear();
          setImage(undefined);
        },
      },
    );
  });

  const notificationOptions = [
    {
      value: "email",
      label: "Email",
    },
    {
      value: "telegram",
      label: "Telegram",
    },
    {
      value: "whatsapp",
      label: "Whatsapp",
    },
  ];
  const themeOptions = [
    {
      value: "theme1",
      label: "Theme 1",
    },
    {
      value: "theme2",
      label: "Theme 2",
    },
    {
      value: "custom",
      label: "Custom",
    },
  ];

  const fileUploadRef = useRef<FileUpload>(null);
  const [image, setImage] = useState<string>();
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const [openDialog, setOpenDialog] = useState(false);

  const onCropComplete = (_: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const onSave = () => {
    if (!croppedAreaPixels) {
      return;
    }

    void (async () => {
      try {
        const croppedImage = await getCroppedImg(
          image ?? "",
          croppedAreaPixels,
          0,
        );

        if (!croppedImage) {
          return;
        }
        fileUploadRef.current?.setFiles([
          new File([croppedImage], "logo.png", {
            type: croppedImage.type,
          }),
        ]);
        setImage(URL.createObjectURL(croppedImage));
        setOpenDialog(false);
      } catch (err) {
        toast.error("Error cropping image");
      }
    })();
  };

  return (
    <FormProvider {...methods}>
      <form
        className="tw-flex tw-flex-col tw-w-2/3 tw-space-y-8 tw-mt-8"
        onSubmit={(event) => {
          event.preventDefault();
          void onSubmit();
        }}
      >
        <div>
          <h2 className="tw-font-normal">Notification Type</h2>
          <p>Select you’re notifications type.</p>
          <div className="tw-flex tw-space-x-8">
            <RadioButton id="notification" options={notificationOptions} />
          </div>
        </div>
        <div>
          <h2 className="tw-font-normal">Dashboard Priority</h2>
          <p>Select you’re notifications type.</p>
          <div className="tw-flex tw-space-x-8">
            <RadioButton id="dashboard" options={themeOptions} />
          </div>
        </div>
        <div className="tw-flex tw-space-x-2">
          <FileUpload
            accept="image/*"
            chooseLabel="Upload Logo"
            chooseOptions={{
              icon: "pi pi-fw pi-upload",
            }}
            disabled={Boolean(image)}
            maxFileSize={2 * 1024 * 1024}
            mode="basic"
            name="file"
            onSelect={(e) => {
              setOpenDialog(true);
              setImage(URL.createObjectURL(e.files[0]));
            }}
            ref={fileUploadRef}
          />
          {image ? (
            <Button
              icon="pi pi-trash"
              onClick={() => {
                fileUploadRef.current?.clear();
                setImage(undefined);
              }}
              severity="danger"
              type="button"
            />
          ) : null}
        </div>
        {image ? (
          <div>
            <p>Preview</p>
            <Image alt="logo" height={120} src={image} width={120} />
          </div>
        ) : null}

        <Dialog
          dismissableMask
          draggable={false}
          onHide={() => {
            fileUploadRef.current?.clear();
            setOpenDialog(false);
          }}
          pt={{
            root: {
              className: "border-none",
            },
            content: {
              className:
                "px-8 border-round-3xl py-4 tw-border-8 !tw-bg-[#E0D7FD] tw-border-[#334798] tw-space-y-4",
            },
          }}
          showHeader={false}
          style={{ width: "60vw", height: "75vh" }}
          visible={openDialog}
        >
          <h2 className="tw-text-center">Crop Image</h2>
          <div className="tw-border-4 tw-border-[#334798] tw-relative tw-h-80">
            <Cropper
              aspect={1}
              crop={crop}
              image={image ?? ""}
              onCropChange={setCrop}
              onCropComplete={onCropComplete}
              onZoomChange={setZoom}
              zoom={zoom}
            />
          </div>
          <p>*Use HD image for better quality</p>
          <div className="tw-flex tw-justify-between">
            <Slider
              className="w-14rem"
              max={3}
              min={1}
              onChange={(e) => {
                if (typeof e.value === "number") {
                  setZoom(e.value);
                }
              }}
              step={0.1}
              value={zoom}
            />
            <Button label="SAVE CHANGES" onClick={onSave} rounded />
          </div>
        </Dialog>
        <div className="tw-self-end tw-h-full tw-flex">
          <Button
            className="tw-self-end"
            label="SAVE CHANGES"
            loading={isPending || uploadLogo.isPending}
            rounded
          />
        </div>
      </form>
    </FormProvider>
  );
}
