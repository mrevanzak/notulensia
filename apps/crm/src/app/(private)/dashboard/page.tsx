"use client";
import type { ReactElement } from "react";
import React from "react";
import { MdHomeWork, MdOutlineEventAvailable } from "react-icons/md";
import { BsPeopleFill } from "react-icons/bs";
import LineChart from "@/components/dashboard/line-chart";
import Image from "next/image";
import SearchInput from "@/components/ui/search-input";
import { useGetDashboardStats } from "@/lib/api/dashboard/get-dashboard-stats";

export default function Dashboard(): ReactElement {
  const { data } = useGetDashboardStats();

  return (
    <div className="grid">
      <div className="col-12 mb-2 tw-flex tw-flex-row tw-justify-between">
        <h2>CRM</h2>
        <SearchInput className="tw-w-1/2" />
      </div>
      <div className="col-4">
        <div className="card tw-shadow">
          <h3>Company Total</h3>
          <p className="tw-text-[#334798] tw-font-bold tw-text-8xl tw-text-center">
            {data?.companyTotal}
          </p>
          <span className="tw-flex tw-justify-end">
            <MdHomeWork color="#334798" size={48} />
          </span>
        </div>
      </div>
      <div className="col-4">
        <div className="card tw-shadow">
          <h3>Customer Total Active</h3>
          <p className="tw-text-[#334798] tw-font-bold tw-text-8xl tw-text-center">
            {data?.userTotal}
          </p>
          <span className="tw-flex tw-justify-end">
            <BsPeopleFill color="#334798" size={48} />
          </span>
        </div>
      </div>
      <div className="col-4">
        <div className="card tw-shadow">
          <h3>All Event</h3>
          <p className="tw-text-[#334798] tw-font-bold tw-text-8xl tw-text-center">
            {data?.totalEvents}
          </p>
          <span className="tw-flex tw-justify-end">
            <MdOutlineEventAvailable color="#334798" size={48} />
          </span>
        </div>
      </div>
      <div className="col-8">
        <div className="card tw-shadow tw-h-96">
          <h3>Statistik Penggunaan Aplikasi</h3>
          <LineChart />
        </div>
      </div>
      <div className="col-4">
        <div className="tw-relative card tw-shadow tw-h-96 tw-space-y-4 tw-flex tw-justify-center tw-flex-col">
          <h4 className="tw-absolute tw-left-0 tw-top-0 tw-rounded-tl-lg tw-p-1 tw-bg-[#334798] tw-text-white">
            Customer Near Expired
          </h4>
          {data?.nearExpiredUsers.map((customer) => (
            <div
              className="tw-flex tw-flex-row tw-space-x-4 tw-items-center"
              key={customer.name}
            >
              <Image
                alt="avatar"
                className="tw-rounded-full"
                height={56}
                src="/layout/images/avatar/amyelsner.png"
                width={56}
              />
              <span>
                <h3>{customer.name}</h3>
                <p className="tw-text-xs">{customer.dateExpired}</p>
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
