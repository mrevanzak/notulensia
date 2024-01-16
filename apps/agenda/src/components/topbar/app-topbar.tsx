"use client"
import { LayoutContext } from "@/context/layout-context";
import { useGetFile } from "@/lib/api/storage/get-file";
import { useGetUserDetail } from "@/lib/api/user/get-user-detail";
import Image from "next/image";
import { ReactElement, useContext, useState } from "react";
import ButtonLanguage from "../ui/button-language";

export default function AppTobBar() : ReactElement {
    const {onMenuToggle, onTopbarMenuToggle} = useContext(LayoutContext);
    const { data } = useGetUserDetail();
    const file = useGetFile("asset", data?.logoUrl);
    const [langStore, setLangStore] = useState('en');
    return (
        <div className="layout-topbar">
            <div className="layout-topbar-start">
                <Image
                    alt="profile"
                    className="tw-w-[280px] max-md:tw-w-[230px] max-sm:tw-w-[180px] "
                    height={6}
                    src={file.data ? URL.createObjectURL(file.data) : "/svg/logo.svg"}
                    style={{ maxWidth: '280px', maxHeight: '45px', objectFit: 'contain' }} 
                    width={38}
                />
                <button className="p-ripple layout-menu-button" onClick={() => {onMenuToggle()}} type="button">
                    <i className="pi pi-angle-right"/>
                </button>
                <button className="p-ripple layout-topbar-mobile-button p-link" onClick={() => {onTopbarMenuToggle()}} type="button">
                    <i className="pi pi-ellipsis-v"></i>
                </button>
            </div>
            <div className="layout-topbar-end tw-border">
                   <ButtonLanguage />
            </div>
        </div>
    );
}
